import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import ScoreEntity from './Score.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScoreDto } from './score.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ operationId: 'getScoresCount' })
  @Get('count')
  async getScoresCount(): Promise<number> {
    return this.scoresService.scoreCount();
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ operationId: 'getTotalScores' })
  @Get('total')
  async getTotalScores(): Promise<number | ScoreEntity[]> {
    return this.scoresService.totalScore();
  }

  @ApiOperation({ operationId: 'createScore' })
  @Post()
  async createScore(@Body() ScoreDto: ScoreDto): Promise<ScoreEntity> {
    const score = this.scoresService.createScore(ScoreDto.score);
    if (!score) {
      throw new Error('Error : Score not created');
    }
    return score;
  }
}
