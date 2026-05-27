import type { IGDBBase, IGDBImage, IGDBDateTime, IGDBTimestamp } from "./base.js";
import type {
  AgeRating, AgeRatingCategory, AgeRatingContentDescription,
  AgeRatingContentDescriptionType, AgeRatingContentDescriptionV2,
  AgeRatingOrganization,
} from "./age-rating.js";
import type { AlternativeName } from "./misc.js";
import type { Artwork, ArtworkType, Cover, Screenshot } from "./artwork.js";
import type {
  Character, CharacterGender, CharacterMugShot, CharacterSpecies,
} from "./character.js";
import type {
  Collection, CollectionMembership, CollectionMembershipType,
  CollectionRelation, CollectionRelationType, CollectionType,
} from "./collection.js";
import type {
  Company, CompanyLogo, CompanySize, CompanyStatus, CompanyType,
  CompanyTypeHistory, CompanyWebsite,
} from "./company.js";
import type { DateFormat } from "./misc.js";
import type { EntityType } from "./misc.js";
import type { Event, EventLogo, EventNetwork } from "./event.js";
import type { ExternalGame, ExternalGameSource } from "./external-game.js";
import type { Franchise } from "./misc.js";
import type {
  Game, GameEngine, GameEngineLogo, GameLocalization, GameMode,
  GameReleaseFormat, GameStatus, GameTimeToBeat, GameType, GameVideo,
} from "./game.js";
import type { Genre } from "./misc.js";
import type { InvolvedCompany } from "./misc.js";
import type { Keyword } from "./misc.js";
import type { Language, LanguageSupport, LanguageSupportType } from "./misc.js";
import type { MultiplayerMode } from "./misc.js";
import type { NetworkType } from "./misc.js";
import type {
  Platform, PlatformFamily, PlatformLogo, PlatformType, PlatformVersion,
  PlatformVersionCompany, PlatformVersionReleaseDate, PlatformWebsite,
} from "./platform.js";
import type { PlayerPerspective } from "./misc.js";
import type { PopularityPrimitive, PopularityType } from "./popularity.js";
import type { Region } from "./misc.js";
import type {
  ReleaseDate, ReleaseDateRegion, ReleaseDateStatus,
} from "./release-date.js";
import type { Report, ReportType } from "./report.js";
import type { SearchResult } from "./search.js";
import type { Theme } from "./misc.js";
import type { Website, WebsiteType } from "./website.js";

export type {
  IGDBBase, IGDBImage, IGDBDateTime, IGDBTimestamp,
  AgeRating, AgeRatingCategory, AgeRatingContentDescription,
  AgeRatingContentDescriptionType, AgeRatingContentDescriptionV2,
  AgeRatingOrganization,
  AlternativeName,
  Artwork, ArtworkType, Cover, Screenshot,
  Character, CharacterGender, CharacterMugShot, CharacterSpecies,
  Collection, CollectionMembership, CollectionMembershipType,
  CollectionRelation, CollectionRelationType, CollectionType,
  Company, CompanyLogo, CompanySize, CompanyStatus, CompanyType,
  CompanyTypeHistory, CompanyWebsite,
  DateFormat, EntityType,
  Event, EventLogo, EventNetwork,
  ExternalGame, ExternalGameSource,
  Franchise,
  Game, GameEngine, GameEngineLogo, GameLocalization, GameMode,
  GameReleaseFormat, GameStatus, GameTimeToBeat, GameType, GameVideo,
  Genre, InvolvedCompany, Keyword,
  Language, LanguageSupport, LanguageSupportType,
  MultiplayerMode, NetworkType,
  Platform, PlatformFamily, PlatformLogo, PlatformType, PlatformVersion,
  PlatformVersionCompany, PlatformVersionReleaseDate, PlatformWebsite,
  PlayerPerspective,
  PopularityPrimitive, PopularityType,
  Region,
  ReleaseDate, ReleaseDateRegion, ReleaseDateStatus,
  Report, ReportType,
  SearchResult,
  Theme,
  Website, WebsiteType,
};

export interface EndpointResponseMap {
  age_ratings: AgeRating[];
  age_rating_categories: AgeRatingCategory[];
  age_rating_content_descriptions: AgeRatingContentDescription[];
  age_rating_content_description_types: AgeRatingContentDescriptionType[];
  age_rating_content_descriptions_v2: AgeRatingContentDescriptionV2[];
  age_rating_organizations: AgeRatingOrganization[];
  alternative_names: AlternativeName[];
  artwork_types: ArtworkType[];
  artworks: Artwork[];
  character_genders: CharacterGender[];
  character_mug_shots: CharacterMugShot[];
  character_species: CharacterSpecies[];
  characters: Character[];
  collection_membership_types: CollectionMembershipType[];
  collection_memberships: CollectionMembership[];
  collection_relation_types: CollectionRelationType[];
  collection_relations: CollectionRelation[];
  collection_types: CollectionType[];
  collections: Collection[];
  companies: Company[];
  company_logos: CompanyLogo[];
  company_sizes: CompanySize[];
  company_statuses: CompanyStatus[];
  company_type_histories: CompanyTypeHistory[];
  company_types: CompanyType[];
  company_websites: CompanyWebsite[];
  covers: Cover[];
  date_formats: DateFormat[];
  entity_types: EntityType[];
  event_logos: EventLogo[];
  event_networks: EventNetwork[];
  events: Event[];
  external_game_sources: ExternalGameSource[];
  external_games: ExternalGame[];
  franchises: Franchise[];
  game_engine_logos: GameEngineLogo[];
  game_engines: GameEngine[];
  game_localizations: GameLocalization[];
  game_modes: GameMode[];
  game_release_formats: GameReleaseFormat[];
  game_statuses: GameStatus[];
  game_time_to_beats: GameTimeToBeat[];
  game_types: GameType[];
  game_videos: GameVideo[];
  games: Game[];
  genres: Genre[];
  involved_companies: InvolvedCompany[];
  keywords: Keyword[];
  language_support_types: LanguageSupportType[];
  language_supports: LanguageSupport[];
  languages: Language[];
  multiplayer_modes: MultiplayerMode[];
  network_types: NetworkType[];
  platform_families: PlatformFamily[];
  platform_logos: PlatformLogo[];
  platform_types: PlatformType[];
  platform_version_companies: PlatformVersionCompany[];
  platform_version_release_dates: PlatformVersionReleaseDate[];
  platform_versions: PlatformVersion[];
  platform_websites: PlatformWebsite[];
  platforms: Platform[];
  player_perspectives: PlayerPerspective[];
  popularity_primitives: PopularityPrimitive[];
  popularity_types: PopularityType[];
  regions: Region[];
  release_date_regions: ReleaseDateRegion[];
  release_date_statuses: ReleaseDateStatus[];
  release_dates: ReleaseDate[];
  report_types: ReportType[];
  reports: Report[];
  screenshots: Screenshot[];
  search: SearchResult[];
  themes: Theme[];
  website_types: WebsiteType[];
  websites: Website[];
}
