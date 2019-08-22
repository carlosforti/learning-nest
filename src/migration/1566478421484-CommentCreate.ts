import {MigrationInterface, QueryRunner} from 'typeorm';

export class CommentCreate1566478421484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "comment" (
            "id" SERIAL NOT NULL,
            "name" character varying(200) NOT NULL,
            "email" character varying(200) NOT NULL,
            "text" character varying NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
