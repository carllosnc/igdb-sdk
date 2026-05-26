import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class CharacterClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("characters", body); }
  genders(body: IGDBQuery) { return this.client.query("character_genders", body); }
  mugShots(body: IGDBQuery) { return this.client.query("character_mug_shots", body); }
  species(body: IGDBQuery) { return this.client.query("character_species", body); }
}
