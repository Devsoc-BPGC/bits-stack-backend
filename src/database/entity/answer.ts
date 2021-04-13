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
import { Users, Discussions, Replies } from '../../database';
@Entity({ name: 'answers' })
export class Answers extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar' })
	content!: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;

	@ManyToOne((type) => Discussions, (discussion) => discussion.answers)
	discussion?: Discussions;

	@ManyToOne((type) => Users, (user) => user.answers)
	user?: Users;

	@OneToMany((type) => Replies, (reply) => reply.answer)
	replies?: Replies[];
}
