import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import UserEntity from './User.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async findOne(filter: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOne(filter);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    await this.em.persistAndFlush(user);
    return user;
  }
}
