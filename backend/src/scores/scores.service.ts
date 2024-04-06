import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EntityManager } from '@mikro-orm/core';
import ScoreEntity from './Score.entity';

@Injectable()
export class ScoresService {
  findAll(): ScoreEntity[] | PromiseLike<ScoreEntity[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(ScoreEntity)
    private readonly scoreRepository: EntityRepository<ScoreEntity>,
    private readonly em: EntityManager,
  ) {}

  async scoreCount(): Promise<number> {
    return await this.scoreRepository.count();
  }

  async totalScore(): Promise<number | ScoreEntity[]> {
    const scores = await this.scoreRepository.findAll();
    if (scores.length === 0) return 0;

    const totalScore = scores.reduce((acc, score) => acc + score.value, 0);
    return Math.round(totalScore / scores.length);
  }

  async createScore(totalScore: number): Promise<ScoreEntity> {
    const newScore = new ScoreEntity();
    newScore.totalScore = totalScore;
    await this.em.persistAndFlush(newScore);
    return newScore;
  }
}
