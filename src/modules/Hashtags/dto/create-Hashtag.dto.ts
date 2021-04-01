/**
 * Created DTO
 *
 * @author Devesh
 */

import { IsString, IsDefined } from 'class-validator';
export class CreateHashtagDto {
	@IsDefined()
	@IsString()
	tag_name!: string;
}
