import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleMigration1616220537290 implements MigrationInterface {
	name = 'UserRoleMigration1616220537290';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "user_role_enum" 
            as enum('ultra_instinct', 'vegeta', 'popo')`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TYPE ');
	}
}
