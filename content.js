const makeThumbURL = (videoID) => `https://img.youtube.com/vi/${videoID}/0.jpg`;

const makeThumb = (src) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.float = "right";
  img.style.height = "120px";
  img.style.marginLeft = "5px";
  img.style.maxWidth = "160px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "4px";
  return img;
};

const findVideoIDExpr = /watch\?v=([0-9a-zA-Z-_]+)/;
const findVideoID = (url) => url.match(findVideoIDExpr)?.[1];
const findVideoURL = (elm) =>
  elm.querySelector(".item-meta > .item-meta-icons a[target=_blank]")?.href;

const attachThumbnails = () => {
  const items = document.querySelectorAll("main .items article");
  if (!items?.length) return;

  for (const item of items) {
    if (item.querySelector("img[data-youtube-thumb]")) continue;

    const url = findVideoURL(item);
    if (!url) continue;
    const id = findVideoID(url);
    if (!id) continue;

    const thumbURL = makeThumbURL(id);
    const thumb = makeThumb(thumbURL);
    thumb.setAttribute("data-youtube-thumb", "true"); // Mark as added by extension
    item.prepend(thumb);
  }
};

attachThumbnails();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Check if any new articles were added
      const hasNewArticles = Array.from(mutation.addedNodes).some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node.matches("article") || node.querySelector("article"))
      );

      if (hasNewArticles) {
        setTimeout(attachThumbnails, 100);
      }
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
