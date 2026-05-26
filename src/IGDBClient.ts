import type { EndpointResponseMap } from "./types/index.js";
import { GameClient } from "./client/game/index.js";
import { PlatformClient } from "./client/platform/index.js";
import { CompanyClient } from "./client/company/index.js";
import { AgeRatingClient } from "./client/age-rating/index.js";
import { ArtworkClient } from "./client/artwork/index.js";
import { CharacterClient } from "./client/character/index.js";
import { CollectionClient } from "./client/collection/index.js";
import { EventClient } from "./client/event/index.js";
import { ExternalGameClient } from "./client/external-game/index.js";
import { PopularityClient } from "./client/popularity/index.js";
import { ReleaseDateClient } from "./client/release-date/index.js";
import { ReportClient } from "./client/report/index.js";
import { SearchClient } from "./client/search/index.js";
import { WebsiteClient } from "./client/website/index.js";
import { MiscClient } from "./client/misc/index.js";

const BASE_URL = "https://api.igdb.com/v4";
const TOKEN_URL = "https://id.twitch.tv/oauth2/token";

export type IGDBQuery = string;

export interface IGDBClientOptions {
  clientId: string;
  clientSecret: string;
}

type EndpointName = keyof EndpointResponseMap;

export class IGDBClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  game: GameClient;
  platform: PlatformClient;
  company: CompanyClient;
  ageRating: AgeRatingClient;
  artwork: ArtworkClient;
  character: CharacterClient;
  collection: CollectionClient;
  event: EventClient;
  externalGame: ExternalGameClient;
  popularity: PopularityClient;
  releaseDate: ReleaseDateClient;
  report: ReportClient;
  search: SearchClient;
  website: WebsiteClient;
  misc: MiscClient;

  constructor(options: IGDBClientOptions) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;

    this.game = new GameClient(this);
    this.platform = new PlatformClient(this);
    this.company = new CompanyClient(this);
    this.ageRating = new AgeRatingClient(this);
    this.artwork = new ArtworkClient(this);
    this.character = new CharacterClient(this);
    this.collection = new CollectionClient(this);
    this.event = new EventClient(this);
    this.externalGame = new ExternalGameClient(this);
    this.popularity = new PopularityClient(this);
    this.releaseDate = new ReleaseDateClient(this);
    this.report = new ReportClient(this);
    this.search = new SearchClient(this);
    this.website = new WebsiteClient(this);
    this.misc = new MiscClient(this);
  }

  private async ensureToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "client_credentials",
      }),
    });

    if (!res.ok) {
      throw new Error(`Auth failed: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as { access_token: string; expires_in: number };
    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000;
    return this.accessToken!;
  }

  async query<E extends EndpointName>(
    endpoint: E,
    body: IGDBQuery,
  ): Promise<EndpointResponseMap[E]> {
    const token = await this.ensureToken();

    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Client-ID": this.clientId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`IGDB API error (${endpoint}): ${res.status} ${await res.text()}`);
    }

    return res.json() as Promise<EndpointResponseMap[E]>;
  }
}
