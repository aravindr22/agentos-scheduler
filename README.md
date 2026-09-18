# status-scheduler

Single-file Node.js app: a status API plus a scheduler that pings another API every 5 minutes.

## Usage

```
PORT=3000 TARGET_API_URL=https://example.com/api node server.js
```

- `GET /` — returns `{ status, uptime, timestamp }`
- Every 5 minutes, if `TARGET_API_URL` is set, the server calls it and logs the result.

## Env vars

- `PORT` (default `3000`)
- `TARGET_API_URL` (optional — scheduler is disabled if unset)
