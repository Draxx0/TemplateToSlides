import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Presentation } from './presentations.entity';
import { Repository } from 'typeorm';
import { savePresentationDTO } from './presentations.dto';
import { User } from 'src/users/user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PresentationsService {
  constructor(
    @InjectRepository(Presentation)
    private readonly presentationRepository: Repository<Presentation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async savePresentation({
    requestUser,
    presentationData,
  }: {
    requestUser: User;
    presentationData: savePresentationDTO;
  }): Promise<{ message: string; data: Presentation }> {
    const user = await this.userRepository.findOneBy({
      id: requestUser.id,
    });

    const newPresentation = this.presentationRepository.create({
      ...presentationData,
      user,
    });

    const presentation = await this.presentationRepository.save(
      newPresentation,
    );

    return {
      message: 'Presentation save',
      data: presentation,
    };
  }

  async getUserPresentations(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const presentations = await this.presentationRepository
      .createQueryBuilder('presentation')
      .where('presentation.user = :userId', { userId: user.id })
      .getMany();

    if (!presentations) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return presentations;
  }
}
