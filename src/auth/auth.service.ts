import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { TokenObject } from './types/auth';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({
    email,
    pass,
  }: {
    email: string;
    pass: string;
  }): Promise<TokenObject> {
    const user = await this.usersService.findOne(email);

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      id: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    };
  }
}
