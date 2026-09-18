const http = require('http');

const PORT = process.env.PORT || 3000;
const TARGET_API_URL = process.env.TARGET_API_URL;
const INTERVAL_MS = 5 * 60 * 1000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }));
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

if (TARGET_API_URL) {
  setInterval(async () => {
    try {
      const res = await fetch(TARGET_API_URL);
      console.log(`[scheduler] ${new Date().toISOString()} called ${TARGET_API_URL} -> ${res.status}`);
    } catch (err) {
      console.error(`[scheduler] ${new Date().toISOString()} failed calling ${TARGET_API_URL}:`, err.message);
    }
  }, INTERVAL_MS);
  console.log(`Scheduler active: calling ${TARGET_API_URL} every 5 minutes`);
} else {
  console.log('Scheduler inactive: set TARGET_API_URL env var to enable it');
}
