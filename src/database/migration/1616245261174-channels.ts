import { MigrationInterface, QueryRunner } from 'typeorm';

export class channels1616245261174 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "channels" (
            "id?" SERIAL NOT NULL,
            "channel_Name" character varying NOT NULL,
            "channel_Mod" character varying NOT NULL,      
            PRIMARY KEY ("id?"))`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE channels');
	}
}
