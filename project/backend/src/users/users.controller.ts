import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import UserEntity from './User.entity';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne({ id });
  }

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<UserEntity> {
    return await this.usersService.createUser(name, email, password);
  }
}
