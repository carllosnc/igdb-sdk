export { IGDBClient } from "./IGDBClient.js";
export type { IGDBQuery, IGDBClientOptions } from "./IGDBClient.js";

export { GameClient } from "./client/game/index.js";
export { PlatformClient } from "./client/platform/index.js";
export { CompanyClient } from "./client/company/index.js";
export { AgeRatingClient } from "./client/age-rating/index.js";
export { ArtworkClient } from "./client/artwork/index.js";
export { CharacterClient } from "./client/character/index.js";
export { CollectionClient } from "./client/collection/index.js";
export { EventClient } from "./client/event/index.js";
export { ExternalGameClient } from "./client/external-game/index.js";
export { PopularityClient } from "./client/popularity/index.js";
export { ReleaseDateClient } from "./client/release-date/index.js";
export { ReportClient } from "./client/report/index.js";
export { SearchClient } from "./client/search/index.js";
export { WebsiteClient } from "./client/website/index.js";
export { MiscClient } from "./client/misc/index.js";

export { IgdbError, IgdbApiError, IgdbAuthError, IgdbRateLimitError } from "./errors.js";
export type { Middleware, RequestContext } from "./middleware.js";
export type { RetryOptions } from "./retry.js";

export * from "./types/index.js";
export * from "./query.js";
