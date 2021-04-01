/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsOptional } from 'class-validator';
export class UpdateHashtagDto {
	@IsOptional()
	@IsString()
	tag_name!: string;
}
