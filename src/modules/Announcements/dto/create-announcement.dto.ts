/**
 * Created DTO
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

export class CreateAnnouncementDto {
	title!: string;
	content!: string;
	Channel_ID!: number;
	tags?: string;
	files_image?: string;
}
