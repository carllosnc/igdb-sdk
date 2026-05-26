import type { IGDBBase } from "./base";

export interface Collection extends IGDBBase {
  as_child_relations?: number[];
  as_parent_relations?: number[];
  games?: number[];
  name?: string;
  slug?: string;
  type?: number;
  url?: string;
}

export interface CollectionMembership extends IGDBBase {
  collection?: number;
  game?: number;
  type?: number;
}

export interface CollectionMembershipType extends IGDBBase {
  allowed_collection_type?: number;
  description?: string;
  name?: string;
}

export interface CollectionRelation extends IGDBBase {
  child_collection?: number;
  parent_collection?: number;
  type?: number;
}

export interface CollectionRelationType extends IGDBBase {
  allowed_child_type?: number;
  allowed_parent_type?: number;
  description?: string;
  name?: string;
}

export interface CollectionType extends IGDBBase {
  description?: string;
  name?: string;
}
