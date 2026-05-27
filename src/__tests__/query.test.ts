import { describe, expect, test } from "bun:test";
import {
  QueryBuilder, query, queryFor,
  gameQuery, platformQuery, companyQuery, ageRatingQuery,
  artworkQuery, characterQuery, collectionQuery, eventQuery,
  externalGameQuery, releaseDateQuery, reportQuery, searchQuery,
  websiteQuery, coverQuery, screenshotQuery, genreQuery, themeQuery,
  gameModeQuery, involvedCompanyQuery, franchiseQuery, keywordQuery,
  playerPerspectiveQuery, multiplayerModeQuery, regionQuery,
} from "../query.js";

describe("QueryBuilder", () => {
  describe("fields", () => {
    test("single field", () => {
      expect(query().fields("name").build()).toBe("fields name;");
    });

    test("multiple fields", () => {
      expect(query().fields("name", "rating", "cover").build()).toBe("fields name,rating,cover;");
    });

    test("chained calls merge", () => {
      expect(query().fields("name").fields("rating").build()).toBe("fields name,rating;");
    });
  });

  describe("expand", () => {
    test("dot notation paths", () => {
      expect(query().expand("cover.url", "screenshots.url").build()).toBe("fields cover.url,screenshots.url;");
    });

    test("expand merges with fields", () => {
      expect(query().fields("name").expand("cover.url").build()).toBe("fields name,cover.url;");
    });
  });

  describe("where", () => {
    test("operator with number", () => {
      expect(query().where("rating", ">", 80).build()).toBe("where rating > 80;");
    });

    test("operator with string value quoted", () => {
      expect(query().where("name", "=", "Mario").build()).toBe('where name = "Mario";');
    });

    test("operator with boolean", () => {
      expect(query().where("active", "=", true).build()).toBe("where active = true;");
    });

    test("operator with array value", () => {
      expect(query().where("platforms", "=", [48, 130]).build()).toBe("where platforms = [48,130];");
    });

    test("operator with string array", () => {
      expect(query().where("categories", "=", ["rpg", "action"]).build()).toBe('where categories = ["rpg","action"];');
    });

    test("raw string where", () => {
      expect(query().where("rating > 80 & platforms = 48").build()).toBe("where rating > 80 & platforms = 48;");
    });

    test("multiple where calls combined with &", () => {
      expect(query().where("rating", ">", 80).where("platforms", "=", 48).build())
        .toBe("where rating > 80 & platforms = 48;");
    });
  });

  describe("whereIn", () => {
    test("number values", () => {
      expect(query().whereIn("id", [1020, 1025]).build()).toBe("where id = (1020,1025);");
    });

    test("string values quoted", () => {
      expect(query().whereIn("name", ["Alice", "Bob"]).build()).toBe('where name = ("Alice","Bob");');
    });

    test("mixed with where", () => {
      expect(query().where("rating", ">", 80).whereIn("id", [1, 2]).build())
        .toBe("where rating > 80 & id = (1,2);");
    });
  });

  describe("sort", () => {
    test("defaults to asc", () => {
      expect(query().sort("name").build()).toBe("sort name asc;");
    });

    test("explicit desc", () => {
      expect(query().sort("rating", "desc").build()).toBe("sort rating desc;");
    });

    test("last call wins", () => {
      expect(query().sort("name", "asc").sort("rating", "desc").build()).toBe("sort rating desc;");
    });
  });

  describe("search", () => {
    test("adds search clause", () => {
      expect(query().search("Mario").build()).toBe('search "Mario";');
    });

    test("last call wins", () => {
      expect(query().search("Mario").search("Zelda").build()).toBe('search "Zelda";');
    });
  });

  describe("limit and offset", () => {
    test("limit alone", () => {
      expect(query().limit(5).build()).toBe("limit 5;");
    });

    test("offset alone", () => {
      expect(query().offset(10).build()).toBe("offset 10;");
    });

    test("limit with offset", () => {
      expect(query().limit(5).offset(10).build()).toBe("limit 5; offset 10;");
    });
  });

  describe("build", () => {
    test("empty builder produces empty string", () => {
      expect(query().build()).toBe("");
    });

    test("full query with everything", () => {
      const result = query()
        .fields("name", "rating", "cover")
        .expand("screenshots.url")
        .where("rating", ">", 80)
        .whereIn("platforms", [48, 130])
        .sort("rating", "desc")
        .search("Mario")
        .limit(5)
        .offset(10)
        .build();

      expect(result).toBe(
        'fields name,rating,cover,screenshots.url; where rating > 80 & platforms = (48,130); sort rating desc; search "Mario"; limit 5; offset 10;',
      );
    });
  });

  describe("chaining", () => {
    test("all methods return this for chaining", () => {
      const qb = new QueryBuilder();
      expect(qb.fields("name")).toBe(qb);
      expect(qb.expand("x.y")).toBe(qb);
      expect(qb.where("a", "=", 1)).toBe(qb);
      expect(qb.whereIn("a", [1])).toBe(qb);
      expect(qb.sort("a")).toBe(qb);
      expect(qb.limit(1)).toBe(qb);
      expect(qb.offset(1)).toBe(qb);
      expect(qb.search("x")).toBe(qb);
    });
  });
});

describe("factory functions", () => {
  test("query returns QueryBuilder", () => {
    expect(query()).toBeInstanceOf(QueryBuilder);
  });

  test("queryFor returns QueryBuilder", () => {
    expect(queryFor()).toBeInstanceOf(QueryBuilder);
  });

  test("all typed query functions return QueryBuilder", () => {
    const factories = [
      gameQuery, platformQuery, companyQuery, ageRatingQuery,
      artworkQuery, characterQuery, collectionQuery, eventQuery,
      externalGameQuery, releaseDateQuery, reportQuery, searchQuery,
      websiteQuery, coverQuery, screenshotQuery, genreQuery, themeQuery,
      gameModeQuery, involvedCompanyQuery, franchiseQuery, keywordQuery,
      playerPerspectiveQuery, multiplayerModeQuery, regionQuery,
    ];

    for (const factory of factories) {
      expect(factory()).toBeInstanceOf(QueryBuilder);
    }
  });

  test("typed factories produce usable builders", () => {
    const result = gameQuery().fields("name", "rating").where("rating", ">", 80).build();
    expect(result).toBe("fields name,rating; where rating > 80;");
  });
});
