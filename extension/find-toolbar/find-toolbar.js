// Find Toolbar JavaScript
let findToolbar = null;
let findInput = null;
let findCloseButton = null;
let findResults = null;
let findPrevButton = null;
let findNextButton = null;
let findCaseSensitive = null;
let findWholeWord = null;

// State
let searchTerm = "";
let searchResults = [];
let currentSearchIndex = 0;
let currentTheme = "default";
let videoData = null;
let isFindToolbarOpen = false;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    findToolbar = document.getElementById("findToolbar");
    findInput = document.getElementById("findInput");
    findCloseButton = document.getElementById("findCloseButton");
    findResults = document.getElementById("findResults");
    findPrevButton = document.getElementById("findPrevButton");
    findNextButton = document.getElementById("findNextButton");
    findCaseSensitive = document.getElementById("findCaseSensitive");
    findWholeWord = document.getElementById("findWholeWord");

    // Set up event listeners
    setupEventListeners();
    
    // Apply initial theme
    applyTheme(currentTheme);

    const findAskAIBtn = document.getElementById('findAskAIBtn');
    const findAIStatus = document.getElementById('findAIStatus');
    if (findAskAIBtn && findAIStatus) {
        findAskAIBtn.addEventListener('click', async () => {
            findAIStatus.textContent = '';
            if (searchResults.length > 0) {
                findAIStatus.textContent = 'Content found on the page. Try refining your search or use Ask AI for something not present.';
                return;
            }
            if (!findInput.value.trim()) {
                findAIStatus.textContent = 'Please enter a question or topic.';
                return;
            }
            findAIStatus.textContent = 'Thinking...';
            const url = window.location.href;
            const question = findInput.value.trim();
            const isYouTube = (window.location.hostname === 'www.youtube.com' || window.location.hostname === 'youtube.com') && window.location.pathname === '/watch' && !!(new URLSearchParams(window.location.search).get('v'));
            let endpoint = isYouTube ? 'ask' : 'website';
            let payload = { url, question, chat_history: [] };
            try {
                const resp = await fetch(`http://localhost:5454/${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!resp.ok) throw new Error('Backend error');
                const data = await resp.json();
                if (data.answer && data.answer.trim() === 'Data not available.') {
                    findAIStatus.innerHTML = 'Data not available. <button id="findAICrawlBtn">Crawl the web?</button>';
                    const crawlBtn = document.getElementById('findAICrawlBtn');
                    crawlBtn.onclick = async () => {
                        findAIStatus.textContent = 'Crawling the web...';
                        try {
                            const crawlResp = await fetch('http://localhost:5454/crawller', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ question, chat_history: [] })
                            });
                            if (!crawlResp.ok) throw new Error('Backend error');
                            const crawlData = await crawlResp.json();
                            findAIStatus.textContent = crawlData.answer || 'No answer received from web search.';
                        } catch (err) {
                            findAIStatus.textContent = 'Error contacting backend (web search): ' + err.message;
                        }
                    };
                } else {
                    findAIStatus.textContent = data.answer || 'No answer received.';
                }
            } catch (err) {
                findAIStatus.textContent = 'Error contacting backend: ' + err.message;
            }
        });
    }
});

function setupEventListeners() {
    // Close button
    if (findCloseButton) {
        findCloseButton.addEventListener("click", closeFindToolbar);
    }

    // Find input
    if (findInput) {
        findInput.addEventListener("input", (e) => {
            performSearch(e.target.value);
        });

        findInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                goToNextResult();
            } else if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                goToPrevResult();
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeFindToolbar();
            }
        });
    }

    // Navigation buttons
    if (findNextButton) {
        findNextButton.addEventListener("click", goToNextResult);
    }

    if (findPrevButton) {
        findPrevButton.addEventListener("click", goToPrevResult);
    }

    // Search options
    if (findCaseSensitive) {
        findCaseSensitive.addEventListener("change", () => {
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }

    if (findWholeWord) {
        findWholeWord.addEventListener("change", () => {
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }

    // Global keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        // Ctrl+F to open find toolbar
        if (e.ctrlKey && e.key === "f") {
            e.preventDefault();
            openFindToolbar();
        }
        
        // Escape to close if toolbar is open
        if (e.key === "Escape" && isFindToolbarOpen) {
            e.preventDefault();
            closeFindToolbar();
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

    const transcript = videoData.transcript;
    const searchText = term;
    const results = [];
    
    // Get search options
    const caseSensitive = findCaseSensitive?.checked || false;
    const wholeWord = findWholeWord?.checked || false;
    
    // Prepare search text
    let searchPattern = searchText;
    if (!caseSensitive) {
        searchPattern = searchPattern.toLowerCase();
    }
    if (wholeWord) {
        searchPattern = `\\b${searchPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
    }
    
    // Create regex for search
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = wholeWord ? new RegExp(searchPattern, flags) : new RegExp(searchPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    
    // Search in transcript
    let match;
    const searchIn = caseSensitive ? transcript : transcript.toLowerCase();
    
    while ((match = regex.exec(searchIn)) !== null) {
        results.push(match.index);
    }

    searchResults = results;
    currentSearchIndex = results.length > 0 ? 0 : -1;
    updateSearchResults();
}

function updateSearchResults() {
    if (!findResults) return;

    if (searchResults.length === 0) {
        findResults.textContent = searchTerm ? "No results" : "0 of 0";
        return;
    }

    findResults.textContent = `${currentSearchIndex + 1} of ${searchResults.length}`;
    
    // Update button states
    if (findPrevButton) {
        findPrevButton.disabled = searchResults.length === 0;
    }
    if (findNextButton) {
        findNextButton.disabled = searchResults.length === 0;
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

// Toolbar management
function openFindToolbar() {
    if (findToolbar) {
        findToolbar.classList.remove("hidden");
        isFindToolbarOpen = true;
        if (findInput) {
            findInput.focus();
            findInput.select();
        }
        updateSearchResults();
    }
    
    // Send message to parent that find toolbar is open
    window.parent.postMessage({
        type: "findToolbarOpened"
    }, "*");
}

function closeFindToolbar() {
    if (findToolbar) {
        findToolbar.classList.add("hidden");
        isFindToolbarOpen = false;
        if (findInput) {
            findInput.blur();
        }
    }
    
    // Send message to parent that find toolbar is closed
    window.parent.postMessage({
        type: "findToolbarClosed"
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
            
        case "openFind":
            openFindToolbar();
            break;
            
        case "closeFind":
            closeFindToolbar();
            break;
            
        case "setSearchTerm":
            if (findInput) {
                findInput.value = data.term;
                performSearch(data.term);
            }
            break;
    }
});

// Expose functions globally for external access
window.FindToolbar = {
    open: openFindToolbar,
    close: closeFindToolbar,
    setTheme: applyTheme,
    setVideoData: (data) => {
        videoData = data;
        if (searchTerm) {
            performSearch(searchTerm);
        }
    },
    setSearchTerm: (term) => {
        if (findInput) {
            findInput.value = term;
            performSearch(term);
        }
    }
}; 