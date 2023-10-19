import {
  IsString,
  ValidateNested,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SlideSchema, SlideSchemaParams } from './types/template';

export class createTemplateDTO {
  @IsString()
  templateName: string;

  @IsString()
  templateCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlideSchemaDTO)
  templateSchema: SlideSchema[];
}

export class SlideSchemaDTO {
  @IsInt()
  slideId: number;

  @ValidateNested()
  @Type(() => SlideSchemaParamsDTO)
  slideTitle: SlideSchemaParams;

  @ValidateNested()
  @Type(() => SlideSchemaParamsDTO)
  slideDescription: SlideSchemaParams;

  @ValidateNested()
  @Type(() => SlideSchemaParamsDTO)
  slideSmallText: SlideSchemaParams;

  @ValidateNested()
  @Type(() => SlideSchemaParamsDTO)
  slideTransition: SlideSchemaParams;

  @ValidateNested()
  @Type(() => SlideSchemaParamsDTO)
  image: SlideSchemaParams;
}

export class SlideSchemaParamsDTO {
  @IsString()
  text: string;

  @IsBoolean()
  isPresent: boolean;
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
  templateId: string;

  @ValidateNested()
  @Type(() => SlideDTO)
  templateData: SlideDTO[];
}
