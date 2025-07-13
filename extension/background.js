// Enable opening the sidebar when clicking the extension icon
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSidePanel') {
    // Open the side panel
    chrome.sidePanel.open({ windowId: chrome.windows.WINDOW_ID_CURRENT })
      .then(() => {
        console.log('Side panel opened successfully');
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('Failed to open side panel:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the message channel open for async response
  }
});

// Handle keyboard shortcuts for the extension
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      // Check if the tab supports content scripts (not chrome://, chrome-extension://, etc.)
      if (tabs[0].url && !tabs[0].url.startsWith('chrome://') && !tabs[0].url.startsWith('chrome-extension://')) {
        if (command === 'toggle-fixed-find') {
          // Send message to the active tab to toggle the fixed find tool
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleFixedFind' })
            .catch((error) => {
              // Content script not ready or not available
              console.log('Content script not ready for tab:', tabs[0].id, error.message);
            });
        } else if (command === 'toggle-page-search') {
          // Send message to the active tab to toggle the page search tool
          chrome.tabs.sendMessage(tabs[0].id, { action: 'togglePageSearch' })
            .catch((error) => {
              // Content script not ready or not available
              console.log('Content script not ready for tab:', tabs[0].id, error.message);
            });
        }
      } else {
        console.log('Content scripts not supported for this tab type:', tabs[0].url);
      }
    }
  });
});
