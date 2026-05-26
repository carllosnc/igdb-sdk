import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class PlatformClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("platforms", body); }
  families(body: IGDBQuery) { return this.client.query("platform_families", body); }
  logos(body: IGDBQuery) { return this.client.query("platform_logos", body); }
  types(body: IGDBQuery) { return this.client.query("platform_types", body); }
  versions(body: IGDBQuery) { return this.client.query("platform_versions", body); }
  versionCompanies(body: IGDBQuery) { return this.client.query("platform_version_companies", body); }
  versionReleaseDates(body: IGDBQuery) { return this.client.query("platform_version_release_dates", body); }
  websites(body: IGDBQuery) { return this.client.query("platform_websites", body); }
}
