import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './template.entity';
import { GetTemplateDTO, createTemplateDTO } from './template.dto';
import { generateTemplateWithData } from 'src/utils/generateTemplateWithData';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async createTemplate({
    templateData,
  }: {
    templateData: createTemplateDTO;
  }): Promise<string> {
    const { templateCode, templateName, templateSchema } = templateData;
    try {
      const template = this.templateRepository.create({
        templateCode,
        templateName,
        templateSchema,
      });

      await this.templateRepository.save(template);
    } catch (error) {
      console.log(error);
      throw new Error('An error occured during template creation');
    }

    return 'Template sucessfully created';
  }

  async generateTemplate(data: GetTemplateDTO) {
    const template = await this.templateRepository.findOneBy({
      id: data.templateId,
    });
    if (!template) {
      throw new Error('template not found');
    }
    const { templateCode } = template;
    const templateFormatted = generateTemplateWithData({
      templateCode,
      slides: data.templateData,
    });
    return JSON.stringify(templateFormatted);
  }

  async getTemplates() {
    const templates = await this.templateRepository.find();

    if (!templates) {
      throw new Error('An error occured, Templates not found');
    }

    return templates;
  }

  async getTemplate(id: string) {
    try {
      return await this.templateRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new Error('Template not found');
    }
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
