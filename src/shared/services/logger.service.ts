/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
const parentModule = require('parent-module');
import * as winston from 'winston';
const { combine, colorize, printf, timestamp } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `\n${timestamp} ${level}: ${message}\n`;
});

@Injectable()
export class LoggerService {
	private static logger: winston.Logger;

	private static parseFilePath(filepath: string): string {
		// console.log(filepath);
		if (filepath.indexOf(path.sep) >= 0) {
			// Parse filepath here, the below commands are just token commands!
			filepath = filepath.replace(process.cwd(), '');
			filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
			filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
			filepath = filepath.replace('.ts', '');
			filepath = filepath.replace('.js', '');
			filepath = filepath.replace(path.sep, ':');
		}
		return filepath;
	}

	private static createLogger(): winston.Logger {
		this.logger = winston.createLogger({
			transports: [
				new winston.transports.Console({
					level: 'silly',
					format: combine(colorize(), timestamp(), myFormat)
				}),
				new winston.transports.File({
					level: 'info',
					filename: 'combinedlog',
					format: combine(colorize(), timestamp(), myFormat)
				})
			]
		});
		return this.logger;
	}

	public static getLogger(): winston.Logger {
		if (!this.logger) {
			this.logger = this.createLogger();
		}
		return this.logger;
	}

	private parseMessage(message: string, filepath: string) {
		const scope = LoggerService.parseFilePath(filepath);
		return `${scope} \n ${message}`;
	}

	public log(message: string, ...args: any[]): void {
		const filepath = parentModule();
		const logger = LoggerService.getLogger();
		if (filepath) {
			logger.log(this.parseMessage(message, filepath), args);
		} else {
			logger.log(this.parseMessage(message, 'app'), args);
		}
	}

	public info(message: string, ...args: any[]): void {
		const filepath = parentModule();
		const logger = LoggerService.getLogger();
		if (filepath) {
			logger.info(this.parseMessage(message, filepath), args);
		} else {
			logger.info(this.parseMessage(message, 'app'), args);
		}
	}

	public warn(message: string, ...args: any[]): void {
		const filepath = parentModule();
		const logger = LoggerService.getLogger();
		if (filepath) {
			logger.warn(this.parseMessage(message, filepath), args);
		} else {
			logger.warn(this.parseMessage(message, 'app'), args);
		}
	}

	public error(message: string, ...args: any[]): void {
		const filepath = parentModule();
		const logger = LoggerService.getLogger();
		if (filepath) {
			logger.error(this.parseMessage(message, filepath), args);
		} else {
			logger.error(this.parseMessage(message, 'app'), args);
		}
	}
}

/**
 * Take a quick peek of service here
 */
if (require.main === module) {
	const logger = new LoggerService(); // This is how the service is to be called.
	logger.log('info', 'Log successful!');
}
