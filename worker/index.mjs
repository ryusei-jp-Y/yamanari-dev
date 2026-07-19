const INSTAGRAM_API_VERSION = "v25.0";
const INSTAGRAM_API_PATH = "/api/instagram";
const INSTAGRAM_FEED_LIMIT = 4;
const INSTAGRAM_FETCH_LIMIT = 12;
const INSTAGRAM_CACHE_SECONDS = 900;

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);

    if (url.pathname === INSTAGRAM_API_PATH) {
      return handleInstagramFeed(request, env, context);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleInstagramFeed(request, env, context) {
  if (request.method !== "GET") {
    return jsonResponse(
      { error: "method_not_allowed" },
      405,
      { Allow: "GET" },
    );
  }

  const cache = globalThis.caches?.default;
  const cacheKey = new Request(new URL(INSTAGRAM_API_PATH, request.url), {
    method: "GET",
  });
  const cachedResponse = cache ? await cache.match(cacheKey) : null;

  if (cachedResponse) {
    return cachedResponse;
  }

  if (!env.INSTAGRAM_USER_ID || !env.INSTAGRAM_ACCESS_TOKEN) {
    return jsonResponse({ error: "instagram_not_configured" }, 503);
  }

  const endpoint = new URL(
    `https://graph.instagram.com/${INSTAGRAM_API_VERSION}/${encodeURIComponent(env.INSTAGRAM_USER_ID)}/media`,
  );
  endpoint.searchParams.set(
    "fields",
    "id,media_type,media_url,thumbnail_url,permalink,timestamp",
  );
  endpoint.searchParams.set("limit", String(INSTAGRAM_FETCH_LIMIT));
  endpoint.searchParams.set("access_token", env.INSTAGRAM_ACCESS_TOKEN);

  try {
    const apiResponse = await fetch(endpoint, {
      headers: { Accept: "application/json" },
    });

    if (!apiResponse.ok) {
      return jsonResponse({ error: "instagram_request_failed" }, 502);
    }

    const payload = await apiResponse.json();
    const posts = normalizeInstagramPosts(payload, INSTAGRAM_FEED_LIMIT);

    if (posts.length === 0) {
      return jsonResponse({ error: "instagram_feed_empty" }, 502);
    }

    const response = jsonResponse(
      {
        account: "honzitu_no_kao",
        posts,
        updatedAt: new Date().toISOString(),
      },
      200,
      {
        "Cache-Control": `public, max-age=300, s-maxage=${INSTAGRAM_CACHE_SECONDS}, stale-while-revalidate=86400`,
      },
    );

    if (cache) {
      context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch {
    return jsonResponse({ error: "instagram_unavailable" }, 502);
  }
}

export function normalizeInstagramPosts(payload, limit = INSTAGRAM_FEED_LIMIT) {
  if (!Array.isArray(payload?.data)) {
    return [];
  }

  return payload.data
    .map((item) => {
      const imageUrl = item.media_type === "VIDEO"
        ? item.thumbnail_url || item.media_url
        : item.media_url;

      if (!isHttpsUrl(imageUrl) || !isHttpsUrl(item.permalink)) {
        return null;
      }

      return {
        id: String(item.id || ""),
        imageUrl,
        mediaType: String(item.media_type || "IMAGE"),
        permalink: item.permalink,
        timestamp: String(item.timestamp || ""),
      };
    })
    .filter(Boolean)
    .slice(0, limit);
}

function isHttpsUrl(value) {
  if (typeof value !== "string") {
    return false;
  }

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function jsonResponse(body, status, headers = {}) {
  return Response.json(body, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}
