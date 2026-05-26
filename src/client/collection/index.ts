import type { IGDBClient, IGDBQuery } from "../../IGDBClient.js";

export class CollectionClient {
  constructor(private client: IGDBClient) {}

  query(body: IGDBQuery) { return this.client.query("collections", body); }
  memberships(body: IGDBQuery) { return this.client.query("collection_memberships", body); }
  membershipTypes(body: IGDBQuery) { return this.client.query("collection_membership_types", body); }
  relations(body: IGDBQuery) { return this.client.query("collection_relations", body); }
  relationTypes(body: IGDBQuery) { return this.client.query("collection_relation_types", body); }
  types(body: IGDBQuery) { return this.client.query("collection_types", body); }
}
