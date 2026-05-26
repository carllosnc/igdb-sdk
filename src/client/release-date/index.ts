import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class ReleaseDateClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("release_dates", body); }
  regions(body: IGDBQuery) { return this.client.query("release_date_regions", body); }
  statuses(body: IGDBQuery) { return this.client.query("release_date_statuses", body); }
}
