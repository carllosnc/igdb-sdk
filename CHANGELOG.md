# Changelog

## [0.1.1] - 2026-05-27

### Added
- `HttpClient` interface and `FetchHttpClient` for injectable HTTP layer
- Custom HTTP client injection via `httpClient` option
- Export `HttpClient`, `HttpResponse`, and `FetchHttpClient` from package
- Example scripts: middleware pipeline, error handling with retry, queryCount + getById

### Changed
- Middleware `onResponse` now receives `HttpResponse` (not native `Response`)
- `IGDBClient` uses injected `httpClient` instead of raw `fetch` internally
- Token endpoint also goes through the injected HTTP client

### Fixed
- Test middleware pipeline tests match updated `onResponse` signature

## [0.1.0] - 2026-05-27

### Added
- IGDBClient with automatic OAuth 2.0 token management (Twitch client credentials)
- 15 domain sub-clients covering all 75 IGDB API v4 endpoints (games, platforms, companies, age ratings, artwork, characters, collections, events, external games, popularity, release dates, reports, search, websites, misc)
- Fully-typed TypeScript interfaces for all 75 API resources
- Typed QueryBuilder with chainable API: `fields()`, `expand()`, `where()`, `whereIn()`, `sort()`, `search()`, `limit()`, `offset()`, `build()`
- 24 typed factory functions (`gameQuery()`, `platformQuery()`, etc.)
- Custom error classes: `IgdbError`, `IgdbApiError`, `IgdbAuthError`, `IgdbRateLimitError`
- Retry with exponential backoff and jitter (retries on 429, 5xx, and network errors)
- Middleware pipeline with `onRequest`, `onResponse`, and `onError` hooks
- Debug mode (`debug: true`) that logs requests, responses, and errors
- Count endpoint support (`queryCount()` + `getCount()` on sub-clients)
- `getById(id, fields?)` convenience method on all sub-clients
- Dual CJS/ESM build output
- `sideEffects: false` for tree-shaking
- MIT License
- 140 unit tests covering all sub-clients, error classes, retry utils, and QueryBuilder
- GitHub Actions CI for typecheck and tests
- Example scripts for common use cases
