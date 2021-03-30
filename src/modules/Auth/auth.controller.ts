import { Controller, Get } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '../../shared/services/config.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private configservice: ConfigService, private authservice: AuthService) {}

	@Get('google/oauth2')
	async googleauth() {
		const auth = await this.authservice.getauthenticatedClient(['profile', 'email']);
		const people = google.people({ version: 'v1', auth: auth });
		const user = await people.people.get({
			resourceName: 'people/me',
			personFields: 'names,emailAddresses'
		});

		// Check for already existing user in database and validate the user. Return a jwt token to client.

		return {
			name: user.data.names ? user.data.names[0].displayName : 'Sarvesh',
			email: user.data.emailAddresses ? user.data.emailAddresses[0].value : 'S@gmail'
		};
	}
}
