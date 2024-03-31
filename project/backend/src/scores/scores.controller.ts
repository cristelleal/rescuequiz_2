import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import ScoreEntity from './Score.entity';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('count')
  async getScoreCount(): Promise<number> {
    return this.scoresService.scoreCount();
  }

  @Get('total')
  async getTotalScore(): Promise<number> {
    return this.scoresService.totalScore();
  }

  @Post()
  async createScore(@Body('value') value: number): Promise<ScoreEntity> {
    return this.scoresService.createScore(value);
  }
}
