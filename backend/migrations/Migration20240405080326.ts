import { Migration } from '@mikro-orm/migrations';

export class Migration20240405080326 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "scores" alter column "score_count" type int using ("score_count"::int);');
    this.addSql('alter table "scores" alter column "score_count" set default 0;');
    this.addSql('alter table "scores" alter column "total_score" type int using ("total_score"::int);');
    this.addSql('alter table "scores" alter column "total_score" set default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "scores" alter column "score_count" drop default;');
    this.addSql('alter table "scores" alter column "score_count" type int4 using ("score_count"::int4);');
    this.addSql('alter table "scores" alter column "total_score" drop default;');
    this.addSql('alter table "scores" alter column "total_score" type int4 using ("total_score"::int4);');
  }

}
