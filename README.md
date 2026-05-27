
<picture>
  <img alt="IGDB logo" src="https://upload.wikimedia.org/wikipedia/commons/1/19/IGDB_logo.svg" width="70">
</picture>

# IGDB SDK

[![CI](https://github.com/carllosnc/igdb-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/carllosnc/igdb-sdk/actions/workflows/ci.yml)

Unofficial [IGDB API v4](https://api-docs.igdb.com/) SDK for TypeScript.

Zero runtime dependencies — uses the global `fetch` API (Node 18+, Bun, Deno).

## Setup

```bash
npm install igdb-sdk
```

```bash
bun install igdb-sdk
```

Copy `.env.example` to `.env` and fill in your Twitch credentials ([register here](https://dev.twitch.tv/console/apps)):

```bash
cp .env.example .env
```

## Usage

```typescript
import { IGDBClient, gameQuery } from "igdb-sdk";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const games = await client.game.getGames(
  gameQuery()
    .fields("name", "rating", "cover")
    .where("rating", ">", 80)
    .sort("rating", "desc")
    .limit(5)
    .build(),
);
```

### QueryBuilder

Build IGDB query strings with a typed chainable API. Field names auto-complete from the response type.

| Method | Example |
|---|---|
| `.fields("name", "rating")` | Select fields |
| `.expand("cover.url", "screenshots.url")` | Nested expansions (dot notation) |
| `.where("rating", ">", 80)` | Filter conditions |
| `.where("platforms", "=", [48, 130])` | Array containment |
| `.whereIn("id", [1020, 1025])` | IN-list (`id = (1020,1025)`) |
| `.sort("rating", "desc")` | Sort direction |
| `.search("Mario")` | Full-text search |
| `.limit(5).offset(10)` | Pagination |
| `.build()` | Produces final query string |

Typed factory functions: `gameQuery()`, `platformQuery()`, `companyQuery()`, `searchQuery()`, `genreQuery()`, `themeQuery()`, `coverQuery()`, `franchiseQuery()`, `playerPerspectiveQuery()`, and more. For ad-hoc types use `queryFor<T>()`.

### Bare string (for complex queries)

```typescript
client.game.getGames("fields name,rating; where rating > 80; sort rating desc; limit 5;");
```

### Convenience methods

```typescript
// Get by ID — returns item or null
const game = await client.game.getById(1020, "name,rating,cover");

// Count matching records
const count = await client.game.getCount("where rating > 80;");
```

### Error handling

```typescript
import { IgdbApiError, IgdbAuthError, IgdbRateLimitError } from "igdb-sdk";

try {
  await client.query("games", "...");
} catch (e) {
  if (e instanceof IgdbRateLimitError) console.log("rate limited");
  if (e instanceof IgdbAuthError) console.log("bad credentials");
  if (e instanceof IgdbApiError) console.log(`${e.statusCode} on ${e.endpoint}`);
}
```

### Retry

Transient failures (429, 5xx, network errors) are retried automatically with exponential backoff.

```typescript
const client = new IGDBClient({
  clientId: "...",
  clientSecret: "...",
  retry: { maxRetries: 5, baseDelayMs: 500 },
});
```

### Middleware

Intercept requests and responses with custom hooks.

```typescript
const logger = {
  name: "logger",
  onRequest(ctx) { console.log(`→ ${ctx.endpoint}`); return ctx; },
  onResponse(res, ctx) { console.log(`← ${ctx.endpoint} ${res.status}`); return res; },
  onError(err, ctx) { console.error(`✗ ${ctx.endpoint} ${err.message}`); },
};

const client = new IGDBClient({ clientId, clientSecret, middlewares: [logger] });
```

### Debug mode

Built-in request/response logging — shorthand for the logger middleware above.

```typescript
const client = new IGDBClient({ clientId, clientSecret, debug: true });
// → games
//   body: fields name,rating; limit 5;
// ← games 200
```

## Examples

See [`examples/`](./examples) for runnable scripts. Run with your `.env` file loaded:

```bash
bun run --env-file .env examples/basic-usage.ts
bun run --env-file .env examples/search-games.ts
bun run --env-file .env examples/game-details.ts
bun run --env-file .env examples/company-and-platforms.ts
bun run --env-file .env examples/reference-data.ts
```

## Sub-clients

| Client | Endpoints |
|---|---|
| `client.game` | games, game_engines, game_engine_logos, game_localizations, game_modes, game_release_formats, game_statuses, game_time_to_beats, game_types, game_videos |
| `client.platform` | platforms, platform_families, platform_logos, platform_types, platform_versions, platform_version_companies, platform_version_release_dates, platform_websites |
| `client.company` | companies, company_logos, company_sizes, company_statuses, company_type_histories, company_types, company_websites |
| `client.ageRating` | age_ratings, age_rating_categories, age_rating_content_descriptions, age_rating_content_description_types, age_rating_content_descriptions_v2, age_rating_organizations |
| `client.artwork` | artworks, artwork_types, covers, screenshots |
| `client.character` | characters, character_genders, character_mug_shots, character_species |
| `client.collection` | collections, collection_memberships, collection_membership_types, collection_relations, collection_relation_types, collection_types |
| `client.event` | events, event_logos, event_networks |
| `client.externalGame` | external_games, external_game_sources |
| `client.popularity` | popularity_primitives, popularity_types |
| `client.releaseDate` | release_dates, release_date_regions, release_date_statuses |
| `client.report` | reports, report_types |
| `client.search` | search |
| `client.website` | websites, website_types |
| `client.misc` | alternative_names, date_formats, entity_types, franchises, genres, involved_companies, keywords, languages, language_supports, language_support_types, multiplayer_modes, network_types, player_perspectives, regions, themes |

## Scripts

| Command | Action |
|---|---|
| `bun run build` | Compile ESM + CJS to `dist/` |
| `bun test` | Run tests (140+) |
| `bun run typecheck` | TypeScript type checking |

---

Carlos Costa @ 2026
