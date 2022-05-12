import { MigrationInterface, QueryRunner } from "typeorm";

export class urls1652342967117 implements MigrationInterface {
    name = 'urls1652342967117'

    async up(queryRunner: QueryRunner) {
        await queryRunner.query(`CREATE TABLE "urls" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "shortcode" character varying(10) NOT NULL, "click" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, CONSTRAINT "URL_SHORTNER_UQ_NAMES" UNIQUE ("url", "shortcode"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec198edcc54cc05ca0aad8d9b3" ON "urls" ("url") `);
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_ec198edcc54cc05ca0aad8d9b3"`);
        await queryRunner.query(`DROP TABLE "urls"`);
    }
}
