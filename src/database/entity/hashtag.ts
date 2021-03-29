import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hashtags' })
export class Hashtags extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: bigint;

	@Column({ type: 'varchar', unique: true })
	tag_name!: string;
}
