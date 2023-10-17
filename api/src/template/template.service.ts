import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './template.entity';
import { GetTemplateDTO } from './template.dto';
import { generateTemplateWithData } from 'src/utils/generateTemplateWithData';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async createTemplate({
    templateName,
    templateCode,
  }: {
    templateName: string;
    templateCode: string;
  }): Promise<string> {
    try {
      const template = this.templateRepository.create({
        templateName,
        templateCode,
      });

      await this.templateRepository.save(template);
    } catch (error) {
      console.error('An error occured', { error });
      throw new Error('An error occured during template creation');
    }

    return 'Template sucessfully created';
  }

  async generateTemplate(data: GetTemplateDTO) {
    const template = await this.templateRepository.findOneBy({
      templateName: data.templateName,
    });
    if (!template) {
      throw new Error('template not found');
    }
    const { templateCode } = template;
    const templateFormatted = generateTemplateWithData({
      templateCode,
      slides: data.templateData,
    });
    return templateFormatted;
  }

  async getTemplate() {
    const templates = await this.templateRepository.find();

    if (!templates) {
      throw new Error('An error occured, Templates not found');
    }

    return templates;
  }

  async deleteTemplate(id: string) {
    try {
      const response = await this.templateRepository.delete(id);
      return {
        message: 'Template deleted',
        deletionInfos: response,
      };
    } catch (error) {
      throw new Error('An error occured during deletion of the template');
    }
  }
}
