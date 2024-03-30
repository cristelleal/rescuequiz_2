import { EntityRepository } from '@mikro-orm/postgresql';
import Score from './../Score.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoresRepository: EntityRepository<Score>,
  ) {}

  async getTotalScore(totalScore: number) {
    return this.scoresRepository.findOne({ totalScore });
  }

  async getScoreCount(scoreCount: number) {
    return this.scoresRepository.findOne({ scoreCount });
  }
}
