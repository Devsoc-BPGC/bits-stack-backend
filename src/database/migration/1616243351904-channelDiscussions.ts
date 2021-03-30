import { MigrationInterface, QueryRunner } from 'typeorm';

export class channelDiscussions1616243351904 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "channelDiscussions" (
            "id" SERIAL NOT NULL,
            "title" character varying NOT NULL,
            "content" character varying NOT NULL,
            "Channel_ID" integer NOT NULL,            
            "tags" character varying,
            "isAnnouncement" boolean  NOT NULL,            
            "files_image" character varying, 
            UNIQUE ("title"),           
            PRIMARY KEY ("id"))`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE channelDiscussions');
	}
}
