import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class GameClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("games", body); }
  engines(body: IGDBQuery) { return this.client.query("game_engines", body); }
  engineLogos(body: IGDBQuery) { return this.client.query("game_engine_logos", body); }
  localizations(body: IGDBQuery) { return this.client.query("game_localizations", body); }
  modes(body: IGDBQuery) { return this.client.query("game_modes", body); }
  releaseFormats(body: IGDBQuery) { return this.client.query("game_release_formats", body); }
  statuses(body: IGDBQuery) { return this.client.query("game_statuses", body); }
  timeToBeats(body: IGDBQuery) { return this.client.query("game_time_to_beats", body); }
  types(body: IGDBQuery) { return this.client.query("game_types", body); }
  videos(body: IGDBQuery) { return this.client.query("game_videos", body); }
}
