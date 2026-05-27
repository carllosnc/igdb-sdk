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
import { IgdbApiError, IgdbAuthError, IgdbRateLimitError } from "./errors.js";
import type { RequestContext, Middleware } from "./middleware.js";
import type { RetryOptions } from "./retry.js";
import { defaultRetry, sleep, calculateBackoff, isRetryable } from "./retry.js";
import type { HttpClient, HttpResponse } from "./http.js";
import { FetchHttpClient } from "./http.js";

const BASE_URL = "https://api.igdb.com/v4";
const TOKEN_URL = "https://id.twitch.tv/oauth2/token";

export type IGDBQuery = string;

export interface IGDBClientOptions {
  clientId: string;
  clientSecret: string;
  retry?: RetryOptions;
  middlewares?: Middleware[];
  debug?: boolean;
  httpClient?: HttpClient;
}

type EndpointName = keyof EndpointResponseMap;

export class IGDBClient {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private retryOptions: Required<RetryOptions>;
  private middlewares: Middleware[];
  private httpClient: HttpClient;

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
    this.retryOptions = { ...defaultRetry, ...options.retry };
    this.middlewares = options.middlewares ?? [];
    this.httpClient = options.httpClient ?? new FetchHttpClient();

    if (options.debug) {
      this.middlewares.unshift({
        name: "debug",
        onRequest(ctx) {
          console.log(`[IGDB] → ${ctx.endpoint}\n  body: ${ctx.body}`);
          return ctx;
        },
        onResponse(res, ctx) {
          console.log(`[IGDB] ← ${ctx.endpoint} ${res.status}`);
          return res;
        },
        onError(err, ctx) {
          console.error(`[IGDB] ✗ ${ctx.endpoint} ${err.message}`);
        },
      });
    }

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

    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });

    const res = await this.httpClient.post(TOKEN_URL, {
      "Content-Type": "application/x-www-form-urlencoded",
    }, body.toString());

    if (res.status >= 400) {
      throw new IgdbAuthError(res.status, res.body);
    }

    const data = JSON.parse(res.body) as { access_token: string; expires_in: number };
    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000;
    return this.accessToken!;
  }

  async query<E extends EndpointName>(
    endpoint: E,
    body: IGDBQuery,
  ): Promise<EndpointResponseMap[E]> {
    const token = await this.ensureToken();

    let ctx: RequestContext = {
      endpoint,
      body,
      headers: {
        "Client-ID": this.clientId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    };

    for (const mw of this.middlewares) {
      if (mw.onRequest) {
        ctx = await mw.onRequest(ctx);
      }
    }

    let response: HttpResponse;
    try {
      response = await this.fetchWithRetry(ctx);
    } catch (error) {
      for (const mw of this.middlewares) {
        if (mw.onError) {
          await mw.onError(error as Error, ctx);
        }
      }
      throw error;
    }

    for (const mw of this.middlewares.toReversed()) {
      if (mw.onResponse) {
        response = await mw.onResponse(response, ctx);
      }
    }

    return JSON.parse(response.body) as EndpointResponseMap[E];
  }

  async queryCount<E extends EndpointName>(endpoint: E, body: IGDBQuery): Promise<number> {
    const token = await this.ensureToken();

    let ctx: RequestContext = {
      endpoint: `${endpoint}/count`,
      body,
      headers: {
        "Client-ID": this.clientId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    };

    for (const mw of this.middlewares) {
      if (mw.onRequest) {
        ctx = await mw.onRequest(ctx);
      }
    }

    let response: HttpResponse;
    try {
      response = await this.fetchWithRetry(ctx);
    } catch (error) {
      for (const mw of this.middlewares) {
        if (mw.onError) {
          await mw.onError(error as Error, ctx);
        }
      }
      throw error;
    }

    for (const mw of this.middlewares.toReversed()) {
      if (mw.onResponse) {
        response = await mw.onResponse(response, ctx);
      }
    }

    const data = JSON.parse(response.body) as { count: number }[];
    return data[0]?.count ?? 0;
  }

  private async fetchWithRetry(ctx: RequestContext, attempt: number = 0): Promise<HttpResponse> {
    try {
      const res = await this.httpClient.post(`${BASE_URL}/${ctx.endpoint}`, ctx.headers, ctx.body);

      if (res.status >= 400) {
        const error = classifyError(res.status, ctx.endpoint, ctx.body, res.body);

        if (attempt < this.retryOptions.maxRetries && isRetryable(error)) {
          await sleep(calculateBackoff(attempt, this.retryOptions.baseDelayMs, this.retryOptions.maxDelayMs));
          return this.fetchWithRetry(ctx, attempt + 1);
        }

        throw error;
      }

      return res;
    } catch (error) {
      if (error instanceof IgdbApiError) throw error;

      if (attempt < this.retryOptions.maxRetries) {
        await sleep(calculateBackoff(attempt, this.retryOptions.baseDelayMs, this.retryOptions.maxDelayMs));
        return this.fetchWithRetry(ctx, attempt + 1);
      }

      throw error;
    }
  }
}

function classifyError(status: number, endpoint: string, body: string, responseText: string): IgdbApiError {
  if (status === 429) {
    return new IgdbRateLimitError(status, endpoint, body, responseText);
  }
  return new IgdbApiError(status, endpoint, body, responseText);
}
