// Page Search Content Script
// This script is injected into the main page to provide search functionality
// Compatible with the React extension architecture

class PageSearch {
    constructor() {
        this.searchBox = null;
        this.searchInput = null;
        this.resultsContainer = null;
        this.aiResponseContainer = null;
        this.isVisible = false;
        this.searchTerm = '';
        this.searchResults = [];
        this.currentIndex = 0;
        this.originalNodesRef = []; // Store original nodes for cleanup
        
        this.init();
    }
    
    init() {
        this.createSearchBox();
        this.bindEvents();
        this.setupKeyboardShortcuts();
        this.setupMessageListener();
        
        // Expose the instance to window for other scripts to check
        window.pageSearch = this;
    }
    
    createSearchBox() {
        const searchBoxHTML = `
            <div id="pageSearchBox" class="page-search-box">
                <div class="page-search-header">
                    <div class="page-search-title">
                        🔍 AI-Powered Search
                        <span class="page-search-shortcut">Ctrl+Shift+F</span>
                    </div>
                    <button class="page-search-close" id="pageSearchCloseBtn" title="Close (Esc)">×</button>
                </div>
                
                <div class="page-search-input-container">
                    <input 
                        type="text" 
                        id="pageSearchInput" 
                        class="page-search-input" 
                        placeholder="Search for text on this page..."
                        autocomplete="off"
                    >
                    <button class="page-search-ai-btn" id="pageSearchAiBtn" title="Ask AI about this content">
                        🤖 AI
                    </button>
                </div>
                
                <div class="page-search-results" id="pageSearchResults">
                    <div class="page-search-status" id="pageSearchStatus"></div>
                    <div class="page-search-navigation">
                        <button class="page-search-nav-btn" id="pageSearchPrevBtn" title="Previous (Shift+Enter)">↑ Prev</button>
                        <button class="page-search-nav-btn" id="pageSearchNextBtn" title="Next (Enter)">↓ Next</button>
                        <button class="page-search-clear-btn" id="pageSearchClearBtn" title="Clear highlights">Clear</button>
                    </div>
                </div>
                
                <div class="page-search-ai-response" id="pageSearchAiResponse">
                    <div class="page-search-ai-header">
                        <span>🤖 AI Response</span>
                        <button class="page-search-ai-close" id="pageSearchAiCloseBtn">×</button>
                    </div>
                    <div class="page-search-ai-content" id="pageSearchAiContent">
                        <p class="page-search-ai-placeholder">Ask AI about content not found on this page...</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS if not already present
        if (!document.getElementById('pageSearchStyles')) {
            const style = document.createElement('style');
            style.id = 'pageSearchStyles';
            style.textContent = `
                .page-search-box {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #ffffff;
                    border: 2px solid #3b82f6;
                    border-radius: 12px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                    padding: 16px;
                    z-index: 10000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    min-width: 350px;
                    max-width: 500px;
                    display: none;
                    backdrop-filter: blur(10px);
                }
                
                .page-search-box.show {
                    display: block;
                    animation: slideInSearch 0.3s ease-out;
                }
                
                @keyframes slideInSearch {
                    from { 
                        opacity: 0; 
                        transform: translateY(-20px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                .page-search-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }
                
                .page-search-title {
                    font-weight: 600;
                    color: #1f2937;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .page-search-shortcut {
                    font-size: 11px;
                    color: #6b7280;
                    background: #f3f4f6;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: normal;
                }
                
                .page-search-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    color: #6b7280;
                    font-size: 18px;
                    line-height: 1;
                    transition: all 0.15s ease;
                }
                
                .page-search-close:hover {
                    background: #f3f4f6;
                    color: #374151;
                }
                
                .page-search-input-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 12px;
                }
                
                .page-search-input {
                    flex: 1;
                    padding: 10px 12px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.15s ease;
                }
                
                .page-search-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                .page-search-ai-btn {
                    padding: 10px 16px;
                    background: #10b981;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.15s ease;
                    white-space: nowrap;
                }
                
                .page-search-ai-btn:hover {
                    background: #059669;
                    transform: translateY(-1px);
                }
                
                .page-search-ai-btn:active {
                    transform: translateY(0);
                }
                
                .page-search-results {
                    margin-bottom: 12px;
                }
                
                .page-search-status {
                    font-size: 13px;
                    color: #6b7280;
                    margin-bottom: 8px;
                    min-height: 18px;
                }
                
                .page-search-status.no-results {
                    color: #dc2626;
                }
                
                .page-search-navigation {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .page-search-nav-btn {
                    padding: 6px 12px;
                    border: 1px solid #d1d5db;
                    background: #ffffff;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    color: #374151;
                    transition: all 0.15s ease;
                }
                
                .page-search-nav-btn:hover:not(:disabled) {
                    background: #f9fafb;
                    border-color: #9ca3af;
                }
                
                .page-search-nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .page-search-clear-btn {
                    padding: 6px 12px;
                    border: 1px solid #d1d5db;
                    background: #ffffff;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    color: #374151;
                    transition: all 0.15s ease;
                    margin-left: auto;
                }
                
                .page-search-clear-btn:hover:not(:disabled) {
                    background: #f9fafb;
                    border-color: #9ca3af;
                }
                
                .page-search-clear-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .page-search-ai-response {
                    border-top: 1px solid #e5e7eb;
                    padding-top: 12px;
                    display: none;
                }
                
                .page-search-ai-response.show {
                    display: block;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .page-search-ai-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #1f2937;
                }
                
                .page-search-ai-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 2px;
                    border-radius: 4px;
                    color: #6b7280;
                    font-size: 16px;
                    line-height: 1;
                }
                
                .page-search-ai-close:hover {
                    background: #f3f4f6;
                    color: #374151;
                }
                
                .page-search-ai-content {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 12px;
                    font-size: 13px;
                    line-height: 1.5;
                    color: #374151;
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                .page-search-ai-placeholder {
                    color: #9ca3af;
                    font-style: italic;
                    margin: 0;
                }
                
                .page-search-ai-loading {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #6b7280;
                }
                
                .page-search-ai-loading::before {
                    content: '';
                    width: 16px;
                    height: 16px;
                    border: 2px solid #e5e7eb;
                    border-top: 2px solid #3b82f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                /* Highlight styles - compatible with useSearch hook */
                .search-highlight {
                    background: #fef3c7;
                    border-bottom: 2px solid #f59e0b;
                    padding: 1px 2px;
                    border-radius: 2px;
                }
                
                .search-highlight-current {
                    background: #fbbf24;
                    border-bottom: 2px solid #d97706;
                }
                
                /* Responsive design */
                @media (max-width: 600px) {
                    .page-search-box {
                        top: 10px;
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                        max-width: none;
                    }
                    
                    .page-search-input-container {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .page-search-ai-btn {
                        align-self: flex-end;
                        width: fit-content;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.insertAdjacentHTML('beforeend', searchBoxHTML);
        
        // Get references to elements
        this.searchBox = document.getElementById('pageSearchBox');
        this.searchInput = document.getElementById('pageSearchInput');
        this.resultsContainer = document.getElementById('pageSearchResults');
        this.aiResponseContainer = document.getElementById('pageSearchAiResponse');
        this.status = document.getElementById('pageSearchStatus');
        this.prevBtn = document.getElementById('pageSearchPrevBtn');
        this.nextBtn = document.getElementById('pageSearchNextBtn');
        this.clearBtn = document.getElementById('pageSearchClearBtn');
        this.closeBtn = document.getElementById('pageSearchCloseBtn');
        this.aiBtn = document.getElementById('pageSearchAiBtn');
        this.aiCloseBtn = document.getElementById('pageSearchAiCloseBtn');
        this.aiContent = document.getElementById('pageSearchAiContent');
    }
    
    bindEvents() {
        // Input events with debouncing
        let debounceTimer;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            this.searchTerm = e.target.value;
            
            debounceTimer = setTimeout(() => {
                this.highlightText(this.searchTerm);
            }, 300); // Same debounce as useSearch hook
        });
        
        // Button events
        this.prevBtn.addEventListener('click', () => this.prevResult());
        this.nextBtn.addEventListener('click', () => this.nextResult());
        this.clearBtn.addEventListener('click', () => this.clearSearch());
        this.closeBtn.addEventListener('click', () => this.hide());
        this.aiBtn.addEventListener('click', () => this.askAI());
        this.aiCloseBtn.addEventListener('click', () => this.hideAIResponse());
        
        // Prevent search box from closing when clicking inside it
        this.searchBox.addEventListener('click', (e) => e.stopPropagation());
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+F to show search box
            if (e.ctrlKey && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                e.stopPropagation();
                this.show();
                return;
            }
            
            // Ctrl+F to show search box (alternative shortcut)
            if (e.ctrlKey && e.key === 'f' && !e.shiftKey && !e.metaKey) {
                e.preventDefault();
                e.stopPropagation();
                this.show();
                return;
            }
            
            // Only handle shortcuts when search box is visible
            if (!this.isVisible) return;
            
            // Escape to close
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                this.hide();
                return;
            }
            
            // Enter for next, Shift+Enter for previous
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    this.prevResult();
                } else {
                    this.nextResult();
                }
                return;
            }
        });
    }
    
    setupMessageListener() {
        // Listen for messages from React components
        window.addEventListener('message', (event) => {
            if (event.source === window && event.data.type === 'OPEN_PAGE_SEARCH') {
                this.show();
            }
        });

        // Listen for messages from the extension background script
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'togglePageSearch') {
                // Toggle the page search tool
                if (this.isVisible) {
                    this.hide();
                } else {
                    this.show();
                }
                sendResponse({ success: true });
                return true;
            }
        });
    }
    
    show() {
        this.isVisible = true;
        this.searchBox.classList.add('show');
        this.searchInput.focus();
        this.searchInput.select();
        
        // If there's a previous search term, restore it
        if (this.searchTerm) {
            this.searchInput.value = this.searchTerm;
            this.highlightText(this.searchTerm);
        }
    }
    
    hide() {
        this.isVisible = false;
        this.searchBox.classList.remove('show');
        this.clearSearch();
        this.hideAIResponse();
        this.searchInput.blur();
    }
    
    // Clear all highlights by restoring the original text nodes
    clearHighlights() {
        this.originalNodesRef.forEach(({ parent, node }) => {
            if (parent && parent.contains(node)) {
                parent.replaceWith(node); // Restore the original text node
            }
        });
        // After restoring, normalize the parent to merge adjacent text nodes
        this.originalNodesRef.forEach(({ parent }) => {
            parent?.parentNode?.normalize();
        });
        this.originalNodesRef = [];
        this.searchResults = [];
        this.currentIndex = 0;
    }
    
    // The safe highlighting function that avoids innerHTML - same as useSearch hook
    highlightText(term) {
        this.clearHighlights();
        if (!term.trim()) {
            this.updateStatus('');
            this.updateButtons();
            return;
        }

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    if (
                        !parent ||
                        ["SCRIPT", "STYLE", "NOSCRIPT", "MARK"].includes(parent.tagName)
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.nodeValue.toLowerCase().includes(term.toLowerCase())
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                },
            }
        );

        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            textNodes.push(node);
        }

        const results = [];
        const originalNodes = [];

        textNodes.forEach((node) => {
            const text = node.nodeValue;
            const regex = new RegExp(
                `(${term.replace(/[.*+?^${"()"}|\[\]\\\\]/g, "\\$&")})`,
                "gi"
            );
            const parts = text.split(regex);

            if (parts.length > 1) {
                const fragment = document.createDocumentFragment();
                parts.forEach((part, index) => {
                    if (index % 2 === 1) {
                        // This is a match
                        const mark = document.createElement("mark");
                        mark.className = "search-highlight";
                        mark.textContent = part;
                        fragment.appendChild(mark);
                        results.push({ element: mark, index: results.length });
                    } else if (part) {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });

                const parent = node.parentNode;
                if (parent) {
                    originalNodes.push({ parent: parent, node: node.cloneNode() });
                    parent.replaceChild(fragment, node);
                }
            }
        });

        this.originalNodesRef = originalNodes;
        this.searchResults = results;
        this.currentIndex = 0;

        if (results.length > 0) {
            this.scrollToResult(0);
        }
        
        this.updateStatus();
        this.updateButtons();
    }
    
    scrollToResult(index) {
        if (this.searchResults.length === 0) return;

        document.querySelectorAll(".search-highlight-current").forEach((el) => {
            el.classList.remove("search-highlight-current");
            el.classList.add("search-highlight");
        });

        const result = this.searchResults[index];
        if (result && result.element) {
            result.element.classList.remove("search-highlight");
            result.element.classList.add("search-highlight-current");
            result.element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
    
    nextResult() {
        if (this.searchResults.length === 0) return;
        const newIndex = (this.currentIndex + 1) % this.searchResults.length;
        this.currentIndex = newIndex;
        this.scrollToResult(newIndex);
        this.updateStatus();
    }
    
    prevResult() {
        if (this.searchResults.length === 0) return;
        const newIndex = this.currentIndex === 0 ? this.searchResults.length - 1 : this.currentIndex - 1;
        this.currentIndex = newIndex;
        this.scrollToResult(newIndex);
        this.updateStatus();
    }
    
    clearSearch() {
        this.clearHighlights();
        this.searchTerm = '';
        this.searchInput.value = '';
        this.updateStatus('');
        this.updateButtons();
    }
    
    updateStatus() {
        if (this.searchResults.length === 0) {
            if (this.searchTerm.trim()) {
                this.status.textContent = 'No results found';
                this.status.classList.add('no-results');
            } else {
                this.status.textContent = '';
                this.status.classList.remove('no-results');
            }
        } else {
            this.status.textContent = `${this.currentIndex + 1} of ${this.searchResults.length} results`;
            this.status.classList.remove('no-results');
        }
    }
    
    updateButtons() {
        const hasMatches = this.searchResults.length > 0;
        const hasHighlights = this.originalNodesRef.length > 0;
        
        this.prevBtn.disabled = !hasMatches;
        this.nextBtn.disabled = !hasMatches;
        this.clearBtn.disabled = !hasHighlights;
    }
    
    askAI() {
        if (!this.searchTerm.trim()) {
            this.showAIResponse('Please enter a search term first.');
            return;
        }
        
        // Show loading state
        this.showAIResponse('<div class="page-search-ai-loading">Asking AI...</div>');
        
        // Mock AI response based on search results
        setTimeout(() => {
            if (this.searchResults.length > 0) {
                this.showAIResponse(`
                    <p><strong>Found ${this.searchResults.length} matches for "${this.searchTerm}" on this page.</strong></p>
                    <p>The term appears in various contexts throughout the content. You can use the navigation buttons to browse through each occurrence.</p>
                    <p><em>Note: This is a mock AI response. In a real implementation, this would provide contextual analysis and insights about the search term.</em></p>
                `);
            } else {
                this.showAIResponse(`
                    <p><strong>No exact matches found for "${this.searchTerm}" on this page.</strong></p>
                    <p>Here are some suggestions:</p>
                    <ul>
                        <li>Try different keywords or synonyms</li>
                        <li>Check for spelling variations</li>
                        <li>Use broader search terms</li>
                        <li>Consider related concepts</li>
                    </ul>
                    <p><em>Note: This is a mock AI response. In a real implementation, this would provide intelligent suggestions and alternative search strategies.</em></p>
                `);
            }
        }, 1500);
    }
    
    showAIResponse(content) {
        this.aiContent.innerHTML = content;
        this.aiResponseContainer.classList.add('show');
    }
    
    hideAIResponse() {
        this.aiResponseContainer.classList.remove('show');
        this.aiContent.innerHTML = '<p class="page-search-ai-placeholder">Ask AI about content not found on this page...</p>';
    }
}

// Initialize the page search functionality
let pageSearch;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        pageSearch = new PageSearch();
    });
} else {
    pageSearch = new PageSearch();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.PageSearch = PageSearch;
    window.pageSearch = pageSearch;
} 