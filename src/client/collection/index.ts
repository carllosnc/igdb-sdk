import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";
import type {
  Collection, CollectionMembership, CollectionMembershipType,
  CollectionRelation, CollectionRelationType, CollectionType,
} from "../../types/index.js";

export class CollectionClient {
  constructor(private client: IGDBClient) {}

  /**
   * Get collections.
   * @see https://api-docs.igdb.com/#collections
   */
  async getCollections(body: IGDBQuery): Promise<Collection[]> {
    return this.client.query("collections", body);
  }

  /**
   * Get collection memberships.
   * @see https://api-docs.igdb.com/#collection_memberships
   */
  async getMemberships(body: IGDBQuery): Promise<CollectionMembership[]> {
    return this.client.query("collection_memberships", body);
  }

  /**
   * Get collection membership types.
   * @see https://api-docs.igdb.com/#collection_membership_types
   */
  async getMembershipTypes(body: IGDBQuery): Promise<CollectionMembershipType[]> {
    return this.client.query("collection_membership_types", body);
  }

  /**
   * Get collection relations.
   * @see https://api-docs.igdb.com/#collection_relations
   */
  async getRelations(body: IGDBQuery): Promise<CollectionRelation[]> {
    return this.client.query("collection_relations", body);
  }

  /**
   * Get collection relation types.
   * @see https://api-docs.igdb.com/#collection_relation_types
   */
  async getRelationTypes(body: IGDBQuery): Promise<CollectionRelationType[]> {
    return this.client.query("collection_relation_types", body);
  }

  /**
   * Get collection types.
   * @see https://api-docs.igdb.com/#collection_types
   */
  async getTypes(body: IGDBQuery): Promise<CollectionType[]> {
    return this.client.query("collection_types", body);
  }

  async getCount(body: IGDBQuery): Promise<number> {
    return this.client.queryCount("collections", body);
  }

  async getById(id: number, fields: string = "name"): Promise<Collection | null> {
    const results = await this.client.query("collections", `fields ${fields}; where id = ${id};`);
    return results[0] ?? null;
  }
}
