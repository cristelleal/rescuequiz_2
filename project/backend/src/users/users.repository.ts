import { EntityRepository } from '@mikro-orm/postgresql';
import User from './../User.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
  ) {}

  async getUsersByName(name: string) {
    return this.usersRepository.findOne({ name });
  }
}
