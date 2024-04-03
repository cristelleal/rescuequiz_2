import { Migration } from '@mikro-orm/migrations';

export class Migration20240329142356 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "users" drop constraint "users_scores_id_foreign";',
    );

    this.addSql(
      'alter table "scores" drop constraint "scores_scores_id_foreign";',
    );

    this.addSql(
      'alter table "users" drop constraint "users_scores_id_unique";',
    );

    this.addSql(
      'alter table "scores" drop constraint "scores_scores_id_unique";',
    );

    this.addSql('alter table "scores" rename column "scores_id" to "user_id";');
    this.addSql(
      'alter table "scores" add constraint "scores_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql('alter table "users" drop column scores_id');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "scores" drop constraint "scores_user_id_foreign";',
    );

    this.addSql('alter table "scores" rename column "user_id" to "scores_id";');
    this.addSql(
      'alter table "scores" add constraint "scores_scores_id_foreign" foreign key ("scores_id") references "users" ("id") on update cascade on delete no action;',
    );
    this.addSql(
      'alter table "scores" add constraint "scores_scores_id_unique" unique ("scores_id");',
    );

    this.addSql(
      'alter table "users" add constraint "users_scores_id_foreign" foreign key ("scores_id") references "users" ("id") on update cascade on delete no action;',
    );
    this.addSql(
      'alter table "users" add constraint "users_scores_id_unique" unique ("scores_id");',
    );
    this.addSql('alter table "users" add column "scores_id" int not null;');
  }
}
