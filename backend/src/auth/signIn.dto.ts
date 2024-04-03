import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'john_doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
