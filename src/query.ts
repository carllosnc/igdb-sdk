export type QueryOperator = "=" | "!=" | ">" | "<" | ">=" | "<=" | "~";

export class QueryBuilder<T = Record<string, unknown>> {
  private fieldsList: string[] = [];
  private filters: string[] = [];
  private sortField?: string;
  private sortDir?: "asc" | "desc";
  private limitCount?: number;
  private offsetCount?: number;
  private searchTerm?: string;

  fields<K extends keyof T>(...names: K[]): this {
    this.fieldsList.push(...names.map(String));
    return this;
  }

  expand(...paths: string[]): this {
    this.fieldsList.push(...paths);
    return this;
  }

  private formatValue(value: unknown): string {
    if (Array.isArray(value)) {
      return `[${value.map((v) => (typeof v === "string" ? `"${v}"` : String(v))).join(",")}]`;
    }
    if (typeof value === "string") return `"${value}"`;
    return String(value);
  }

  where(field: keyof T, op: QueryOperator, value: string | number | boolean): this;
  where(field: keyof T, op: "=" | "!=", value: (string | number)[]): this;
  where(raw: string): this;
  where(fieldOrRaw: keyof T | string, op?: QueryOperator, value?: unknown): this {
    if (op !== undefined && value !== undefined) {
      this.filters.push(`${String(fieldOrRaw)} ${op} ${this.formatValue(value)}`);
    } else {
      this.filters.push(String(fieldOrRaw));
    }
    return this;
  }

  whereIn(field: keyof T, values: (string | number)[]): this {
    const formatted = values.map((v) => (typeof v === "string" ? `"${v}"` : String(v))).join(",");
    this.filters.push(`${String(field)} = (${formatted})`);
    return this;
  }

  sort(field: keyof T, direction: "asc" | "desc" = "asc"): this {
    this.sortField = String(field);
    this.sortDir = direction;
    return this;
  }

  limit(n: number): this {
    this.limitCount = n;
    return this;
  }

  offset(n: number): this {
    this.offsetCount = n;
    return this;
  }

  search(term: string): this {
    this.searchTerm = term;
    return this;
  }

  build(): string {
    const parts: string[] = [];
    if (this.fieldsList.length) parts.push(`fields ${this.fieldsList.join(",")};`);
    if (this.filters.length) parts.push(`where ${this.filters.join(" & ")};`);
    if (this.sortField && this.sortDir) parts.push(`sort ${this.sortField} ${this.sortDir};`);
    if (this.searchTerm) parts.push(`search "${this.searchTerm}";`);
    if (this.limitCount !== undefined) parts.push(`limit ${this.limitCount};`);
    if (this.offsetCount !== undefined) parts.push(`offset ${this.offsetCount};`);
    return parts.join(" ");
  }
}

export function query(): QueryBuilder {
  return new QueryBuilder();
}

export function queryFor<T>(): QueryBuilder<T> {
  return new QueryBuilder<T>();
}

export function gameQuery() { return queryFor<Game>(); }
export function platformQuery() { return queryFor<Platform>(); }
export function companyQuery() { return queryFor<Company>(); }
export function ageRatingQuery() { return queryFor<AgeRating>(); }
export function artworkQuery() { return queryFor<Artwork>(); }
export function characterQuery() { return queryFor<Character>(); }
export function collectionQuery() { return queryFor<Collection>(); }
export function eventQuery() { return queryFor<Event>(); }
export function externalGameQuery() { return queryFor<ExternalGame>(); }
export function releaseDateQuery() { return queryFor<ReleaseDate>(); }
export function reportQuery() { return queryFor<Report>(); }
export function searchQuery() { return queryFor<SearchResult>(); }
export function websiteQuery() { return queryFor<Website>(); }
export function coverQuery() { return queryFor<Cover>(); }
export function screenshotQuery() { return queryFor<Screenshot>(); }
export function genreQuery() { return queryFor<Genre>(); }
export function themeQuery() { return queryFor<Theme>(); }
export function gameModeQuery() { return queryFor<GameMode>(); }
export function involvedCompanyQuery() { return queryFor<InvolvedCompany>(); }
export function franchiseQuery() { return queryFor<Franchise>(); }
export function keywordQuery() { return queryFor<Keyword>(); }
export function playerPerspectiveQuery() { return queryFor<PlayerPerspective>(); }
export function multiplayerModeQuery() { return queryFor<MultiplayerMode>(); }
export function regionQuery() { return queryFor<Region>(); }

import type {
  Game, Platform, Company, AgeRating, Artwork, Character, Collection,
  Event, ExternalGame, ReleaseDate, Report, SearchResult, Website,
  Cover, Screenshot, Genre, Theme, GameMode, InvolvedCompany,
  Franchise, Keyword, PlayerPerspective, MultiplayerMode, Region,
} from "./types/index.js";
