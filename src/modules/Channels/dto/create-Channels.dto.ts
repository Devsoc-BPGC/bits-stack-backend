/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsDefined } from 'class-validator';
export class CreateChannelsDto {
	@IsDefined()
	@IsString()
	channel_Name!: string;

	@IsDefined()
	@IsString()
	channel_Mod!: string;
}
