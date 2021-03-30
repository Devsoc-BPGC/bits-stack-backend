import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1616220575316 implements MigrationInterface {
	name = 'UserMigration1616220575316';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "users" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "roll_number" character varying NOT NULL,
            "avatar_url" text DEFAULT '',
            "user_role" "user_role_enum" NOT NULL DEFAULT 'popo',
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "about" text DEFAULT '',
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
            CONSTRAINT "UQ_fde755c21c02dd5f05545a90949" UNIQUE ("roll_number"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE users');
	}
}
