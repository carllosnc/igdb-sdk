import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  Platform, PlatformFamily, PlatformLogo, PlatformType, PlatformVersion,
  PlatformVersionCompany, PlatformVersionReleaseDate, PlatformWebsite,
} from "../../types/index.js";

export class PlatformClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get platforms.
   * @see https://api-docs.igdb.com/#platforms
   */
  async getPlatforms(body: IGDBQuery): Promise<Platform[]> {
    return this.client.query("platforms", body);
  }

  /**
   * Get platform families.
   * @see https://api-docs.igdb.com/#platform_families
   */
  async getFamilies(body: IGDBQuery): Promise<PlatformFamily[]> {
    return this.client.query("platform_families", body);
  }

  /**
   * Get platform logos.
   * @see https://api-docs.igdb.com/#platform_logos
   */
  async getLogos(body: IGDBQuery): Promise<PlatformLogo[]> {
    return this.client.query("platform_logos", body);
  }

  /**
   * Get platform types.
   * @see https://api-docs.igdb.com/#platform_types
   */
  async getTypes(body: IGDBQuery): Promise<PlatformType[]> {
    return this.client.query("platform_types", body);
  }

  /**
   * Get platform versions.
   * @see https://api-docs.igdb.com/#platform_versions
   */
  async getVersions(body: IGDBQuery): Promise<PlatformVersion[]> {
    return this.client.query("platform_versions", body);
  }

  /**
   * Get platform version companies.
   * @see https://api-docs.igdb.com/#platform_version_companies
   */
  async getVersionCompanies(body: IGDBQuery): Promise<PlatformVersionCompany[]> {
    return this.client.query("platform_version_companies", body);
  }

  /**
   * Get platform version release dates.
   * @see https://api-docs.igdb.com/#platform_version_release_dates
   */
  async getVersionReleaseDates(body: IGDBQuery): Promise<PlatformVersionReleaseDate[]> {
    return this.client.query("platform_version_release_dates", body);
  }

  /**
   * Get platform websites.
   * @see https://api-docs.igdb.com/#platform_websites
   */
  async getWebsites(body: IGDBQuery): Promise<PlatformWebsite[]> {
    return this.client.query("platform_websites", body);
  }

  async getCount(body: IGDBQuery): Promise<number> {
    return this.client.queryCount("platforms", body);
  }

  async getById(id: number, fields: string = "name"): Promise<Platform | null> {
    const results = await this.client.query("platforms", `fields ${fields}; where id = ${id};`);
    return results[0] ?? null;
  }
}
