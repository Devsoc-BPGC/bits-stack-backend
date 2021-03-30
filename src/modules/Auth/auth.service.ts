import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../shared/services/config.service';
import { google } from 'googleapis';
import express from 'express';
import destroyer from 'server-destroy';
import open from 'open';

@Injectable()
export class AuthService {
	constructor(private configservice: ConfigService) {}

	async getauthenticatedClient(scope: string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			const oAuth2Client = new google.auth.OAuth2(
				this.configservice.googleapis.client_id,
				this.configservice.googleapis.client_secret,
				this.configservice.googleapis.redirect_uri
			);

			// Generate the url that will be used for the consent dialog.
			const authorizeUrl = oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: scope
			});

			// Open a server to accept the oauth callback. Port used is 3000. The server is immediately destroyed after it has served its purpose.
			const app = express();
			const server = app
				.use(async (req, res) => {
					const code = req.query.code;
					if (!code) {
						reject('No access code found');
						res.end('No access code found! Close this tab and try again later.');
					} else if (typeof code === 'string') {
						console.log(`Code is ${code}`);
						console.log(`Url is ${authorizeUrl}`);

						// Now that we have the code, use that to acquire tokens.
						const { tokens } = await oAuth2Client.getToken(code);
						// Make sure to set the credentials on the OAuth2 client.
						oAuth2Client.setCredentials(tokens);
						console.info('Tokens acquired.');
						resolve(oAuth2Client);
						res.end(
							'Received authenticated client! You can close this tab now and go back to google oauth uri.'
						);
						server.destroy();
					} else {
						reject('Invalid access code! Close this tab and try again later.');
					}
				})
				.listen(3000, async () => {
					if (!this.configservice.isDocker) {
						open(authorizeUrl)
							.then((child_process) => child_process.unref())
							.catch((err) => console.log(err));
					} else {
						console.log(
							'Docker is unable to open browser from inside a container. Copy this uri and paste it in the browser: \n' +
								authorizeUrl
						);
					}
				});
			destroyer(server);
			return;
		});
	}
}
