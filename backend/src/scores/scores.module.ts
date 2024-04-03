import { MikroOrmModule } from '@mikro-orm/nestjs';
import ScoreEntity from './Score.entity';
import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  imports: [MikroOrmModule.forFeature([ScoreEntity])],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
})
export class ScoresModule {}
