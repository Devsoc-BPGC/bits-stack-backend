/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channels  Entity
 * @author Devesh
 */

import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	ManyToOne,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { Users, Discussions, Hashtags } from '../../database';

@Entity({ name: 'channels' })
export class Channels extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id?: Number;

	@Column({ type: 'varchar', unique: true })
	name!: string;

	@Column({ type: 'varchar', nullable: true, default: '' })
	description!: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;

	@ManyToOne((type) => Users, (user) => user.moderated_channels)
	moderator?: Users;

	@OneToMany((type) => Discussions, (discussion) => discussion.channel)
	discussions?: Discussions[];

	@OneToMany((type) => Hashtags, (hashtag) => hashtag.channel)
	tags?: Discussions[];

	@ManyToMany((type) => Users, (user) => user.subscribed_channels)
	@JoinTable()
	subscribers?: Users[];
}
