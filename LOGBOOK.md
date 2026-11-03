# Logbook

One entry per week: what I added, what I chose over what and why, and what went wrong.
Entries are drafted with Claude (AI) from the Git history and our sessions, then read and checked by me.

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

## Weeks 42–44 — Error handling and input validation (PR #4)

- **What:** `script.js` now throws a clear error if `#box` or the step-size elements are missing,
  and a number field lets the user set the step size from 1 to 100, with an error message
  otherwise. Also stopped tracking the `.vscode/` folder.
- **Chose / over what / why:** Throwing a named error over letting the code fail later with a
  vague "cannot read properties of null", so the cause shows up in the console straight away.
  Checking the value in JavaScript with `Number.isFinite` and a range check over trusting the
  input's `min`/`max`, because those only limit the arrows; you can still type 500 or leave it
  empty. `role="alert"` on the error so screen readers announce it.
- **What went wrong:** The code was written on 15 Oct but the PR wasn't opened until 28 Oct, and
  I merged it about a minute after opening it, so nobody (not even me) reviewed it. The
  `.vscode/` fix went straight onto `main` instead of through a PR, against my own rule.

## Week 45 — Node.js server (branch `feature/node-server`)

- **What:** `server.js` serves the project with Node's built-in `node:http`: `index.html` for
  `/`, the right `Content-Type` per file, 404 for missing files and 403 for paths that try to
  leave the project folder. ESLint gets Node's globals for `server.js` only.
- **Chose / over what / why:** `node:http` over Express, to see what a framework does for me
  before using one; three static files need no routing library. `require` over `import`,
  because `package.json` says `"type": "commonjs"`. A path-traversal guard even though browsers
  clean up `..` themselves, because the client isn't always a browser.
- **What went wrong:** My first `server.js` was an Express snippet that never loaded Express and
  used port 3000. Serving `index.html` for every request broke the CSS and JS, because the
  browser got HTML back for `style.css` and `script.js`. Later a test failed with `EADDRINUSE`:
  my old server was still running on port 8080, and two programs can't listen on one port.
  Reviewing PR #5 before merging found the server handed out `/.git/config`; in a real project
  that would leak a `.env` file too. Fixed by refusing any path part that starts with a dot.
