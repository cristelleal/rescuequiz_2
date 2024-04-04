import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignInDto {
  @ApiProperty()
  access_token: string;
}
