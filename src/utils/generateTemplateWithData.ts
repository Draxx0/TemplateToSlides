import { SlideDTO } from 'src/template/template.dto';

export const generateTemplateWithData = ({
  templateCode,
  slides,
}: {
  templateCode: string;
  slides: SlideDTO[];
}): string => {
  let finalTemplateCode: string = templateCode;

  // for (const slide of slides) {
  //   for (const [slideKey, slideValue] of Object.entries(slide)) {
  //     const regex = new RegExp(`%${slideKey}%`);
  //     console.log('KEY', slideKey, 'VALUE', slideValue);

  //     if (slideKey === 'subSlides') {
  //     }
  //     finalTemplateCode = finalTemplateCode.replace(regex, slideValue);
  //     // console.log(finalTemplateCode);
  //   }
  // }

  for (const slide of slides) {
    for (const [slideKey, slideValue] of Object.entries(slide)) {
      if (slideKey === 'positions') {
        continue;
      }
      const regex = new RegExp(`%${slideKey}%`);
      finalTemplateCode = finalTemplateCode.replace(regex, slideValue);
    }

    const y = slide.positions[1];

    if (y > 0) {
      console.log("IT'S SUB");
    }
  }

  // console.log('FINAL TEMPLATE CODE', finalTemplateCode);

  return finalTemplateCode;
};
