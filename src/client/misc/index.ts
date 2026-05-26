import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class MiscClient {
  constructor(private client: IGDBClient) {}

  alternativeNames(body: IGDBQuery) { return this.client.query("alternative_names", body); }
  dateFormats(body: IGDBQuery) { return this.client.query("date_formats", body); }
  entityTypes(body: IGDBQuery) { return this.client.query("entity_types", body); }
  franchises(body: IGDBQuery) { return this.client.query("franchises", body); }
  genres(body: IGDBQuery) { return this.client.query("genres", body); }
  involvedCompanies(body: IGDBQuery) { return this.client.query("involved_companies", body); }
  keywords(body: IGDBQuery) { return this.client.query("keywords", body); }
  languages(body: IGDBQuery) { return this.client.query("languages", body); }
  languageSupports(body: IGDBQuery) { return this.client.query("language_supports", body); }
  languageSupportTypes(body: IGDBQuery) { return this.client.query("language_support_types", body); }
  multiplayerModes(body: IGDBQuery) { return this.client.query("multiplayer_modes", body); }
  networkTypes(body: IGDBQuery) { return this.client.query("network_types", body); }
  playerPerspectives(body: IGDBQuery) { return this.client.query("player_perspectives", body); }
  regions(body: IGDBQuery) { return this.client.query("regions", body); }
  themes(body: IGDBQuery) { return this.client.query("themes", body); }
}
