import { IGDBClient, gameQuery } from "../src/index.js";
import { IgdbApiError, IgdbAuthError, IgdbRateLimitError } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
  retry: {
    maxRetries: 5,
    baseDelayMs: 200,
    maxDelayMs: 5000,
  },
});

async function safeQuery() {
  try {
    return await client.game.getGames(
      gameQuery()
        .fields("name", "rating", "summary")
        .where("rating", ">", 75)
        .sort("rating", "desc")
        .limit(5)
        .build(),
    );
  } catch (error) {
    if (error instanceof IgdbRateLimitError) {
      const wait = error.retryAfter ?? 60;
      console.warn(`Rate limited — retry after ${wait}s`);
      throw error;
    }

    if (error instanceof IgdbAuthError) {
      console.error("Auth failed — check your credentials");
      throw error;
    }

    if (error instanceof IgdbApiError) {
      console.error(`API error ${error.statusCode} on ${error.endpoint}`);
      console.error(`Request body: ${error.body}`);
      throw error;
    }

    console.error("Unexpected error:", error);
    throw error;
  }
}

try {
  const results = await safeQuery();
  console.log(`Fetched ${results.length} games`);
  for (const g of results) {
    console.log(`  ${g.name} — ${g.rating}`);
  }
} catch {
  console.log("Could not complete query — see errors above");
}
