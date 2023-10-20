import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { createUserDTO } from './user.dto';
import { DeleteResult } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { TokenObject } from 'src/auth/types/auth';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post()
  async createUser(@Body() body: createUserDTO): Promise<TokenObject> {
    const { password: pass, email } = body;
    await this.userService.createUser(body);

    return await this.authService.login({
      email,
      pass,
    });
  }

  @Get()
  async getUsers(): Promise<Array<User>> {
    return await this.userService.getUsers();
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
