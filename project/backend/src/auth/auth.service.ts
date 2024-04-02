import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ name: name });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    console.log(`Password validation result: ${isPasswordValid}`);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async signIn(name: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ name: name });
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new Error('LogIn error');
    }
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
