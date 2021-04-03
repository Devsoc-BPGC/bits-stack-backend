/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description Added Validation
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
	@IsNumber()
	@ApiPropertyOptional()
	Channel_ID!: number;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	tags?: string;

	@IsOptional()
	@IsBoolean()
	@ApiPropertyOptional()
	isAnnouncement?: Boolean;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	files_image?: string;
}
