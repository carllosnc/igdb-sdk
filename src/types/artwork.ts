import type { IGDBBase, IGDBImage } from "./base";

export interface Artwork extends IGDBBase, IGDBImage {
  artwork_type?: number;
  game?: number;
}

export interface ArtworkType extends IGDBBase {
  name?: string;
  slug?: string;
}

export interface Cover extends IGDBBase, IGDBImage {
  game?: number;
  game_localization?: number;
}

export interface Screenshot extends IGDBBase, IGDBImage {
  game?: number;
}
