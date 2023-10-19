import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createUserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async createUser(body: createUserDTO): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
      return await this.userRepository.save(body);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }

  async getUsers(): Promise<Array<User>> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Users not found');
    }
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
