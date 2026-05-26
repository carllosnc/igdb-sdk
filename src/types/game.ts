import type { IGDBBase, IGDBImage, IGDBTimestamp } from "./base";

export interface Game extends IGDBBase {
  age_ratings?: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names?: number[];
  artworks?: number[];
  bundles?: number[];
  category?: number;
  collection?: number;
  collections?: number[];
  cover?: number;
  dlcs?: number[];
  expanded_games?: number[];
  expansions?: number[];
  external_games?: number[];
  first_release_date?: IGDBTimestamp;
  follows?: number;
  forks?: number[];
  franchise?: number;
  franchises?: number[];
  game_engines?: number[];
  game_localizations?: number[];
  game_modes?: number[];
  game_status?: number;
  game_type?: number;
  genres?: number[];
  hypes?: number;
  involved_companies?: number[];
  keywords?: number[];
  language_supports?: number[];
  multiplayer_modes?: number[];
  name?: string;
  parent_game?: number;
  platforms?: number[];
  player_perspectives?: number[];
  ports?: number[];
  rating?: number;
  rating_count?: number;
  release_dates?: number[];
  remakes?: number[];
  remasters?: number[];
  screenshots?: number[];
  similar_games?: number[];
  slug?: string;
  standalone_expansions?: number[];
  status?: number;
  storyline?: string;
  summary?: string;
  tags?: number[];
  themes?: number[];
  total_rating?: number;
  total_rating_count?: number;
  url?: string;
  version_parent?: number;
  version_title?: string;
  videos?: number[];
  websites?: number[];
}

export interface GameEngine extends IGDBBase {
  companies?: number[];
  description?: string;
  logo?: number;
  name?: string;
  platforms?: number[];
  slug?: string;
  url?: string;
}

export interface GameEngineLogo extends IGDBBase, IGDBImage {}

export interface GameLocalization extends IGDBBase {
  cover?: number;
  game?: number;
  name?: string;
  region?: number;
}

export interface GameMode extends IGDBBase {
  name?: string;
  slug?: string;
  url?: string;
}

export interface GameReleaseFormat extends IGDBBase {
  format?: string;
}

export interface GameStatus extends IGDBBase {
  status?: string;
}

export interface GameTimeToBeat extends IGDBBase {
  completely?: number;
  count?: number;
  game_id?: number;
  hastily?: number;
  normally?: number;
}

export interface GameType extends IGDBBase {
  type?: string;
}

export interface GameVideo extends IGDBBase {
  game?: number;
  name?: string;
  video_id?: string;
}
