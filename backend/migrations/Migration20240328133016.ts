import { Migration } from '@mikro-orm/migrations';

export class Migration20240328133016 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "name" text not null, "email" text not null, "password" text not null);',
    );
  }
}
