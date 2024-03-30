import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':name')
  getUsersByName(@Param('name') name: string): string {
    return `${name}`;
  }
}
