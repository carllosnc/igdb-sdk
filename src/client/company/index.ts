import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class CompanyClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("companies", body); }
  logos(body: IGDBQuery) { return this.client.query("company_logos", body); }
  sizes(body: IGDBQuery) { return this.client.query("company_sizes", body); }
  statuses(body: IGDBQuery) { return this.client.query("company_statuses", body); }
  typeHistories(body: IGDBQuery) { return this.client.query("company_type_histories", body); }
  types(body: IGDBQuery) { return this.client.query("company_types", body); }
  websites(body: IGDBQuery) { return this.client.query("company_websites", body); }
}
