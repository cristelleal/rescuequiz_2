import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import UserEntity from '../users/User.entity';

@Entity({ tableName: 'scores' })
export default class ScoreEntity {
  @PrimaryKey()
  id!: number;

  @Property({ default: 0 })
  scoreCount = 0;

  @Property({ default: 0 })
  totalScore = 0;

  @Property()
  value: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
