import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type { Artwork, ArtworkType, Cover, Screenshot } from "../../types/index.js";

export class ArtworkClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get artworks.
   * @see https://api-docs.igdb.com/#artworks
   */
  async getArtworks(body: IGDBQuery): Promise<Artwork[]> {
    return this.client.query("artworks", body);
  }

  /**
   * Get artwork types.
   * @see https://api-docs.igdb.com/#artwork_types
   */
  async getTypes(body: IGDBQuery): Promise<ArtworkType[]> {
    return this.client.query("artwork_types", body);
  }

  /**
   * Get covers.
   * @see https://api-docs.igdb.com/#covers
   */
  async getCovers(body: IGDBQuery): Promise<Cover[]> {
    return this.client.query("covers", body);
  }

  /**
   * Get screenshots.
   * @see https://api-docs.igdb.com/#screenshots
   */
  async getScreenshots(body: IGDBQuery): Promise<Screenshot[]> {
    return this.client.query("screenshots", body);
  }
}
