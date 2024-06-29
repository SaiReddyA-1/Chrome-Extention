let blocklist = [];

chrome.storage.sync.get(['blocklist'], (result) => {
  if (result.blocklist) {
    blocklist = result.blocklist.map(url => `*://${url}/*`);
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return { cancel: true };
  },
  { urls: blocklist },
  ["blocking"]
);

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (changes.blocklist) {
    blocklist = changes.blocklist.newValue.map(url => `*://${url}/*`);
  }
});
