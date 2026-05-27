import { IGDBClient, gameQuery, coverQuery, involvedCompanyQuery, companyQuery } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const [game] = await client.game.getGames(
  gameQuery()
    .fields("name", "rating", "summary", "storyline", "genres", "platforms", "involved_companies", "cover", "videos", "age_ratings")
    .where("id", "=", 1020)
    .limit(1)
    .build(),
);

if (!game) {
  console.log("Game not found");
  process.exit(1);
}

console.log("=== Game Details ===");
console.log(`Name: ${game.name}`);
console.log(`Rating: ${game.rating ?? "N/A"}`);
if (game.summary) console.log(`Summary: ${game.summary}`);
if (game.storyline) console.log(`Storyline: ${game.storyline}`);
if (game.genres) console.log(`Genre IDs: [${game.genres.join(", ")}]`);
if (game.platforms) console.log(`Platform IDs: [${game.platforms.join(", ")}]`);
if (game.cover) console.log(`Cover ID: ${game.cover}`);

if (game.cover) {
  const [cover] = await client.artwork.getCovers(
    coverQuery()
      .fields("url", "width", "height")
      .where("id", "=", game.cover)
      .limit(1)
      .build(),
  );
  if (cover) {
    console.log(`Cover URL: ${cover.url ?? "N/A"}`);
    console.log(`Cover size: ${cover.width}x${cover.height}`);
  }
}

if (game.involved_companies?.length) {
  const icIds = game.involved_companies.join(",");
  const ics = await client.misc.getInvolvedCompanies(
    involvedCompanyQuery()
      .fields("company", "developer", "publisher")
      .where("id", "=", game.involved_companies)
      .build(),
  );

  const devIds = ics.filter((ic) => ic.developer && ic.company != null).map((ic) => ic.company!);
  const pubIds = ics.filter((ic) => ic.publisher && ic.company != null).map((ic) => ic.company!);

  if (devIds.length) {
    const devs = await client.company.getCompanies(
      companyQuery()
        .fields("name")
        .whereIn("id", devIds)
        .build(),
    );
    console.log(`Developers: ${devs.map((d) => d.name).join(", ")}`);
  }
  if (pubIds.length) {
    const pubs = await client.company.getCompanies(
      companyQuery()
        .fields("name")
        .whereIn("id", pubIds)
        .build(),
    );
    console.log(`Publishers: ${pubs.map((p) => p.name).join(", ")}`);
  }
}

console.log("\nFull response:", JSON.stringify(game, null, 2));
