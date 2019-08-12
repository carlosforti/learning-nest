import {MigrationInterface, QueryRunner} from 'typeorm';

export class BlogCreate1565614157937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: max-line-length
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "author" character varying(100) NOT NULL, "url" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "blog"`);
    }

}
