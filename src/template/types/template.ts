export interface GetTemplateData {
  templateName: string;
  templateData: Array<Slide>;
}

interface Slide {
  slideTitle: string;
  slideDescription?: string;
  slideTeam?: string;
  slideTransition: Transition;
  positions: [x: number, y: number];
  image?: string;
}

type Transition = 'zoom' | 'fast' | 'slide' | 'convex' | 'concave' | 'fade';

export type Stack = 'r-stack' | 'r-stretch' | 'r-fit-text';

export interface Template {
  id: string;
  templateName: string;
  templateCode: string;
}
