/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channel Discussion Entity
 * @author Devesh
 *
 * @description Changed name of class and extended BaseEntity
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
	ManyToOne,
	ManyToMany,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from 'typeorm';
import { Users, Channels, Hashtags, Replies, Answers } from '../../database';

export enum DiscussionType {
	POST = 'post',
	QUESTION = 'question',
	ANNOUNCEMENT = 'announcement'
}

@Entity({ name: 'discussions' })
export class Discussions extends BaseEntity {
	@PrimaryGeneratedColumn('increment', { type: 'int' })
	id?: Number;

	@Column({ type: 'varchar' })
	title!: string;

	@Column({ type: 'varchar' })
	content!: string;

	@Column({
		type: 'enum',
		enum: DiscussionType,
		default: DiscussionType.POST
	})
	type?: DiscussionType;

	@Column({ type: 'varchar', nullable: true })
	files_link?: String;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;

	@ManyToOne((type) => Users, (user) => user.discussions)
	created_by?: Users;

	@ManyToOne((type) => Channels, (channel) => channel.discussions)
	channel?: Channels;

	@OneToMany((type) => Answers, (answer) => answer.discussion)
	answers?: Answers[];

	@OneToMany((type) => Replies, (reply) => reply.discussion)
	replies?: Replies[];

	@ManyToMany((type) => Hashtags, (hashtags) => hashtags.discussions)
	tags?: Hashtags;
}
