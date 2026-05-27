import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  ReleaseDate, ReleaseDateRegion, ReleaseDateStatus,
} from "../../types/index.js";

export class ReleaseDateClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get release dates.
   * @see https://api-docs.igdb.com/#release_dates
   */
  async getReleaseDates(body: IGDBQuery): Promise<ReleaseDate[]> {
    return this.client.query("release_dates", body);
  }

  /**
   * Get release date regions.
   * @see https://api-docs.igdb.com/#release_date_regions
   */
  async getRegions(body: IGDBQuery): Promise<ReleaseDateRegion[]> {
    return this.client.query("release_date_regions", body);
  }

  /**
   * Get release date statuses.
   * @see https://api-docs.igdb.com/#release_date_statuses
   */
  async getStatuses(body: IGDBQuery): Promise<ReleaseDateStatus[]> {
    return this.client.query("release_date_statuses", body);
  }
}
