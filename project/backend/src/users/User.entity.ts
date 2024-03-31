import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import ScoreEntity from '../scores/Score.entity';

@Entity({ tableName: 'users' })
export default class UserEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @OneToMany(() => ScoreEntity, 'user')
  scores = new Collection<ScoreEntity>(this);
  value: string;
}
