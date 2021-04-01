/**
 * @description Added Custom Validation Pipe
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsDefined, IsOptional, IsEmail } from 'class-validator';
export class CreateUserDto {
	@IsDefined()
	@IsString()
	name!: string;

	@IsDefined()
	@IsEmail()
	email!: string;

	@IsDefined()
	@IsString()
	roll_number!: string;

	@IsOptional()
	@IsString()
	avatar_url?: string;

	@IsOptional()
	@IsString()
	about?: string;
}
