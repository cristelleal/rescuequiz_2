import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import UserEntity from './User.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SignUpDto } from './SignUp.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('users')
export class UsersController {
  authService: any;
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(LocalAuthGuard)
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  async findOne(@Param('id') id: number): Promise<UserEntity | null> {
    return this.usersService.findOne({ id });
  }

  @Post()
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
