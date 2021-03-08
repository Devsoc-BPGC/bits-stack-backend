import { ExpressLoader } from '../loaders/Express';
import { DatabaseLoader } from '../loaders/Database';

export class AppLoader {
	private app: ExpressLoader;
	private db: DatabaseLoader;
	private port: number;

	constructor(port: number) {
		this.port = port;
		this.app = new ExpressLoader(this.port);
		this.db = new DatabaseLoader();
	}

	public async init(): Promise<void> {
		try {
			await this.db.connectPromise();
			await this.app.bootstrap();
		} catch (err) {
			throw new Error('Application has unexpectedly crashed!\n' + err);
		}
	}
}
