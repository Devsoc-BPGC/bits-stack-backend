/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column
} from 'typeorm';


@Entity({name: 'channelDiscussions'})
export class Channels {

	@PrimaryGeneratedColumn({ type:'int'})
	message_ID?: Number;

	@Column({ type: 'varchar'})
	title!: string;

	@Column({ type: 'varchar'})
	content!: string;

  @Column({ type:'int', unique: true })
	Channel_ID?: Number;

  @Column({ type: 'varchar', nullable: true})
	tags!: string;

  @Column({ type: 'varchar'})
	isAnnouncement?: Boolean;

  @Column({ type: 'varchar', nullable: true})
  files_image?: String;

}
