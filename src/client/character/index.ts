import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  Character, CharacterGender, CharacterMugShot, CharacterSpecies,
} from "../../types/index.js";

export class CharacterClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get characters.
   * @see https://api-docs.igdb.com/#characters
   */
  async getCharacters(body: IGDBQuery): Promise<Character[]> {
    return this.client.query("characters", body);
  }

  /**
   * Get character genders.
   * @see https://api-docs.igdb.com/#character_genders
   */
  async getGenders(body: IGDBQuery): Promise<CharacterGender[]> {
    return this.client.query("character_genders", body);
  }

  /**
   * Get character mug shots.
   * @see https://api-docs.igdb.com/#character_mug_shots
   */
  async getMugShots(body: IGDBQuery): Promise<CharacterMugShot[]> {
    return this.client.query("character_mug_shots", body);
  }

  /**
   * Get character species.
   * @see https://api-docs.igdb.com/#character_species
   */
  async getSpecies(body: IGDBQuery): Promise<CharacterSpecies[]> {
    return this.client.query("character_species", body);
  }

  async getCount(body: IGDBQuery): Promise<number> {
    return this.client.queryCount("characters", body);
  }

  async getById(id: number, fields: string = "name"): Promise<Character | null> {
    const results = await this.client.query("characters", `fields ${fields}; where id = ${id};`);
    return results[0] ?? null;
  }
}
