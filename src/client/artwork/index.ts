import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class ArtworkClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("artworks", body); }
  types(body: IGDBQuery) { return this.client.query("artwork_types", body); }
  covers(body: IGDBQuery) { return this.client.query("covers", body); }
  screenshots(body: IGDBQuery) { return this.client.query("screenshots", body); }
}
