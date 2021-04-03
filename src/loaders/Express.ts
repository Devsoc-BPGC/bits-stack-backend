/**
 * @description Added Swagger Module
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import fs from 'fs';

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

		const config = new DocumentBuilder()
			.setTitle('BITS-STACK Backend')
			.setDescription('APIs for BITS-STACK')
			.setVersion('1.0')
			.build();
		const document = SwaggerModule.createDocument(app, config);

		const docJson = JSON.stringify(document);
		fs.writeFile('docs.json', docJson, 'utf8', (err) => {
			if (err) {
				console.log(err);
			}
		});

		SwaggerModule.setup('api', app, document);

		await app.listen(port, () => {
			console.log(`The server is listening on PORT:${port}`);
		});
	}
}
