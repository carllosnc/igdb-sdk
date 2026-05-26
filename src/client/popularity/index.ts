import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class PopularityClient {
  constructor(private client: IGDBClient) {}

  primitives(body: IGDBQuery) { return this.client.query("popularity_primitives", body); }
  types(body: IGDBQuery) { return this.client.query("popularity_types", body); }
}
