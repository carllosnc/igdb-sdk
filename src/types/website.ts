import type { IGDBBase } from "./base.js";

export interface Website extends IGDBBase {
  category?: number;
  game?: number;
  trusted?: boolean;
  type?: number;
  url?: string;
}

export interface WebsiteType extends IGDBBase {
  type?: string;
}
