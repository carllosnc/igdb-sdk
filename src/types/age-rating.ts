import type { IGDBBase } from "./base";

export interface AgeRating extends IGDBBase {
  category?: number;
  content_descriptions?: number[];
  organization?: number;
  rating?: number;
  rating_category?: number;
  rating_content_descriptions?: number[];
  rating_cover_url?: string;
  synopsis?: string;
}

export interface AgeRatingCategory extends IGDBBase {
  organization?: number;
  rating?: string;
}

export interface AgeRatingContentDescription extends IGDBBase {
  category?: number;
  description?: string;
}

export interface AgeRatingContentDescriptionType extends IGDBBase {
  name?: string;
  slug?: string;
}

export interface AgeRatingContentDescriptionV2 extends IGDBBase {
  description?: string;
  description_type?: number;
  organization?: number;
}

export interface AgeRatingOrganization extends IGDBBase {
  name?: string;
}
