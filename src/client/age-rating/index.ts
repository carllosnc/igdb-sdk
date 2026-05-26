import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class AgeRatingClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("age_ratings", body); }
  categories(body: IGDBQuery) { return this.client.query("age_rating_categories", body); }
  contentDescriptions(body: IGDBQuery) { return this.client.query("age_rating_content_descriptions", body); }
  contentDescriptionTypes(body: IGDBQuery) { return this.client.query("age_rating_content_description_types", body); }
  contentDescriptionsV2(body: IGDBQuery) { return this.client.query("age_rating_content_descriptions_v2", body); }
  organizations(body: IGDBQuery) { return this.client.query("age_rating_organizations", body); }
}
