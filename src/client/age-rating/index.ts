import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  AgeRating, AgeRatingCategory, AgeRatingContentDescription,
  AgeRatingContentDescriptionType, AgeRatingContentDescriptionV2,
  AgeRatingOrganization,
} from "../../types/index.js";

export class AgeRatingClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get age ratings.
   * @see https://api-docs.igdb.com/#age_ratings
   */
  async getAgeRatings(body: IGDBQuery): Promise<AgeRating[]> {
    return this.client.query("age_ratings", body);
  }

  /**
   * Get age rating categories.
   * @see https://api-docs.igdb.com/#age_rating_categories
   */
  async getCategories(body: IGDBQuery): Promise<AgeRatingCategory[]> {
    return this.client.query("age_rating_categories", body);
  }

  /**
   * Get age rating content descriptions.
   * @see https://api-docs.igdb.com/#age_rating_content_descriptions
   */
  async getContentDescriptions(body: IGDBQuery): Promise<AgeRatingContentDescription[]> {
    return this.client.query("age_rating_content_descriptions", body);
  }

  /**
   * Get age rating content description types.
   * @see https://api-docs.igdb.com/#age_rating_content_description_types
   */
  async getContentDescriptionTypes(body: IGDBQuery): Promise<AgeRatingContentDescriptionType[]> {
    return this.client.query("age_rating_content_description_types", body);
  }

  /**
   * Get age rating content descriptions v2.
   * @see https://api-docs.igdb.com/#age_rating_content_descriptions_v2
   */
  async getContentDescriptionsV2(body: IGDBQuery): Promise<AgeRatingContentDescriptionV2[]> {
    return this.client.query("age_rating_content_descriptions_v2", body);
  }

  /**
   * Get age rating organizations.
   * @see https://api-docs.igdb.com/#age_rating_organizations
   */
  async getOrganizations(body: IGDBQuery): Promise<AgeRatingOrganization[]> {
    return this.client.query("age_rating_organizations", body);
  }
}
