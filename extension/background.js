// Enable opening the sidebar when clicking the extension icon
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
