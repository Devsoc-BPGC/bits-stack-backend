/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	BaseEntity,
	DeleteDateColumn,
	ManyToOne,
	OneToMany
} from 'typeorm';

import { Discussions, Channels, Replies, Answers } from '../../database';

export enum UserRole {
	ULTRA_INSTINCT = 'ultra_instinct',
	VEGETA = 'vegeta',
	POPO = 'popo'
}

@Entity({ name: 'users' })
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	name!: string;

	@Column({ type: 'varchar', unique: true })
	email!: string;

	@Column({ type: 'varchar', unique: true })
	roll_number!: string;

	@Column({ type: 'text', nullable: true, default: '' })
	avatar_url?: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.POPO
	})
	user_role?: UserRole;

	@Column({ type: 'text', nullable: true, default: '' })
	about?: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;

	@OneToMany((type) => Channels, (channel) => channel.moderator)
	moderated_channels?: Channels[];

	@OneToMany((type) => Discussions, (discussion) => discussion.created_by)
	discussions?: Discussions[];

	@OneToMany((type) => Answers, (answer) => answer.user)
	answers?: Answers[];

	@OneToMany((type) => Replies, (reply) => reply.user)
	replies?: Replies[];

	@ManyToMany((type) => Channels, (channel) => channel.subscribers)
	subscribed_channels?: Channels[];
}
