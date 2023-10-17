export interface GetTemplateData {
  templateName: string;
  templateData: Array<Slide>;
}

interface Slide {
  slideTitle: string;
  slideDescription?: string;
  slideTransition?: Transition;
  images?: {
    isStack: boolean;
    data: Array<Image>;
  };
}

interface Image {
  url: string;
  isFragment: boolean;
}

type Transition = 'zoom' | 'fast' | 'slide' | 'convex' | 'concave' | 'fade';

export interface Template {
  id: string;
  templateName: string;
  templateCode: string;
}
