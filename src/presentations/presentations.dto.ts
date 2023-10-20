import { IsString } from 'class-validator';

export class savePresentationDTO {
  @IsString()
  presentationName: string;

  @IsString()
  presentationCode: string;
}
