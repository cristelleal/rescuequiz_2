import { Migration } from '@mikro-orm/migrations';

export class Migration20240329135448 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "scores" ("id" serial primary key, "score_count" int not null, "total_score" int not null, "scores_id" int not null);',
    );
    this.addSql(
      'alter table "scores" add constraint "scores_scores_id_unique" unique ("scores_id");',
    );

    this.addSql(
      'alter table "scores" add constraint "scores_scores_id_foreign" foreign key ("scores_id") references "users" ("id") on update cascade;',
    );

    this.addSql('alter table "users" add column "scores_id" int not null;');
    this.addSql(
      'alter table "users" alter column "name" type text using ("name"::text);',
    );
    this.addSql(
      'alter table "users" alter column "email" type text using ("email"::text);',
    );
    this.addSql(
      'alter table "users" alter column "password" type text using ("password"::text);',
    );
    this.addSql(
      'alter table "users" add constraint "users_scores_id_foreign" foreign key ("scores_id") references "users" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "users" add constraint "users_scores_id_unique" unique ("scores_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "users" drop constraint "users_scores_id_foreign";',
    );

    this.addSql(
      'alter table "users" drop constraint "users_scores_id_unique";',
    );

    this.addSql(
      'alter table "users" alter column "name" type text using ("name"::text);',
    );
    this.addSql(
      'alter table "users" alter column "email" type text using ("email"::text);',
    );
    this.addSql(
      'alter table "users" alter column "password" type text using ("password"::text);',
    );
  }
}
