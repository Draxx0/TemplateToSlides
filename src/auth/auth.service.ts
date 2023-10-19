import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //! CHANGE RETURN TYPE
  async login({ email, pass }: { email: string; pass: string }): Promise<any> {
    const user = await this.usersService.findOne(email);

    console.log('email', email, 'pass', pass, 'user pass', user.password);

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

    console.log('PL', payload, process.env.JWT_SECRET);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
