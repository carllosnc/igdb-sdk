import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { Report, ReportType } from "../../types/index.js";

export class ReportClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get reports.
   * @see https://api-docs.igdb.com/#reports
   */
  async getReports(body: IGDBQuery): Promise<Report[]> {
    return this.client.query("reports", body);
  }

  /**
   * Get report types.
   * @see https://api-docs.igdb.com/#report_types
   */
  async getTypes(body: IGDBQuery): Promise<ReportType[]> {
    return this.client.query("report_types", body);
  }
}
