import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRefactoring1674920707052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" RENAME COLUMN "nome" TO "course"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" RENAME COLUMN "course" TO "name"`,
    );
  }
}
