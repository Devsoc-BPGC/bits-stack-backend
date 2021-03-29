import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { of } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from '../shared/services/logger.service';
import { RedisService } from '../shared/services/redis.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
	constructor(private logger: LoggerService, private cache: RedisService, private reflector: Reflector) {}

	async intercept(context: ExecutionContext, next: CallHandler) {
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();
		const expiration = this.reflector.get<number>('expiration', context.getHandler()) || 60;

		const { key } = request.headers;
		if (!key || typeof key !== 'string') {
			this.logger.warn(`Got incorrect key:${key} value for cache.`);
			return next.handle();
		} else {
			const value = await this.cache.getValue(key);
			if (typeof value === 'string') {
				this.logger.info('Fetched cached response');
				return of(JSON.parse(value));
			} else {
				return next.handle().pipe(
					tap(async (res: Response) => {
						this.logger.info(`Set new cache response with expiration:${expiration}.`);
						await this.cache.setValue(key, JSON.stringify(res), expiration);
					}),
					catchError((err) => {
						this.logger.warn('Cache failed' + err);
						return next.handle();
					})
				);
			}
		}
	}
}
