// Get DOM elements
const usernameInput = document.getElementById("username");
const saveButton = document.getElementById("save");
const statusDiv = document.getElementById("status");

// Load saved settings when the page opens
chrome.storage.sync.get("username", (data) => {
  if (data.username) {
    usernameInput.value = data.username;
  }
});

// Save settings when the save button is clicked
saveButton.addEventListener("click", () => {
  const username = usernameInput.value;
  
  chrome.storage.sync.set({ username: username }, () => {
    // Show success message
    statusDiv.textContent = "Settings saved successfully!";
    statusDiv.className = "success";
    statusDiv.style.display = "block";
    
    // Hide the message after 2 seconds
    setTimeout(() => {
      statusDiv.style.display = "none";
    }, 2000);
  });
});
