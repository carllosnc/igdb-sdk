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

  async getCount(body: IGDBQuery): Promise<number> {
    return this.client.queryCount("search", body);
  }

  async getById(id: number, fields: string = "name"): Promise<SearchResult | null> {
    const results = await this.client.query("search", `fields ${fields}; where id = ${id};`);
    return results[0] ?? null;
  }
}
