import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import UserEntity from '../users/User.entity';

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
  value: number;
}