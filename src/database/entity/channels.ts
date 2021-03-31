/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Created Channels  Entity
 * @author Devesh
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'channels' })
export class Channels {
	@PrimaryGeneratedColumn({ type: 'int' })
	channel_ID?: Number;

	@Column({ type: 'varchar', unique: true })
	channel_Name!: string;

	@Column({ type: 'varchar', unique: true })
	channel_Mod!: string;
	// will make relations later for the abive with Userid
}
