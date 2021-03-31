/**
 * Created DTO
 *
 * @author Devesh
 */

export class CreateDiscussionDto {
	title!: string;
	content!: string;
	Channel_ID!: number;
	tags?: string;
	isAnnouncement?: Boolean;
	files_image?: string;
}
