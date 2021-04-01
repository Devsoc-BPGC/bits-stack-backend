/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description Added Validation
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
export class UpdateDiscussionDto {
	@IsOptional()
	@IsString()
	title!: string;

	@IsOptional()
	@IsString()
	content!: string;

	@IsOptional()
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
