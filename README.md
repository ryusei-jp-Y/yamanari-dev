# yamanari.dev

Portfolio and service pages for projects under `yamanari.dev`.

## Routes

- `/` - portfolio top and project navigation
- `/web-quality-crawler` - Web Quality Crawler introduction LP
- `/boarda` - Boarda introduction LP
- `/idle-clock` - Idle Clock introduction LP

External app/demo hosts:

- `web-quality-crawler.yamanari.dev` - Cloudflare Tunnel to the local Web Quality Crawler app when needed
- `boarda.yamanari.dev` - Boarda app

## Development

This site uses the Sites vinext starter.

```bash
pnpm install
pnpm run dev
pnpm run check
```

The Cloudflare/Sites hosting declaration lives in `.openai/hosting.json`.
