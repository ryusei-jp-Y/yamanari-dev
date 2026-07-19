(() => {
  const feed = document.querySelector("[data-instagram-feed]");

  if (!feed) {
    return;
  }

  const items = [...feed.querySelectorAll("[data-instagram-item]")];

  fetch("/api/instagram", {
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Instagram feed is unavailable");
      }

      return response.json();
    })
    .then(({ posts }) => {
      if (!Array.isArray(posts)) {
        return;
      }

      posts.slice(0, items.length).forEach((post, index) => {
        updateFeedItem(items[index], post, index);
      });
    })
    .catch(() => {
      // The HTML images remain as a stable fallback when the API is unavailable.
    });
})();

function updateFeedItem(item, post, index) {
  const image = item.querySelector("img");

  if (!image || !isHttpsUrl(post?.imageUrl) || !isHttpsUrl(post?.permalink)) {
    return;
  }

  const fallbackSource = image.getAttribute("src");
  image.addEventListener(
    "error",
    () => {
      image.removeAttribute("referrerpolicy");
      image.setAttribute("src", fallbackSource);
    },
    { once: true },
  );

  item.href = post.permalink;
  item.setAttribute(
    "aria-label",
    `honzitu no kaoのイラスト投稿${index + 1}をInstagramで見る`,
  );
  image.referrerPolicy = "no-referrer";
  image.alt = `honzitu no kaoのイラスト投稿 ${index + 1}`;
  image.src = post.imageUrl;
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
