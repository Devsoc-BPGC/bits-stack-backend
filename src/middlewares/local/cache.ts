import { Headers, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, request } from 'express';
import { RedisService } from '../../shared/services/redis.service';
import { LoggerService } from '../../shared/services/logger.service';

@Injectable()
export class Cache implements NestMiddleware {
	private logger: LoggerService;

	constructor(private RedisService: RedisService) {
		this.logger = new LoggerService();
	}

	async use(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { key } = request.headers || {};
			if (!key || typeof key !== 'string') {
				// eslint-disable-next-line @typescript-eslint/quotes
				this.logger.info(`Got incorrect key:${key} value for cache.`);
				return next();
			}
			const cache: RedisService = this.RedisService;
			const svalue: string | null = await cache.getValue(key.toString());
			if (svalue) {
				const value = JSON.parse(svalue);
				this.logger.info('Got cache for key: ' + key);
				res.status(200).json({
					data: value
				});
			} else {
				// Default set cache to 1 min.
				const value: string = JSON.stringify(req.body);
				await cache.setValue(key.toString(), value, 60);
				this.logger.info(`Set cache value:${value} for key:${key.toString()}`);
				// console.log(JSON.stringify(req.body));
				next();
			}
		} catch (err) {
			// Log error here
			// Don't return error here, let's find a way to revive cache externally!
			throw new Error('Redis cache has failed!\n' + err);
		}
	}
}
