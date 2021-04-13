/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description Updated the code after change in entities
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateDiscussionDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	title!: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	content!: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	files_image?: string;
}
