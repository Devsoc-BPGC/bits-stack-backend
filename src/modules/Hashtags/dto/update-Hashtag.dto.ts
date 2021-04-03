/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description Documented through Swagger
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateHashtagDto {
	@IsOptional()
	@IsString()
	@ApiProperty()
	tag_name!: string;
}
