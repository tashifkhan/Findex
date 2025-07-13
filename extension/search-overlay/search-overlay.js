// Search Overlay JavaScript
let searchOverlay = null;
let searchInput = null;
let searchOverlayClose = null;
let searchResultsInfo = null;
let searchResultsCount = null;
let searchPrevButton = null;
let searchNextButton = null;

// State
let searchTerm = "";
let searchResults = [];
let currentSearchIndex = 0;
let currentTheme = "default";
let videoData = null;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    searchOverlay = document.getElementById("searchOverlay");
    searchInput = document.getElementById("searchInput");
    searchOverlayClose = document.getElementById("searchOverlayClose");
    searchResultsInfo = document.getElementById("searchResultsInfo");
    searchResultsCount = document.getElementById("searchResultsCount");
    searchPrevButton = document.getElementById("searchPrevButton");
    searchNextButton = document.getElementById("searchNextButton");

    // Set up event listeners
    setupEventListeners();
    
    // Apply initial theme
    applyTheme(currentTheme);
    
    // Focus input on load
    if (searchInput) {
        searchInput.focus();
    }
});

function setupEventListeners() {
    // Close button
    if (searchOverlayClose) {
        searchOverlayClose.addEventListener("click", closeSearchOverlay);
    }

    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            performSearch(e.target.value);
        });

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                goToNextResult();
            } else if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                goToPrevResult();
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeSearchOverlay();
            }
        });
    }

    // Navigation buttons
    if (searchNextButton) {
        searchNextButton.addEventListener("click", goToNextResult);
    }

    if (searchPrevButton) {
        searchPrevButton.addEventListener("click", goToPrevResult);
    }

    // Global keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        // Only handle if overlay is visible
        if (searchOverlay && !searchOverlay.classList.contains("hidden")) {
            if (e.key === "Escape") {
                e.preventDefault();
                closeSearchOverlay();
            }
        }
    });
}

// Search functionality
function performSearch(term) {
    searchTerm = term;
    if (!term.trim() || !videoData?.transcript) {
        searchResults = [];
        currentSearchIndex = 0;
        updateSearchResults();
        return;
    }

    const transcript = videoData.transcript.toLowerCase();
    const searchLower = term.toLowerCase();
    const results = [];
    let index = 0;

    while ((index = transcript.indexOf(searchLower, index)) !== -1) {
        results.push(index);
        index += 1;
    }

    searchResults = results;
    currentSearchIndex = results.length > 0 ? 0 : -1;
    updateSearchResults();
}

function updateSearchResults() {
    if (!searchResultsInfo || !searchResultsCount) return;

    if (searchResults.length === 0) {
        searchResultsInfo.classList.add("hidden");
        searchResultsCount.textContent = "No results found";
        return;
    }

    searchResultsInfo.classList.remove("hidden");
    searchResultsCount.textContent = `${currentSearchIndex + 1} of ${searchResults.length} results`;
    
    // Update button states
    if (searchPrevButton) {
        searchPrevButton.disabled = searchResults.length === 0;
    }
    if (searchNextButton) {
        searchNextButton.disabled = searchResults.length === 0;
    }
    
    // Highlight current result in transcript
    if (currentSearchIndex >= 0 && currentSearchIndex < searchResults.length) {
        const position = searchResults[currentSearchIndex];
        // Send message to parent to highlight search result
        window.parent.postMessage({
            type: "highlightSearchResult",
            position: position,
            searchTerm: searchTerm
        }, "*");
    }
}

function goToNextResult() {
    if (searchResults.length === 0) return;
    currentSearchIndex = (currentSearchIndex + 1) % searchResults.length;
    updateSearchResults();
}

function goToPrevResult() {
    if (searchResults.length === 0) return;
    currentSearchIndex = currentSearchIndex === 0 ? searchResults.length - 1 : currentSearchIndex - 1;
    updateSearchResults();
}

// Theme management
function applyTheme(theme) {
    currentTheme = theme;
    
    // Update body class
    document.body.className = `theme-${theme}`;
    
    // Update font and rendering for body
    document.body.style.fontFamily =
        theme === "nintendo"
            ? "monospace"
            : theme === "xp"
                ? 'Tahoma, "MS Sans Serif", sans-serif'
                : theme === "macos"
                    ? "'Segoe UI', system-ui, sans-serif"
                    : "inherit";
    document.body.style.imageRendering = theme === "nintendo" ? "pixelated" : "auto";
}

// Overlay management
function openSearchOverlay() {
    if (searchOverlay) {
        searchOverlay.classList.remove("hidden");
        if (searchInput) {
            searchInput.focus();
            searchInput.value = searchTerm;
        }
        updateSearchResults();
    }
}

function closeSearchOverlay() {
    if (searchOverlay) {
        searchOverlay.classList.add("hidden");
        if (searchInput) {
            searchInput.blur();
        }
    }
    
    // Send message to parent that overlay is closed
    window.parent.postMessage({
        type: "searchOverlayClosed"
    }, "*");
}

// Listen for messages from parent window
window.addEventListener("message", (event) => {
    const { type, data } = event.data;

    switch (type) {
        case "setVideoData":
            videoData = data;
            // Refresh search results if we have a search term
            if (searchTerm) {
                performSearch(searchTerm);
            }
            break;
            
        case "setTheme":
            applyTheme(data.theme);
            break;
            
        case "openSearch":
            openSearchOverlay();
            break;
            
        case "closeSearch":
            closeSearchOverlay();
            break;
            
        case "setSearchTerm":
            if (searchInput) {
                searchInput.value = data.term;
                performSearch(data.term);
            }
            break;
    }
});

// Expose functions globally for external access
window.SearchOverlay = {
    open: openSearchOverlay,
    close: closeSearchOverlay,
    setTheme: applyTheme,
    setVideoData: (data) => {
        videoData = data;
        if (searchTerm) {
            performSearch(searchTerm);
        }
    },
    setSearchTerm: (term) => {
        if (searchInput) {
            searchInput.value = term;
            performSearch(term);
        }
    }
}; 