import 'reflect-metadata';
import * as morgan from 'morgan';
import { LoggerService } from '../../shared/services/logger.service';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestLogger implements NestMiddleware {

	use(req: Request, res: Response, next: NextFunction): void {
		const Log = new LoggerService();
		morgan('combined', {
			stream: {
				write(message: string) {
					Log.info(message);
				}
			}
		})(req, res, next);
	}
}
