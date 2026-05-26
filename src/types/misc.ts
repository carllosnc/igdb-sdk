import type { IGDBBase } from "./base";

export interface AlternativeName extends IGDBBase {
  comment?: string;
  game?: number;
  name?: string;
}

export interface DateFormat extends IGDBBase {
  format?: string;
}

export interface EntityType extends IGDBBase {
  description?: string;
  name?: string;
}

export interface Franchise extends IGDBBase {
  games?: number[];
  name?: string;
  slug?: string;
  url?: string;
}

export interface Genre extends IGDBBase {
  name?: string;
  slug?: string;
  url?: string;
}

export interface InvolvedCompany extends IGDBBase {
  company?: number;
  developer?: boolean;
  game?: number;
  porting?: boolean;
  publisher?: boolean;
  supporting?: boolean;
}

export interface Keyword extends IGDBBase {
  name?: string;
  slug?: string;
  url?: string;
}

export interface Language extends IGDBBase {
  locale?: string;
  name?: string;
  native_name?: string;
}

export interface LanguageSupport extends IGDBBase {
  game?: number;
  language?: number;
  language_support_type?: number;
}

export interface LanguageSupportType extends IGDBBase {
  name?: string;
}

export interface MultiplayerMode extends IGDBBase {
  campaigncoop?: boolean;
  dropin?: boolean;
  game?: number;
  lancoop?: boolean;
  offlinecoop?: boolean;
  offlinecoopmax?: number;
  offlinemax?: number;
  onlinecoop?: boolean;
  onlinecoopmax?: number;
  onlinemax?: number;
  platform?: number;
  splitscreen?: boolean;
  splitscreenonline?: boolean;
}

export interface NetworkType extends IGDBBase {
  event_networks?: number[];
  name?: string;
}

export interface PlayerPerspective extends IGDBBase {
  name?: string;
  slug?: string;
  url?: string;
}

export interface Region extends IGDBBase {
  category?: string;
  identifier?: string;
  name?: string;
}

export interface Theme extends IGDBBase {
  name?: string;
  slug?: string;
  url?: string;
}
