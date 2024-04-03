import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import ScoreEntity from './Score.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScoreDto } from './score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('count')
  async getScoresCount(): Promise<number> {
    return this.scoresService.scoreCount();
  }

  @Get('total')
  async getTotalScores(): Promise<number | ScoreEntity[]> {
    return this.scoresService.totalScore();
  }

  @Post()
  async createScore(@Body() ScoreDto: ScoreDto): Promise<ScoreEntity> {
    const score = this.scoresService.createScore(ScoreDto.score);
    if (!score) {
      throw new Error('Error : Score not created');
    }
    return score;
  }
}
