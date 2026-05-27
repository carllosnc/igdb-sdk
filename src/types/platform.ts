import type { IGDBBase, IGDBImage, IGDBTimestamp } from "./base.js";

export interface Platform extends IGDBBase {
  abbreviation?: string;
  alternative_name?: string;
  category?: number;
  generation?: number;
  name?: string;
  platform_family?: number;
  platform_logo?: number;
  platform_type?: number;
  slug?: string;
  summary?: string;
  url?: string;
  versions?: number[];
  websites?: number[];
}

export interface PlatformFamily extends IGDBBase {
  name?: string;
  slug?: string;
}

export interface PlatformLogo extends IGDBBase, IGDBImage {}

export interface PlatformType extends IGDBBase {
  name?: string;
}

export interface PlatformVersion extends IGDBBase {
  companies?: number[];
  connectivity?: string;
  cpu?: string;
  graphics?: string;
  main_manufacturer?: number;
  media?: string;
  memory?: string;
  name?: string;
  os?: string;
  output?: string;
  platform_logo?: number;
  platform_version_release_dates?: number[];
  resolutions?: string;
  slug?: string;
  sound?: string;
  storage?: string;
  summary?: string;
  url?: string;
}

export interface PlatformVersionCompany extends IGDBBase {
  comment?: string;
  company?: number;
  developer?: boolean;
  manufacturer?: boolean;
}

export interface PlatformVersionReleaseDate extends IGDBBase {
  category?: number;
  date?: IGDBTimestamp;
  date_format?: number;
  human?: string;
  m?: number;
  platform_version?: number;
  region?: number;
  release_region?: number;
  y?: number;
}

export interface PlatformWebsite extends IGDBBase {
  category?: number;
  trusted?: boolean;
  type?: number;
  url?: string;
}
