import {
  IsString,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createTemplateDTO {
  @IsString()
  templateName: string;

  @IsString()
  templateCode: string;
}

class ImageDTO {
  @IsString()
  url: string;

  @IsBoolean()
  isFragment: boolean;
}

export class SlideDTO {
  @IsString()
  slideTitle: string;

  @IsOptional()
  @IsString()
  slideDescription?: string;

  @IsOptional()
  @IsString()
  slideTransition?: string;

  @IsBoolean()
  isStack: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDTO)
  data: ImageDTO[];
}

export class GetTemplateDTO {
  @IsString()
  templateName: string;

  @ValidateNested()
  @Type(() => SlideDTO)
  templateData: SlideDTO[];
}
