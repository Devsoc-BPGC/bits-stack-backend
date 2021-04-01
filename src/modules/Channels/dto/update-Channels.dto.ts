/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsOptional } from 'class-validator';
export class UpdateChannelsDto {
	@IsOptional()
	@IsString()
	channel_Name!: string;

	@IsOptional()
	@IsString()
	channel_Mod!: string;
}
