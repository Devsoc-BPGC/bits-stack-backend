/**
 * @description Refactored the import of entities
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import 'reflect-metadata';
import { Promise } from 'bluebird';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import {
	patchTypeORMRepositoryWithBaseRepository,
	initializeTransactionalContext
} from 'typeorm-transactional-cls-hooked';
import { Channels, Discussions, Users, Hashtags, Replies, Answers } from '../database';
import { ConfigService } from '../shared/services/config.service';
import { TypeOrmModuleOptions } from '../models/contracts/TypeOrmModuleOptions';

export class DatabaseLoader {
	protected connection?: Connection;
	private connectionConfig: ConnectionOptions;
	private TypeOrmModuleOptions: TypeOrmModuleOptions;

	constructor() {
		this.connection = undefined;
		this.TypeOrmModuleOptions = new ConfigService().typeOrmConfig;
		// Use env for this initailisation.
		this.connectionConfig = {
			type: 'postgres',
			host: this.TypeOrmModuleOptions.host,
			port: this.TypeOrmModuleOptions.port,
			username: this.TypeOrmModuleOptions.username,
			password: this.TypeOrmModuleOptions.password,
			database: this.TypeOrmModuleOptions.database,
			entities: [Users, Discussions, Channels, Hashtags, Replies, Answers],
			migrations: ['dist/database/migration/**/*.js'],
			subscribers: ['dist/database/subscriber/**/*.js'],
			cli: {
				entitiesDir: 'src/database/entity/',
				migrationsDir: 'src/database/migration/',
				subscribersDir: 'src/database/subscriber'
			},
			synchronize: true,
			logging: ['log']
		};
		initializeTransactionalContext();
		patchTypeORMRepositoryWithBaseRepository();
	}

	/**
	 * @returns {Promise}
	 *
	 * @description Creates a new connection pool when the app starts.
	 */
	public connectPromise(): Promise<void> {
		return new Promise((resolve, reject) => {
			createConnection(this.connectionConfig)
				.then((connection) => {
					this.connection = connection;
					console.log('Database is up and running on port: 5432!');
					return resolve();
				})
				.catch((err) => {
					return reject('Unknown error occured:\n' + err);
				});
		});
	}

	/**
	 * @returns {Promise}
	 *
	 * @description Closes connection in a pool when the application is closed.
	 */
	public closeConnPromise(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.connection) {
				this.connection
					.close()
					.then(() => {
						this.connection = undefined;
						return resolve();
					})
					.catch((err) => {
						return reject('Unexpected error occured:\n' + err);
					});
			}
			return resolve(alert('No active connections found'));
		});
	}
}
