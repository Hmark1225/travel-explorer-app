export type Language = "en" | "hu";
export type Localized<T> = { en: T; hu: T };
export interface DestinationText {
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  coordinateLabel: string;
}
export interface AttractionText {
  name: string;
  shortDescription: string;
  detailedDescription: string;
  estimatedDuration: string;
  usefulTips: string[];
}
export interface HungarianAttraction {
  name: string;
  shortDescription: string;
  detailedDescription: string;
  usefulTips: string[];
}
export interface HungarianGuide {
  name: string;
  region: string;
  tagline: string;
  description: string;
  coordinateLabel: string;
  attractions: Record<string, HungarianAttraction>;
}
