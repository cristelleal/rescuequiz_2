import { Controller, Get, Param } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':score')
  async findAll(@Param('score') score: number): Promise<number> {
    return score;
  }
}
