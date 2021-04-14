/**
 * @description Updated the code after change in entities
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateChannelsDto {
	@IsDefined()
	@IsString()
	@ApiProperty()
	name!: string;

	@IsDefined()
	@IsString()
	@ApiProperty()
	description!: string;
}
