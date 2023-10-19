export interface GetTemplateData {
  templateId: string;
  templateData: Array<Slide>;
}

export interface Slide {
  slideTitle: string;
  slideDescription?: string;
  slideSmallText?: string;
  slideTransition: Transition;
  image?: string;
}

export interface SlideSchema {
  slideId: number;
  slideTitle: SlideSchemaParams;
  slideDescription: SlideSchemaParams;
  slideSmallText: SlideSchemaParams;
  slideTransition: SlideSchemaParams;
  image: SlideSchemaParams;
}

export interface SlideSchemaParams {
  text: string;
  isPresent: boolean;
}

type Transition = 'zoom' | 'fast' | 'slide' | 'convex' | 'concave' | 'fade';

export type Stack = 'r-stack' | 'r-stretch' | 'r-fit-text';

export interface Template {
  id: string;
  templateName: string;
  templateCode: string;
}
