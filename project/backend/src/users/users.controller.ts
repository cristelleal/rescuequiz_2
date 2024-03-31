import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import UserEntity from './User.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.usersService.findAll();
    res.json(users);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne({ id });
  }

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.createUser(name, email, password);
    res.status(201).json(user);
  }
}
