import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import UserEntity from './User.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SignUpDto } from './SignUp.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  authService: any;
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ operationId: 'getUsers' })
  // @UseGuards(LocalAuthGuard)
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getOneUserById' })
  @UseGuards(LocalAuthGuard)
  async findOne(@Param('id') id: number): Promise<UserEntity | null> {
    return this.usersService.findOne({ id });
  }

  @Post()
  @ApiOperation({ operationId: 'createUser' })
  async createUser(@Body() SignUpDto: SignUpDto): Promise<UserEntity> {
    const user = await this.usersService.createUser(
      SignUpDto.name,
      SignUpDto.email,
      SignUpDto.password,
    );
    if (!user) {
      throw new Error('Error : Account not created');
    }
    return user;
  }
}
