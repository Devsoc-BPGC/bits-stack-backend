import {MigrationInterface, QueryRunner} from 'typeorm';

export class HashtagMigration1616264611399 implements MigrationInterface {
    name = 'HashtagMigration1616264611399';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashtags" (
            "id" SERIAL NOT NULL,
            "tag_name" character varying NOT NULL,
            CONSTRAINT "PK_994c5bf9151587560db430018c5" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE hashtags');
    }

}
