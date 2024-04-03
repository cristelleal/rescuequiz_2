import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ScoreDto {
  @ApiProperty({
    example: 50,
    description: 'The score of the user',
  })
  @IsNumber()
  score: number;
}
