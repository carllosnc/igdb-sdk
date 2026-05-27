import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  Company, CompanyLogo, CompanySize, CompanyStatus, CompanyType,
  CompanyTypeHistory, CompanyWebsite,
} from "../../types/index.js";

export class CompanyClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get companies.
   * @see https://api-docs.igdb.com/#companies
   */
  async getCompanies(body: IGDBQuery): Promise<Company[]> {
    return this.client.query("companies", body);
  }

  /**
   * Get company logos.
   * @see https://api-docs.igdb.com/#company_logos
   */
  async getLogos(body: IGDBQuery): Promise<CompanyLogo[]> {
    return this.client.query("company_logos", body);
  }

  /**
   * Get company sizes.
   * @see https://api-docs.igdb.com/#company_sizes
   */
  async getSizes(body: IGDBQuery): Promise<CompanySize[]> {
    return this.client.query("company_sizes", body);
  }

  /**
   * Get company statuses.
   * @see https://api-docs.igdb.com/#company_statuses
   */
  async getStatuses(body: IGDBQuery): Promise<CompanyStatus[]> {
    return this.client.query("company_statuses", body);
  }

  /**
   * Get company type histories.
   * @see https://api-docs.igdb.com/#company_type_histories
   */
  async getTypeHistories(body: IGDBQuery): Promise<CompanyTypeHistory[]> {
    return this.client.query("company_type_histories", body);
  }

  /**
   * Get company types.
   * @see https://api-docs.igdb.com/#company_types
   */
  async getTypes(body: IGDBQuery): Promise<CompanyType[]> {
    return this.client.query("company_types", body);
  }

  /**
   * Get company websites.
   * @see https://api-docs.igdb.com/#company_websites
   */
  async getWebsites(body: IGDBQuery): Promise<CompanyWebsite[]> {
    return this.client.query("company_websites", body);
  }
}
