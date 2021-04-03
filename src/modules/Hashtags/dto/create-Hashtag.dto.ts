/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateHashtagDto {
	@IsDefined()
	@IsString()
	@ApiProperty()
	tag_name!: string;
}
