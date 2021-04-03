/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateChannelsDto {
	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	channel_Name!: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	channel_Mod!: string;
}
