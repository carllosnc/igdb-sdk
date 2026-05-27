import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { SearchResult } from "../../types/index.js";

export class SearchClient {
  constructor(private client: IGDBClient) {}

  /**
   * Search IGDB.
   * @see https://api-docs.igdb.com/#search
   */
  async getSearch(body: IGDBQuery): Promise<SearchResult[]> {
    return this.client.query("search", body);
  }
}
