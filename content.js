let urlLastSucceeded = null;
let repeated = 0;

const [, creatorId, articleId] = document.location.href.match(
  /^https:\/\/ci-en\.dlsite\.com\/creator\/(\d+)\/article\/(\d+)/,
);
if (creatorId || articleId) {
  const data = {
    url: document.location.href,
    creatorId,
    articleId,
    creatorName: document.querySelector('p.e-title a.e-userName').textContent,
    title: document.querySelector('h1.article-title a').textContent,
    date: document.querySelector('.e-date').textContent,
    tags: [...document.querySelectorAll('.c-hashTagList li a')].map((e) =>
      e.textContent.replace(/^#/, ''),
    ),
    images: [...document.querySelectorAll('img.file-player-image')].map(
      (e) => e.dataset.raw,
    ),
    html: document.documentElement.outerHTML,
  };

  console.log(data);
  chrome.runtime.sendMessage(
    {
      action: 'save',
      data,
    },
    console.log,
  );
}
