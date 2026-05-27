import { IGDBClient, gameQuery } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
  middlewares: [
    {
      name: "request-logger",
      onRequest(ctx) {
        const body = typeof ctx.body === "string" ? ctx.body : JSON.stringify(ctx.body);
        console.log(`[Request]  → ${ctx.endpoint}`);
        console.log(`[Request]    body: ${body}`);
        return ctx;
      },
      onResponse(res, ctx) {
        console.log(`[Response] ← ${ctx.endpoint} ${res.status}`);
        return res;
      },
      onError(err, ctx) {
        console.error(`[Error]    ✗ ${ctx.endpoint}: ${err.message}`);
      },
    },
    {
      name: "auth-header-check",
      onRequest(ctx) {
        if (!ctx.headers.Authorization?.startsWith("Bearer ")) {
          console.warn("[Auth] Missing or invalid Authorization header");
        }
        return ctx;
      },
    },
  ],
});

const games = await client.game.getGames(
  gameQuery()
    .fields("name", "rating")
    .where("rating", ">", 85)
    .sort("rating", "desc")
    .limit(3)
    .build(),
);

console.log("\nHigh-rated games:", games.map((g) => `${g.name} (${g.rating})`).join(", "));
