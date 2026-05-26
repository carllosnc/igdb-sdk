import type { IGDBBase, IGDBTimestamp } from "./base";

export interface SearchResult extends IGDBBase {
  alternative_name?: string;
  character?: number;
  collection?: number;
  company?: number;
  description?: string;
  game?: number;
  name?: string;
  platform?: number;
  published_at?: IGDBTimestamp;
  theme?: number;
}
