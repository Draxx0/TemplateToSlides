import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { savePresentationDTO } from './presentations.dto';
import { Presentation } from './presentations.entity';

@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationService: PresentationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async savePresentation(
    @Body() presentationData: savePresentationDTO,
    @Request() req,
  ): Promise<{ message: string; data: Presentation }> {
    const requestUser = req.user;
    return this.presentationService.savePresentation({
      requestUser,
      presentationData,
    });
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  async getUserPresentation(@Param('id') id: string) {
    return this.presentationService.getUserPresentations(id);
  }
}
