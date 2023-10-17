import { IsString, ValidateNested, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class createTemplateDTO {
  @IsString()
  templateName: string;

  @IsString()
  templateCode: string;
}

export class SlideDTO {
  @IsString()
  slideTitle: string;

  @IsOptional()
  @IsString()
  slideDescription?: string;

  @IsOptional()
  @IsString()
  slideSmallText?: string;

  @IsString()
  slideTransition: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class GetTemplateDTO {
  @IsString()
  templateName: string;

  @ValidateNested()
  @Type(() => SlideDTO)
  templateData: SlideDTO[];
}