/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created DTO
 *
 * @author Devesh
 */

export class UpdateDiscussionDto {
	title!: string;
	content!: string;
	Channel_ID!: number;
	tags?: string;
	isAnnouncement?: Boolean;
	files_image?: string;
}
