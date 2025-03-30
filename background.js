const root = 'ci-en';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'save') {
    const { creatorId, articleId, images, html } = request.data;
    delete request.data.html;
    delete request.data.images;

    for (const filename of [
      `${root}/`,
      `${root}/${creatorId}/`,
      `${root}/${creatorId}/${articleId}/`,
    ])
      chrome.downloads.download({
        url: 'data:text/plain;charset=utf-8,',
        filename,
      });

    const directory = `${root}/${creatorId}/${articleId}`;

    chrome.downloads.download({
      url:
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(request.data, null, 2)),
      filename: `${directory}/data.json`,
    });

    for (const url of images)
      chrome.downloads.download({
        url,
        filename: `${directory}/${new URL(url).pathname.split('/').pop()}`,
        conflictActoin: 'overwrite',
      });

    chrome.downloads.download({
      url: 'data:text/html;charset=utf-8,' + encodeURIComponent(html),
      filename: `${directory}/index.html`,
    });

    sendResponse({ message: `saved ${directory}` });
  }
});
