import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class ExternalGameClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("external_games", body); }
  sources(body: IGDBQuery) { return this.client.query("external_game_sources", body); }
}
