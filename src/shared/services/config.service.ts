import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '../../models/contracts/TypeOrmModuleOptions';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
	constructor() {
		const nodeEnv = this.nodeEnv;
		dotenv.config({
			path: `.${nodeEnv}.env`
		});
	}

	private get(key: string): string | undefined {
		return process.env[key];
	}

	private getNumber(key: string): number | undefined {
		return Number(process.env[key]);
	}

	get nodeEnv(): string {
		return this.get('NODE_ENV') || 'development';
	}

	get isDocker(): boolean {
		return this.get('DOCKER') === 'true' || false;
	}

	get isDevelopment(): boolean {
		return this.nodeEnv === 'development';
	}

	get isProduction(): boolean {
		return this.nodeEnv === 'production';
	}

	get typeOrmConfig(): TypeOrmModuleOptions {
		return {
			host: this.isDocker ? 'postgres' : this.get('DB_HOST') || 'localhost',
			port: this.getNumber('DB_PORT') || 5432,
			username: this.get('DB_USERNAME') || 'postgres',
			password: this.get('DB_PASSWORD') || 'eatsleepcode',
			database: this.get('DB_DATABASE') || 'bitstack'
		};
	}

	get express() {
		return {
			cluster: this.get('CLUSTER') === 'true' || false,
			port: this.getNumber('PORT') || 5000
		};
	}

	get redis() {
		return {
			port: this.getNumber('REDIS_PORT') || 6379,
			host: this.isDocker ? 'redis' : this.get('REDIS_HOST') || 'localhost'
		};
	}

	get googleapis() {
		return {
			client_id: this.get('CLIENT_ID'),
			client_secret: this.get('CLIENT_SECRET'),
			redirect_uri: this.get('REDIRECT_URI') || 'http://localhost:3000/auth/google/oauth2/callback'
		};
	}
}
