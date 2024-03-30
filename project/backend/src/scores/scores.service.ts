import { Injectable } from '@nestjs/common';
@Injectable()
export class ScoresService {
  private readonly scores: number[] = [10, 50, 80, 40];

  scoreCount(): number {
    return this.scores.length;
  }

  async totalScore(): Promise<number> {
    const scoreSum = this.scores.reduce((a: number, b: number) => a + b, 0);
    const finalScore = Math.round(scoreSum / this.scores.length);
    return finalScore;
  }
}
