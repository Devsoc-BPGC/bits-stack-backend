/**
 * @description Added Validation
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsNumber, IsString, IsDefined, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateDiscussionDto {
	@IsDefined()
	@IsString()
	@ApiProperty()
	title!: string;

	@IsDefined()
	@IsString()
	@ApiProperty()
	content!: string;

	@IsDefined()
	@IsNumber()
	@ApiProperty()
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
