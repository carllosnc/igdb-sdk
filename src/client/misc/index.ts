import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  AlternativeName, DateFormat, EntityType, Franchise, Genre,
  InvolvedCompany, Keyword, Language, LanguageSupport,
  LanguageSupportType, MultiplayerMode, NetworkType,
  PlayerPerspective, Region, Theme,
} from "../../types/index.js";

export class MiscClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get alternative names.
   * @see https://api-docs.igdb.com/#alternative_names
   */
  async getAlternativeNames(body: IGDBQuery): Promise<AlternativeName[]> {
    return this.client.query("alternative_names", body);
  }

  /**
   * Get date formats.
   * @see https://api-docs.igdb.com/#date_formats
   */
  async getDateFormats(body: IGDBQuery): Promise<DateFormat[]> {
    return this.client.query("date_formats", body);
  }

  /**
   * Get entity types.
   * @see https://api-docs.igdb.com/#entity_types
   */
  async getEntityTypes(body: IGDBQuery): Promise<EntityType[]> {
    return this.client.query("entity_types", body);
  }

  /**
   * Get franchises.
   * @see https://api-docs.igdb.com/#franchises
   */
  async getFranchises(body: IGDBQuery): Promise<Franchise[]> {
    return this.client.query("franchises", body);
  }

  /**
   * Get genres.
   * @see https://api-docs.igdb.com/#genres
   */
  async getGenres(body: IGDBQuery): Promise<Genre[]> {
    return this.client.query("genres", body);
  }

  /**
   * Get involved companies.
   * @see https://api-docs.igdb.com/#involved_companies
   */
  async getInvolvedCompanies(body: IGDBQuery): Promise<InvolvedCompany[]> {
    return this.client.query("involved_companies", body);
  }

  /**
   * Get keywords.
   * @see https://api-docs.igdb.com/#keywords
   */
  async getKeywords(body: IGDBQuery): Promise<Keyword[]> {
    return this.client.query("keywords", body);
  }

  /**
   * Get languages.
   * @see https://api-docs.igdb.com/#languages
   */
  async getLanguages(body: IGDBQuery): Promise<Language[]> {
    return this.client.query("languages", body);
  }

  /**
   * Get language supports.
   * @see https://api-docs.igdb.com/#language_supports
   */
  async getLanguageSupports(body: IGDBQuery): Promise<LanguageSupport[]> {
    return this.client.query("language_supports", body);
  }

  /**
   * Get language support types.
   * @see https://api-docs.igdb.com/#language_support_types
   */
  async getLanguageSupportTypes(body: IGDBQuery): Promise<LanguageSupportType[]> {
    return this.client.query("language_support_types", body);
  }

  /**
   * Get multiplayer modes.
   * @see https://api-docs.igdb.com/#multiplayer_modes
   */
  async getMultiplayerModes(body: IGDBQuery): Promise<MultiplayerMode[]> {
    return this.client.query("multiplayer_modes", body);
  }

  /**
   * Get network types.
   * @see https://api-docs.igdb.com/#network_types
   */
  async getNetworkTypes(body: IGDBQuery): Promise<NetworkType[]> {
    return this.client.query("network_types", body);
  }

  /**
   * Get player perspectives.
   * @see https://api-docs.igdb.com/#player_perspectives
   */
  async getPlayerPerspectives(body: IGDBQuery): Promise<PlayerPerspective[]> {
    return this.client.query("player_perspectives", body);
  }

  /**
   * Get regions.
   * @see https://api-docs.igdb.com/#regions
   */
  async getRegions(body: IGDBQuery): Promise<Region[]> {
    return this.client.query("regions", body);
  }

  /**
   * Get themes.
   * @see https://api-docs.igdb.com/#themes
   */
  async getThemes(body: IGDBQuery): Promise<Theme[]> {
    return this.client.query("themes", body);
  }
}
