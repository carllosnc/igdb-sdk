import {
  IGDBClient, themeQuery, playerPerspectiveQuery,
  gameModeQuery, platformQuery, gameQuery,
} from "../src/index.js";

const client = new IGDBClient({
  clientId: process.env.TWITCH_CLIENT_ID!,
  clientSecret: process.env.TWITCH_CLIENT_SECRET!,
});

const [themes, perspectives, modes, platforms] = await Promise.all([
  client.misc.getThemes(themeQuery().fields("name").sort("name").limit(50).build()),
  client.misc.getPlayerPerspectives(playerPerspectiveQuery().fields("name").sort("name").limit(50).build()),
  client.game.getModes(gameModeQuery().fields("name").sort("name").limit(50).build()),
  client.platform.getPlatforms(platformQuery().fields("name", "abbreviation").sort("name").build()),
]);

console.log("=== Themes ===");
for (const t of themes) console.log(`  ${t.id}: ${t.name}`);

console.log("\n=== Player Perspectives ===");
for (const p of perspectives) console.log(`  ${p.id}: ${p.name}`);

console.log("\n=== Game Modes ===");
for (const m of modes) console.log(`  ${m.id}: ${m.name}`);

console.log("\n=== Platforms ===");
for (const p of platforms) console.log(`  ${p.id}: ${p.name} (${p.abbreviation ?? ""})`);

const rpgThemeId = themes.find((t) => t.name === "Role-playing (RPG)")?.id;
const thirdPersonId = perspectives.find((p) =>
  p.name?.toLowerCase().includes("third person"),
)?.id;
const modernPlatformIds = platforms
  .filter((p) => ["PC", "PS5", "Xbox Series X|S", "Nintendo Switch"].includes(p.abbreviation ?? ""))
  .map((p) => p.id);

if (rpgThemeId && thirdPersonId && modernPlatformIds.length > 0) {
  const games = await client.game.getGames(
    gameQuery()
      .fields("name", "rating")
      .where("themes", "=", rpgThemeId)
      .where("player_perspectives", "=", thirdPersonId)
      .where("platforms", "=", modernPlatformIds)
      .where("rating", ">", 70)
      .sort("rating", "desc")
      .limit(5)
      .build(),
  );
  console.log("\n=== Third-Person RPGs on Modern Platforms ===");
  for (const g of games) {
    console.log(`  ${g.name} (${g.rating?.toFixed(1) ?? "N/A"})`);
  }
}
