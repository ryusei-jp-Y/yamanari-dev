import assert from "node:assert/strict";
import test from "node:test";

import worker, { normalizeInstagramPosts } from "./index.mjs";

test("normalizes image, video, and carousel posts", () => {
  const posts = normalizeInstagramPosts({
    data: [
      {
        id: "1",
        media_type: "IMAGE",
        media_url: "https://cdn.example.com/image.jpg",
        permalink: "https://www.instagram.com/p/image/",
        timestamp: "2026-07-18T00:00:00+0000",
      },
      {
        id: "2",
        media_type: "VIDEO",
        media_url: "https://cdn.example.com/video.mp4",
        thumbnail_url: "https://cdn.example.com/video.jpg",
        permalink: "https://www.instagram.com/reel/video/",
        timestamp: "2026-07-17T00:00:00+0000",
      },
      {
        id: "3",
        media_type: "CAROUSEL_ALBUM",
        media_url: "https://cdn.example.com/carousel.jpg",
        permalink: "https://www.instagram.com/p/carousel/",
        timestamp: "2026-07-16T00:00:00+0000",
      },
    ],
  });

  assert.equal(posts.length, 3);
  assert.equal(posts[1].imageUrl, "https://cdn.example.com/video.jpg");
  assert.equal(posts[2].mediaType, "CAROUSEL_ALBUM");
});

test("drops posts without safe image and permalink URLs", () => {
  const posts = normalizeInstagramPosts({
    data: [
      {
        id: "1",
        media_type: "IMAGE",
        media_url: "javascript:alert(1)",
        permalink: "https://www.instagram.com/p/example/",
      },
      {
        id: "2",
        media_type: "IMAGE",
        media_url: "https://cdn.example.com/image.jpg",
        permalink: "not-a-url",
      },
    ],
  });

  assert.deepEqual(posts, []);
});

test("returns a configuration error without Instagram secrets", async () => {
  const response = await worker.fetch(
    new Request("https://example.com/api/instagram"),
    { ASSETS: { fetch: () => new Response("asset") } },
    { waitUntil() {} },
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: "instagram_not_configured",
  });
});

test("returns normalized posts from the Instagram API", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(url.hostname, "graph.instagram.com");
    assert.equal(url.searchParams.get("access_token"), "test-token");

    return Response.json({
      data: [
        {
          id: "1",
          media_type: "IMAGE",
          media_url: "https://cdn.example.com/latest.jpg",
          permalink: "https://www.instagram.com/p/latest/",
          timestamp: "2026-07-18T00:00:00+0000",
        },
      ],
    });
  };

  try {
    const response = await worker.fetch(
      new Request("https://example.com/api/instagram"),
      {
        ASSETS: { fetch: () => new Response("asset") },
        INSTAGRAM_USER_ID: "123456",
        INSTAGRAM_ACCESS_TOKEN: "test-token",
      },
      { waitUntil() {} },
    );
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.account, "honzitu_no_kao");
    assert.equal(payload.posts[0].imageUrl, "https://cdn.example.com/latest.jpg");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("passes non-API requests to the static asset binding", async () => {
  const response = await worker.fetch(
    new Request("https://example.com/"),
    { ASSETS: { fetch: () => new Response("asset") } },
    { waitUntil() {} },
  );

  assert.equal(await response.text(), "asset");
});
