/**
 * @description Added Validation
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsNumber, IsString, IsDefined, IsOptional, IsBoolean } from 'class-validator';
export class CreateDiscussionDto {
	@IsDefined()
	@IsString()
	title!: string;

	@IsDefined()
	@IsString()
	content!: string;

	@IsDefined()
	@IsNumber()
	Channel_ID!: number;

	@IsOptional()
	@IsString()
	tags?: string;

	@IsOptional()
	@IsBoolean()
	isAnnouncement?: Boolean;

	@IsOptional()
	@IsString()
	files_image?: string;
}
