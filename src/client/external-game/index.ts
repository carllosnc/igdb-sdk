import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { ExternalGame, ExternalGameSource } from "../../types/index.js";

export class ExternalGameClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get external games.
   * @see https://api-docs.igdb.com/#external_games
   */
  async getExternalGames(body: IGDBQuery): Promise<ExternalGame[]> {
    return this.client.query("external_games", body);
  }

  /**
   * Get external game sources.
   * @see https://api-docs.igdb.com/#external_game_sources
   */
  async getSources(body: IGDBQuery): Promise<ExternalGameSource[]> {
    return this.client.query("external_game_sources", body);
  }

  async getCount(body: IGDBQuery): Promise<number> {
    return this.client.queryCount("external_games", body);
  }

  async getById(id: number, fields: string = "name"): Promise<ExternalGame | null> {
    const results = await this.client.query("external_games", `fields ${fields}; where id = ${id};`);
    return results[0] ?? null;
  }
}
