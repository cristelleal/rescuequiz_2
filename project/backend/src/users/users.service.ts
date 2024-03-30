import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      email: 'example@gmail',
      password: 'example001',
    },
    {
      userId: 2,
      username: 'david',
      email: 'example2@gmail',
      password: 'example002',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
