/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description Changed name of class and extended BaseEntity
 *
 * @author Shreyash <pandeyshreyash2201@gmail.com>
 */

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'discussions' })
export class Discussions extends BaseEntity {
	@PrimaryGeneratedColumn('increment', { type: 'int' })
	message_ID?: Number;

	@Column({ type: 'varchar' })
	title!: string;

	@Column({ type: 'varchar' })
	content!: string;

	@Column({ type: 'int' })
	Channel_ID?: Number;

	@Column({ type: 'varchar', nullable: true })
	tags!: string;

	@Column({ type: 'varchar' })
	isAnnouncement?: Boolean;

	@Column({ type: 'varchar', nullable: true })
	files_image?: String;
}
