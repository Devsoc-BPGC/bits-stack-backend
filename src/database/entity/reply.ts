import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Users, Discussions, Answers } from '../../database';

export enum ReplyTarget {
	DISCUSSION = 'discussion',
	ANSWER = 'answer'
}

@Entity({ name: 'replies' })
export class Replies extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar' })
	content!: string;

	@Column({
		type: 'enum',
		enum: ReplyTarget
	})
	target?: ReplyTarget;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;

	@ManyToOne((type) => Discussions, (discussion) => discussion.replies)
	discussion?: Discussions;

	@ManyToOne((type) => Users, (user) => user.replies)
	user?: Users;

	@ManyToOne((type) => Answers, (answer) => answer.replies)
	answer?: Answers;
}
