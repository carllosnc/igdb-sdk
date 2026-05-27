import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  Game, GameEngine, GameEngineLogo, GameLocalization, GameMode,
  GameReleaseFormat, GameStatus, GameTimeToBeat, GameType, GameVideo,
} from "../../types/index.js";

export class GameClient {
  constructor(private client: IGDBClient) {}

  /**
   * Search and retrieve games from IGDB.
   * @see https://api-docs.igdb.com/#games
   */
  async getGames(body: IGDBQuery): Promise<Game[]> {
    return this.client.query("games", body);
  }

  /**
   * Get game engines.
   * @see https://api-docs.igdb.com/#game_engines
   */
  async getEngines(body: IGDBQuery): Promise<GameEngine[]> {
    return this.client.query("game_engines", body);
  }

  /**
   * Get game engine logos.
   * @see https://api-docs.igdb.com/#game_engine_logos
   */
  async getEngineLogos(body: IGDBQuery): Promise<GameEngineLogo[]> {
    return this.client.query("game_engine_logos", body);
  }

  /**
   * Get game localizations.
   * @see https://api-docs.igdb.com/#game_localizations
   */
  async getLocalizations(body: IGDBQuery): Promise<GameLocalization[]> {
    return this.client.query("game_localizations", body);
  }

  /**
   * Get game modes.
   * @see https://api-docs.igdb.com/#game_modes
   */
  async getModes(body: IGDBQuery): Promise<GameMode[]> {
    return this.client.query("game_modes", body);
  }

  /**
   * Get game release formats.
   * @see https://api-docs.igdb.com/#game_release_formats
   */
  async getReleaseFormats(body: IGDBQuery): Promise<GameReleaseFormat[]> {
    return this.client.query("game_release_formats", body);
  }

  /**
   * Get game statuses.
   * @see https://api-docs.igdb.com/#game_statuses
   */
  async getStatuses(body: IGDBQuery): Promise<GameStatus[]> {
    return this.client.query("game_statuses", body);
  }

  /**
   * Get game time to beat info.
   * @see https://api-docs.igdb.com/#game_time_to_beats
   */
  async getTimeToBeats(body: IGDBQuery): Promise<GameTimeToBeat[]> {
    return this.client.query("game_time_to_beats", body);
  }

  /**
   * Get game types.
   * @see https://api-docs.igdb.com/#game_types
   */
  async getTypes(body: IGDBQuery): Promise<GameType[]> {
    return this.client.query("game_types", body);
  }

  /**
   * Get game videos.
   * @see https://api-docs.igdb.com/#game_videos
   */
  async getVideos(body: IGDBQuery): Promise<GameVideo[]> {
    return this.client.query("game_videos", body);
  }
}
