// Handle extension icon click - inject persistent sidebar
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked for tab:', tab.id, tab.url);
  
  // Check if the tab supports content scripts
  if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
    console.log('Tab supports content scripts, injecting sidebar...');
    
    // Try to inject the script directly first
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content-scripts/inject-sidebar.js']
    }).then(() => {
      console.log('Sidebar script injected successfully');
      // Send message to trigger the sidebar
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { action: 'injectPersistentSidebar' })
          .catch((error) => {
            console.log('Failed to send message to content script:', error.message);
          });
      }, 100);
    }).catch(err => {
      console.error('Failed to inject sidebar script:', err);
    });
  } else {
    console.log('Content scripts not supported for this tab type:', tab.url);
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "request_current_url") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0] && tabs[0].url) {
        chrome.runtime.sendMessage({
          type: "current_url_update",
          url: tabs[0].url,
          tabId: tabs[0].id
        });
      }
    });
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








