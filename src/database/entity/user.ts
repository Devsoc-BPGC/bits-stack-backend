/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	JoinTable,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	BaseEntity,
	OneToMany
} from 'typeorm';

export enum UserRole {
	ULTRA_INSTINCT = 'ultra_instinct',
	VEGETA = 'vegeta',
	POPO = 'popo'
}

@Entity({name: 'users'})
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column('varchar')
	name!: string;

	@Column({ type: 'varchar', unique: true })
	email!: string;

	@Column({ type: 'text', nullable: true, default: '' })
	avatar_url?: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.POPO
	})
	org_role?: UserRole;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	updated_at?: Date;
}
