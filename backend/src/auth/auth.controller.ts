import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseSignInDto } from './dto/responseSignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getAuth' })
  @ApiOkResponse({ type: ResponseSignInDto })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<ResponseSignInDto> {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }
}
