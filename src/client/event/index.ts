import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class EventClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("events", body); }
  logos(body: IGDBQuery) { return this.client.query("event_logos", body); }
  networks(body: IGDBQuery) { return this.client.query("event_networks", body); }
}
