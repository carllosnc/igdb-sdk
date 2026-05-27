import { IGDBClient, gameQuery, platformQuery, genreQuery } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const topGames = await client.game.getGames(
  gameQuery()
    .fields("name", "rating", "first_release_date")
    .where("rating", ">", 90)
    .sort("rating", "desc")
    .limit(5)
    .build(),
);
console.log("Top-rated games:", JSON.stringify(topGames, null, 2));

const platforms = await client.platform.getPlatforms(
  platformQuery()
    .fields("abbreviation", "abbreviation", "id", "alternative_name", "url")
    .sort("generation", "desc")
    .limit(5)
    .build(),
);
console.log("Platforms:", JSON.stringify(platforms, null, 2));

const genres = await client.misc.getGenres(
  genreQuery()
    .fields("name")
    .sort("name")
    .limit(10)
    .build(),
);
console.log("Genres:", JSON.stringify(genres, null, 2));
