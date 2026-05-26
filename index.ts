import { IGDBClient } from "./src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const games = await client.game.query("fields name,rating,cover.url; limit 5;");
console.log(JSON.stringify(games, null, 2));
