# yamanari.dev

Static portfolio and service pages for projects under `yamanari.dev`.

## Routes

- `/` - portfolio top and project navigation
- `/web-quality-crawler/` - Web Quality Crawler introduction LP
- `/boarda/` - Boarda introduction LP
- `/idle-clock/` - Idle Clock introduction LP

External app/demo hosts:

- `web-quality-crawler.yamanari.dev` - Cloudflare Tunnel to the local Web Quality Crawler app when needed
- `boarda.yamanari.dev` - Boarda app

## Structure

```text
index.html
web-quality-crawler/index.html
boarda/index.html
idle-clock/index.html
assets/styles.css
```

## Local preview

```bash
python3 -m http.server 3000
```

Open `http://localhost:3000/`.

## Cloudflare Pages

Use Git integration with this repository.

```text
Build command: none
Build output directory: /
Root directory: /
```

Cloudflare Pages handles deployment on every push to `main`.

## Check

```bash
bash scripts/check-static-site.sh
```
