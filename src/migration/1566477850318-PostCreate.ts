import {MigrationInterface, QueryRunner} from 'typeorm';

export class PostCreate1566477850318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "post" (
            "id" SERIAL NOT NULL,
            "title" character varying(200) NOT NULL,
            "date" TIMESTAMP NOT NULL,
            "content" character varying NOT NULL,
            "isDraft" boolean NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            "blogId" integer,
            CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post"
            ADD CONSTRAINT "FK_d0418ddc42c5707dbc37b05bef9"
            FOREIGN KEY ("blogId")
            REFERENCES "blog"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_d0418ddc42c5707dbc37b05bef9"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
