import { IGDBClient, gameQuery } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

// Count games with rating above threshold
const highRatedCount = await client.game.getCount("where rating > 85;");
console.log(`Games with rating > 85: ${highRatedCount}`);

// Count RPGs (genre id = 12)
const rpgCount = await client.game.getCount("where genres = 12;");
console.log(`RPG games: ${rpgCount}`);

// Fetch a game by ID with specific fields
const game = await client.game.getById(1020, "name,rating,summary,first_release_date");
if (game) {
  console.log(`\nGame #1020: ${game.name}`);
  console.log(`  Rating:      ${game.rating ?? "N/A"}`);
  console.log(`  Summary:     ${(game as any).summary ?? "N/A"}`);
} else {
  console.log("Game not found");
}

// Fetch a platform by ID
const platform = await client.platform.getById(6, "name,abbreviation");
if (platform) {
  console.log(`\nPlatform #6: ${platform.name} (${(platform as any).abbreviation ?? ""})`);
}

// Fetch a company by ID
const company = await client.company.getById(70, "name,url");
if (company) {
  console.log(`\nCompany #70: ${company.name} — ${(company as any).url ?? ""}`);
}
