// A small web server that serves the files in this folder (index.html, style.css, script.js).
// Run it with `node server.js` and open http://localhost:8080. Stop it with Ctrl+C.

// Load Node's built-in modules. `require` (not `import`) because package.json says "type": "commonjs".
const http = require("node:http"); // talks HTTP: receives requests, sends responses
const fs = require("node:fs"); // reads files from the disk
const path = require("node:path"); // joins folder and file names safely on any operating system

const port = 8080; // the "door number" the server listens on; matches .vscode/launch.json
const root = __dirname; // the folder this file lives in; we only ever serve files from inside it

// The browser needs to know what kind of file it is getting, or it won't use it.
// This maps a file extension to the matching Content-Type header.
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

// createServer gets a function that runs once for EVERY request.
// req = what the browser asked for, res = the answer we send back.
const server = http.createServer((req, res) => {
  // req.url is the path, e.g. "/style.css". Cut off any "?query" part, we don't use it.
  const urlPath = req.url.split("?")[0];

  // "/" means "the front page", so send index.html. Anything else maps to that file in the folder.
  const filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath);

  // Path traversal guard: a request like "/../../secret.txt" would join to a path OUTSIDE our folder.
  // If the final path doesn't start with our folder, refuse with 403 Forbidden.
  if (!filePath.startsWith(root + path.sep)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return; // stop here, don't read anything
  }

  // Read the file. This takes a moment, so Node calls our function when it's done:
  // err is set if something went wrong (e.g. the file doesn't exist), data is the file's contents.
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    // Look up the type from the extension (".css" -> "text/css"). Unknown types get a generic one.
    const type = types[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type }); // 200 = OK, plus the type header
    res.end(data); // send the file and finish the response
  });
});

// Start listening. The function runs once, when the server is ready.
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
