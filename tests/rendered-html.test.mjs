import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio top page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /yamanari\.dev/);
  assert.match(html, /Web Quality Crawler/);
  assert.match(html, /Boarda/);
  assert.match(html, /Idle Clock/);
  assert.match(html, /href="\/web-quality-crawler"/);
  assert.match(html, /href="\/boarda"/);
  assert.match(html, /href="\/idle-clock"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the project landing pages", async () => {
  for (const [pathname, expected] of [
    ["/web-quality-crawler", "73 rules"],
    ["/boarda", "最新の紙"],
    ["/idle-clock", "10:24"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(expected));
  }
});
