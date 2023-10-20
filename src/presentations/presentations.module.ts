import { Module } from '@nestjs/common';
import { PresentationsController } from './presentations.controller';
import { PresentationsService } from './presentations.service';
import { Presentation } from './presentations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presentation, User])],
  controllers: [PresentationsController],
  providers: [PresentationsService],
})
export class PresentationsModule {}
