import 'reflect-metadata';
import { LoggerService } from '../../shared/services/logger.service';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpMiddleware implements NestMiddleware {
	private logger: LoggerService;

	constructor() {
		this.logger = new LoggerService();
	}

	private setheaders(req: Request, res: Response): void {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // cors header
		if (req.method === 'OPTIONS') {
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, HEAD');
			res.header('Access-Control-Max-Age', '1728000');
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Accept,Authorization, X-AUTH-TOKEN');
			res.header('Content-Length', '0');
			res.sendStatus(208);
		}
	}

	use(req: Request, res: Response, next: NextFunction): void {
		this.setheaders(req, res);
		this.logger.info('Set http middleware');
		next();
	}
}
