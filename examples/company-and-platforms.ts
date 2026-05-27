import { IGDBClient, companyQuery, platformQuery } from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const [company] = await client.company.getCompanies(
  companyQuery()
    .fields("name", "description", "logo", "url", "websites")
    .search("Nintendo")
    .limit(1)
    .build(),
);

if (company) {
  console.log("=== Company ===");
  console.log(`Name: ${company.name}`);
  if (company.description) console.log(`Description: ${company.description}`);
  if (company.url) console.log(`URL: ${company.url}`);
  if (company.logo) console.log(`Logo ID: ${company.logo}`);

  if (company.logo) {
    const [logo] = await client.company.getLogos(
      companyQuery()
        .fields("url")
        .where("id", "=", company.logo)
        .limit(1)
        .build(),
    );
    if (logo) console.log(`Logo URL: ${logo.url}`);
  }

  const published = await client.game.getGames(
    `fields name; where published_by = ${company.id}; limit 10;`,
  );
  if (published.length) {
    console.log(`Published games: ${published.map((g) => g.name).join(", ")}`);
  }
}

const platforms = await client.platform.getPlatforms(
  platformQuery()
    .fields("name", "abbreviation", "generation", "summary")
    .sort("generation", "asc")
    .build(),
);

console.log("\n=== Platforms ===");
for (const p of platforms) {
  console.log(`${p.name} (${p.abbreviation ?? "N/A"}) - Gen ${p.generation ?? "?"}`);
}
