import { SlideDTO } from 'src/template/template.dto';

export const generateTemplateWithData = ({
  templateCode,
  slides,
}: {
  templateCode: string;
  slides: SlideDTO[];
}): string => {
  let finalTemplateCode: string = templateCode;

  for (const slide of slides) {
    for (const [slideKey, slideValue] of Object.entries(slide)) {
      const regex = new RegExp(`%${slideKey}%`);

      finalTemplateCode = finalTemplateCode.replace(regex, slideValue);
    }
  }

  return finalTemplateCode;
};
