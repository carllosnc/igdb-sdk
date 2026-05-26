import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class WebsiteClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("websites", body); }
  types(body: IGDBQuery) { return this.client.query("website_types", body); }
}
