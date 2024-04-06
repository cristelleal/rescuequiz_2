import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import ScoreEntity from './Score.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScoreDto } from './dto/score.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @ApiOperation({ operationId: 'getScoresCount' })
  @Get('count')
  async getScoresCount(): Promise<number> {
    return this.scoresService.scoreCount();
  }

  @ApiOperation({ operationId: 'getTotalScores' })
  @Get('total')
  async getTotalScores(): Promise<number | ScoreEntity[]> {
    return this.scoresService.totalScore();
  }

  @ApiOperation({ operationId: 'createScore' })
  @Post()
  async createScore(@Body() ScoreDto: ScoreDto): Promise<ScoreEntity> {
    const totalScore = this.scoresService.createScore(ScoreDto.totalScore);
    if (!totalScore) {
      throw new Error('Error : Score not created');
    }
    return totalScore;
  }
}
