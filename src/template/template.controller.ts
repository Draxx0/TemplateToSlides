import { Body, Controller, Get } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Delete, Param, Post } from '@nestjs/common/decorators';
import { GetTemplateDTO, createTemplateDTO } from './template.dto';
import { Template } from './types/template';
import { DeleteResult } from 'typeorm';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async createTemplate(
    @Body() templateData: createTemplateDTO,
  ): Promise<string> {
    return await this.templateService.createTemplate({ templateData });
  }

  @Post('/generate-template')
  async generateTemplate(@Body() data: GetTemplateDTO): Promise<string> {
    const { templateId, templateData } = data;
    return await this.templateService.generateTemplate({
      templateId,
      templateData,
    });
  }

  @Get(':id')
  async getTemplate(@Param('id') id: string): Promise<Template | undefined> {
    return await this.templateService.getTemplate(id);
  }

  @Get()
  async getTemplates(): Promise<Template[] | undefined> {
    return await this.templateService.getTemplates();
  }

  @Delete(':id')
  async deleteTemplate(
    @Param('id') id: string,
  ): Promise<{ message: string; deletionInfos: DeleteResult } | undefined> {
    return await this.templateService.deleteTemplate(id);
  }
}
