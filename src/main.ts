/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Bootstrap your app
 *
 * @author Sarvesh Shinde <SarveshShinde64@gmail.com>
 */

import * as os from 'os';
import * as cluster from 'cluster';
import { ConfigService } from './shared/services/config.service';
const configservice = new ConfigService();

import { AppLoader } from './loaders/App';

class App {
	public async run(clusterMode: boolean, port: number) {
		const app: AppLoader = new AppLoader(port);
		const mode: boolean = clusterMode;
		console.log(mode);
		if (mode) {
			if (cluster.isMaster) {
				console.log(`Master ${process.pid} is running`);

				// Fork workers.
				for (let i = 0; i < os.cpus().length; i++) {
					cluster.fork();
				}

				cluster.on('exit', (worker, code, signal) => {
					console.log(`worker ${worker.process.pid} died`);
				});
			} else {
				/**
				 * Run the server on clusters.
				 */
				try {
					await app.init();

					console.log(`Worker ${process.pid} started`);
				} catch (err) {
					console.log(err);
				}
			}
		} else {
			try {
				await app.init();

				console.log(`Worker ${process.pid} started`);
			} catch (err) {
				console.log(err);
			}
		}
	}
}

const mode: boolean = configservice.express.cluster;
const port: number = configservice.express.port;
new App().run(mode, port);
