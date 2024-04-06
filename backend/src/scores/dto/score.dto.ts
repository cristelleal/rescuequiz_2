import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScoreDto {
  @ApiProperty({
    example: 50,
    description: 'The score of the user',
  })
  @IsNumber()
  totalScore: number;

  @IsNumber()
  userId: number;
}
