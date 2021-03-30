/**
 * @description Initialises Express Application
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from '../app.module';

export class ExpressLoader {
	private readonly port: number;

	constructor(port: number) {
		this.port = port;
	}

	public async bootstrap(): Promise<void> {
		// app.disable('x-powered-by');
		/* app.use('/', (res: express.Response) => {
			res.send('Welcome to Bits Stack')
		}) */
		const port = this.port || 5000;
		const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
		app.listen(port, () => {
			console.log(`The server is listening on PORT:${port}`);
		});
	}
}
