/**
 * @description Documented through Swagger
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateChannelsDto {
	@IsDefined()
	@IsString()
	@ApiProperty()
	channel_Name!: string;

	@IsDefined()
	@IsString()
	@ApiProperty()
	channel_Mod!: string;
}
