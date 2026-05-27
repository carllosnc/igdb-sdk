import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { Website, WebsiteType } from "../../types/index.js";

export class WebsiteClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get websites.
   * @see https://api-docs.igdb.com/#websites
   */
  async getWebsites(body: IGDBQuery): Promise<Website[]> {
    return this.client.query("websites", body);
  }

  /**
   * Get website types.
   * @see https://api-docs.igdb.com/#website_types
   */
  async getTypes(body: IGDBQuery): Promise<WebsiteType[]> {
    return this.client.query("website_types", body);
  }

  async getCount(body: IGDBQuery): Promise<number> {
    return this.client.queryCount("websites", body);
  }

  async getById(id: number, fields: string = "name"): Promise<Website | null> {
    const results = await this.client.query("websites", `fields ${fields}; where id = ${id};`);
    return results[0] ?? null;
  }
}
