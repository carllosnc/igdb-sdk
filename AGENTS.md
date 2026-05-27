# IGDB API Docs

Main documentation: https://api-docs.igdb.com/#getting-started

# Bun

Always use `bun` instead of `npm`, `node`, `npx`, or any other JavaScript runtime/package manager. This project uses Bun.

- `bun run` instead of `npm run`
- `bun install` or just `bun` instead of `npm install`
- `bunx` instead of `npx`
- `bun test` instead of `npm test`
- `bun add` instead of `npm install <package>`
- `bun remove` instead of `npm uninstall`
- `bun --bun` to force scripts to run via bun instead of node

# Publishing Release

Package: `@carlosnc/igdb-sdk`

1. **Determine bump**: `patch` (bug fixes), `minor` (new features), `major` (breaking). Check commits since last tag: `git log --oneline v$(node -p "require('./package.json').version")..HEAD`.

2. **Update CHANGELOG.md**: Insert entry at top following existing format (`## [X.Y.Z] - YYYY-MM-DD` with `### Added` / `### Changed` / `### Fixed` sections).

3. **Update version** in `package.json`.

4. **Verify**: `bun run typecheck && bun run build && bun test`.

5. **Commit & tag**:
   ```
   git add package.json CHANGELOG.md
   git commit -m "chore(release): vX.Y.Z"
   git tag vX.Y.Z
   ```

6. **Publish**: `npm publish` (runs `prepublishOnly` which auto-builds).
