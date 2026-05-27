import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { PopularityPrimitive, PopularityType } from "../../types/index.js";

export class PopularityClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get popularity primitives.
   * @see https://api-docs.igdb.com/#popularity_primitives
   */
  async getPrimitives(body: IGDBQuery): Promise<PopularityPrimitive[]> {
    return this.client.query("popularity_primitives", body);
  }

  /**
   * Get popularity types.
   * @see https://api-docs.igdb.com/#popularity_types
   */
  async getTypes(body: IGDBQuery): Promise<PopularityType[]> {
    return this.client.query("popularity_types", body);
  }
}
