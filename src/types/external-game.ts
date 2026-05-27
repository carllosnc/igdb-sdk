import type { IGDBBase } from "./base.js";

export interface ExternalGame extends IGDBBase {
  category?: number;
  countries?: number[];
  external_game_source?: number;
  game?: number;
  game_release_format?: number;
  media?: number;
  name?: string;
  platform?: number;
  uid?: string;
  url?: string;
  year?: number;
}

export interface ExternalGameSource extends IGDBBase {
  name?: string;
}
