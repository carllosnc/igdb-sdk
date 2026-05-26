import type { IGDBBase, IGDBDateTime } from "./base";

export interface PopularityPrimitive extends IGDBBase {
  calculated_at?: IGDBDateTime;
  external_popularity_source?: number;
  game_id?: number;
  popularity_source?: number;
  popularity_type?: number;
  value?: number;
}

export interface PopularityType extends IGDBBase {
  external_popularity_source?: number;
  name?: string;
  popularity_source?: number;
}
