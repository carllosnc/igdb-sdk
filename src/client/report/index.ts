import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class ReportClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("reports", body); }
  types(body: IGDBQuery) { return this.client.query("report_types", body); }
}
