/**
 * @description Updated the code after change in entities
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

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	files_link?: string;
}
