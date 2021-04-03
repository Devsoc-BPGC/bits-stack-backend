/**
 * @description Documented through Swagger
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsDefined, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
	@IsDefined()
	@IsString()
	@ApiProperty()
	name!: string;

	@IsDefined()
	@IsEmail()
	@ApiProperty()
	email!: string;

	@IsDefined()
	@IsString()
	@ApiProperty()
	roll_number!: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	avatar_url?: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	about?: string;
}
