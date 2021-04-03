/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateHashtagDto {
	@IsOptional()
	@IsString()
	@ApiProperty()
	tag_name!: string;
}
