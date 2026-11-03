const http = require('node:http');

const port = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello from Node, you asked for ${req.url}`);
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
