import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class SearchClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("search", body); }
}
