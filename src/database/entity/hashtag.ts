import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { Channels, Discussions } from '../../database';
@Entity({ name: 'hashtags' })
export class Hashtags extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', unique: true })
	name!: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;

	@DeleteDateColumn()
	deleted_at?: Date;

	@ManyToOne((type) => Channels, (channel) => channel.tags)
	channel?: Channels;

	@ManyToMany((type) => Discussions, (discussion) => discussion.tags)
	@JoinTable()
	discussions?: Discussions;
}
