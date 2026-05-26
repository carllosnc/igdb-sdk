import type { IGDBBase, IGDBDateTime } from "./base";

export interface ReleaseDate extends IGDBBase {
  category?: number;
  d?: number;
  date?: IGDBDateTime;
  date_format?: number;
  game?: number;
  human?: string;
  m?: number;
  platform?: number;
  region?: number;
  release_region?: number;
  status?: number;
  y?: number;
}

export interface ReleaseDateRegion extends IGDBBase {
  region?: string;
}

export interface ReleaseDateStatus extends IGDBBase {
  description?: string;
  name?: string;
}
