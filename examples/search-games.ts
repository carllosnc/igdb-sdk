import { IGDBClient, gameQuery } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const marioGames = await client.game.getGames(
  gameQuery()
    .fields("name", "rating", "first_release_date")
    .search("Mario")
    .limit(10)
    .build(),
);
console.log("Mario games:", JSON.stringify(marioGames, null, 2));

const rpgGames = await client.game.getGames(
  gameQuery()
    .fields("name", "rating", "summary")
    .where("rating", ">", 70)
    .where("genres", "=", 12)
    .sort("rating", "desc")
    .limit(5)
    .build(),
);
console.log("Top RPGs:", JSON.stringify(rpgGames, null, 2));

const now = Math.floor(Date.now() / 1000);
const upcoming = await client.game.getGames(
  gameQuery()
    .fields("name", "first_release_date")
    .where("first_release_date", ">", now)
    .sort("first_release_date", "asc")
    .limit(5)
    .build(),
);
console.log("Upcoming games:", JSON.stringify(upcoming, null, 2));
