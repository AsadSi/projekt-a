# Logbook

One entry per week: what I added, what I chose over what and why, and what went wrong.

## Week 40 — Git and GitHub (PR #1)

- **What:** Put the move-the-box project in Git, created the GitHub repo `AsadSi/projekt-a`, and
  added W/A/S/D controls on a feature branch (`feature/wasd-keys`) merged through PR #1.
- **Chose / over what / why:** A feature branch and pull request over committing straight to
  `main`, so `main` always works and every change has a recorded reason. A public repo over a
  private one, so GitHub Pages hosting is free later. Stacked `case` labels in the `switch` over
  duplicating the movement line for each key.
- **What went wrong:** Running `git` through the chat's `!` shell once ran `git init` in my home
  folder instead of the project. Now I type Git commands in my own terminal and check the folder
  first. My commit message "changes added the wasd control on screen" says little; a better
  one is "Add W/A/S/D controls".

## Week 41 — npm, ESLint and Prettier (PR #2)

- **What:** Made the project an npm project (`package.json`), installed ESLint and Prettier as
  dev dependencies, and added the scripts `lint`, `format` and `format:check`.
- **Chose / over what / why:** `devDependencies` over `dependencies`, because the tools are only
  needed while developing, not in the finished page. ESLint's recommended rules over a large
  style guide, to start small. Prettier for layout and ESLint for mistakes, instead of making
  ESLint do both. Committed `package-lock.json` and ignored `node_modules`, so `npm install`
  gives everyone the same versions.
- **What went wrong:** My first `git switch -c` ran in `~/Documents`, not the project folder
  ("not a git repository"). My first PR description had no `npm install` in the test steps, so a
  reviewer's `npm run lint` would have failed.
