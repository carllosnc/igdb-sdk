import type { IGDBBase, IGDBImage } from "./base.js";

export interface Character extends IGDBBase {
  akas?: string[];
  character_gender?: number;
  character_species?: number;
  country_name?: string;
  description?: string;
  games?: number[];
  gender?: number;
  mug_shot?: number;
  name?: string;
  slug?: string;
  species?: number;
  url?: string;
}

export interface CharacterGender extends IGDBBase {
  name?: string;
}

export interface CharacterMugShot extends IGDBBase, IGDBImage {}

export interface CharacterSpecies extends IGDBBase {
  name?: string;
}
