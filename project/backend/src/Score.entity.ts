import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import UserEntity from './User.entity';
@Entity({ tableName: 'scores' })
export default class ScoreEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  scoreCount!: number;

  @Property()
  totalScore!: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
