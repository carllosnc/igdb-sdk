import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { Event, EventLogo, EventNetwork } from "../../types/index.js";

export class EventClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get events.
   * @see https://api-docs.igdb.com/#events
   */
  async getEvents(body: IGDBQuery): Promise<Event[]> {
    return this.client.query("events", body);
  }

  /**
   * Get event logos.
   * @see https://api-docs.igdb.com/#event_logos
   */
  async getLogos(body: IGDBQuery): Promise<EventLogo[]> {
    return this.client.query("event_logos", body);
  }

  /**
   * Get event networks.
   * @see https://api-docs.igdb.com/#event_networks
   */
  async getNetworks(body: IGDBQuery): Promise<EventNetwork[]> {
    return this.client.query("event_networks", body);
  }
}
