// Find in Page Toolbar JavaScript
class FindInPage {
    constructor() {
        this.toolbar = null;
        this.input = null;
        this.status = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.clearBtn = null;
        this.closeBtn = null;
        this.caseSensitiveCheckbox = null;
        this.wholeWordCheckbox = null;
        
        this.searchTerm = '';
        this.matches = [];
        this.currentIndex = -1;
        this.highlights = [];
        this.isVisible = false;
        
        this.init();
    }
    
    init() {
        // Create toolbar if it doesn't exist
        if (!document.getElementById('findToolbar')) {
            this.createToolbar();
        }
        
        this.toolbar = document.getElementById('findToolbar');
        this.input = document.getElementById('findInput');
        this.status = document.getElementById('findStatus');
        this.prevBtn = document.getElementById('findPrevBtn');
        this.nextBtn = document.getElementById('findNextBtn');
        this.clearBtn = document.getElementById('findClearBtn');
        this.closeBtn = document.getElementById('findCloseBtn');
        this.caseSensitiveCheckbox = document.getElementById('findCaseSensitive');
        this.wholeWordCheckbox = document.getElementById('findWholeWord');
        
        this.bindEvents();
        this.setupKeyboardShortcuts();
    }
    
    createToolbar() {
        const toolbarHTML = `
            <div id="findToolbar" class="find-toolbar">
                <div class="find-toolbar-header">
                    <div class="find-toolbar-title">
                        🔍 Find in Page
                        <span class="find-toolbar-shortcut">Ctrl+F</span>
                    </div>
                    <button class="find-toolbar-close" id="findCloseBtn" title="Close (Esc)">×</button>
                </div>
                
                <div class="find-toolbar-input-group">
                    <input 
                        type="text" 
                        id="findInput" 
                        class="find-toolbar-input" 
                        placeholder="Search for text..."
                        autocomplete="off"
                    >
                </div>
                
                <div class="find-toolbar-options">
                    <label class="find-toolbar-checkbox">
                        <input type="checkbox" id="findCaseSensitive">
                        Case sensitive
                    </label>
                    <label class="find-toolbar-checkbox">
                        <input type="checkbox" id="findWholeWord">
                        Whole word
                    </label>
                </div>
                
                <div class="find-toolbar-controls">
                    <div class="find-toolbar-nav">
                        <button class="find-toolbar-btn" id="findPrevBtn" title="Previous (Shift+Enter)">↑ Prev</button>
                        <button class="find-toolbar-btn" id="findNextBtn" title="Next (Enter)">↓ Next</button>
                        <button class="find-toolbar-btn" id="findClearBtn" title="Clear highlights">Clear</button>
                    </div>
                    <div class="find-toolbar-status" id="findStatus"></div>
                </div>
            </div>
        `;
        
        // Add CSS if not already present
        if (!document.getElementById('findToolbarStyles')) {
            const style = document.createElement('style');
            style.id = 'findToolbarStyles';
            style.textContent = `
                .find-toolbar {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #ffffff;
                    border: 2px solid #3b82f6;
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    padding: 12px;
                    z-index: 10000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    min-width: 300px;
                    display: none;
                }
                .find-toolbar.show {
                    display: block;
                    animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .find-toolbar-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }
                .find-toolbar-title {
                    font-weight: 600;
                    color: #1f2937;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .find-toolbar-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    color: #6b7280;
                    font-size: 16px;
                    line-height: 1;
                }
                .find-toolbar-close:hover {
                    background: #f3f4f6;
                    color: #374151;
                }
                .find-toolbar-input-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                .find-toolbar-input {
                    flex: 1;
                    padding: 6px 10px;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    font-size: 14px;
                    outline: none;
                }
                .find-toolbar-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                }
                .find-toolbar-options {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }
                .find-toolbar-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    color: #6b7280;
                }
                .find-toolbar-checkbox input { margin: 0; }
                .find-toolbar-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .find-toolbar-nav {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .find-toolbar-btn {
                    padding: 6px 12px;
                    border: 1px solid #d1d5db;
                    background: #ffffff;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    color: #374151;
                    transition: all 0.15s ease;
                }
                .find-toolbar-btn:hover:not(:disabled) {
                    background: #f9fafb;
                    border-color: #9ca3af;
                }
                .find-toolbar-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .find-toolbar-status {
                    font-size: 12px;
                    color: #6b7280;
                    margin-left: 8px;
                }
                .find-toolbar-status.no-results {
                    color: #dc2626;
                }
                .find-highlight {
                    background: #fef3c7;
                    border-bottom: 2px solid #f59e0b;
                    padding: 1px 2px;
                    border-radius: 2px;
                }
                .find-highlight.current {
                    background: #fbbf24;
                    border-bottom: 2px solid #d97706;
                }
                .find-toolbar-shortcut {
                    font-size: 10px;
                    color: #9ca3af;
                    margin-left: 4px;
                }
                @media (max-width: 480px) {
                    .find-toolbar {
                        top: 10px;
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                    }
                    .find-toolbar-options {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 6px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.insertAdjacentHTML('beforeend', toolbarHTML);
    }
    
    bindEvents() {
        // Input events
        this.input.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.performSearch();
        });
        
        // Button events
        this.prevBtn.addEventListener('click', () => this.goToPrevious());
        this.nextBtn.addEventListener('click', () => this.goToNext());
        this.clearBtn.addEventListener('click', () => this.clearHighlights());
        this.closeBtn.addEventListener('click', () => this.hide());
        
        // Option changes
        this.caseSensitiveCheckbox.addEventListener('change', () => this.performSearch());
        this.wholeWordCheckbox.addEventListener('change', () => this.performSearch());
        
        // Prevent toolbar from closing when clicking inside it
        this.toolbar.addEventListener('click', (e) => e.stopPropagation());
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+F to show toolbar
            if (e.ctrlKey && e.key === 'f' && !e.metaKey) {
                e.preventDefault();
                this.show();
                return;
            }
            
            // Only handle shortcuts when toolbar is visible
            if (!this.isVisible) return;
            
            // Escape to close
            if (e.key === 'Escape') {
                e.preventDefault();
                this.hide();
                return;
            }
            
            // Enter for next, Shift+Enter for previous
            if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.goToPrevious();
                } else {
                    this.goToNext();
                }
                return;
            }
        });
    }
    
    show() {
        this.isVisible = true;
        this.toolbar.classList.add('show');
        this.input.focus();
        this.input.select();
        
        // If there's a previous search term, restore it
        if (this.searchTerm) {
            this.input.value = this.searchTerm;
            this.performSearch();
        }
    }
    
    hide() {
        this.isVisible = false;
        this.toolbar.classList.remove('show');
        this.clearHighlights();
        this.input.blur();
    }
    
    performSearch() {
        this.clearHighlights();
        
        if (!this.searchTerm.trim()) {
            this.updateStatus('');
            this.updateButtons();
            return;
        }
        
        const searchText = this.searchTerm;
        const caseSensitive = this.caseSensitiveCheckbox.checked;
        const wholeWord = this.wholeWordCheckbox.checked;
        
        // Get all text nodes in the document
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Skip script and style tags
                    const parent = node.parentElement;
                    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        const matches = [];
        let node;
        
        while (node = walker.nextNode()) {
            const text = node.textContent;
            const searchRegex = this.createSearchRegex(searchText, caseSensitive, wholeWord);
            let match;
            
            while ((match = searchRegex.exec(text)) !== null) {
                matches.push({
                    node: node,
                    start: match.index,
                    end: match.index + match[0].length,
                    text: match[0]
                });
            }
        }
        
        this.matches = matches;
        this.currentIndex = matches.length > 0 ? 0 : -1;
        
        if (matches.length > 0) {
            this.highlightMatches();
            this.goToMatch(0);
        }
        
        this.updateStatus();
        this.updateButtons();
    }
    
    createSearchRegex(searchText, caseSensitive, wholeWord) {
        let pattern = searchText;
        
        if (wholeWord) {
            pattern = `\\b${this.escapeRegex(searchText)}\\b`;
        } else {
            pattern = this.escapeRegex(searchText);
        }
        
        const flags = caseSensitive ? 'g' : 'gi';
        return new RegExp(pattern, flags);
    }
    
    escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    highlightMatches() {
        this.highlights = [];
        
        this.matches.forEach((match, index) => {
            const highlight = this.createHighlight(match, index);
            this.highlights.push(highlight);
        });
    }
    
    createHighlight(match, index) {
        const node = match.node;
        const parent = node.parentNode;
        const text = node.textContent;
        
        // Create wrapper for the highlighted text
        const wrapper = document.createElement('span');
        wrapper.className = 'find-highlight';
        wrapper.dataset.findIndex = index;
        
        // Split the text node
        const beforeText = text.substring(0, match.start);
        const matchText = text.substring(match.start, match.end);
        const afterText = text.substring(match.end);
        
        // Create text nodes
        if (beforeText) {
            wrapper.appendChild(document.createTextNode(beforeText));
        }
        
        const matchSpan = document.createElement('span');
        matchSpan.textContent = matchText;
        matchSpan.className = 'find-highlight';
        matchSpan.dataset.findIndex = index;
        wrapper.appendChild(matchSpan);
        
        if (afterText) {
            wrapper.appendChild(document.createTextNode(afterText));
        }
        
        // Replace the original text node
        parent.replaceChild(wrapper, node);
        
        return {
            wrapper: wrapper,
            matchSpan: matchSpan,
            originalNode: node,
            originalText: text
        };
    }
    
    goToMatch(index) {
        if (index < 0 || index >= this.matches.length) return;
        
        // Remove current highlight
        this.removeCurrentHighlight();
        
        this.currentIndex = index;
        
        // Add current highlight
        this.addCurrentHighlight();
        
        // Scroll to the match
        this.scrollToMatch();
        
        this.updateStatus();
        this.updateButtons();
    }
    
    goToNext() {
        if (this.matches.length === 0) return;
        
        const nextIndex = (this.currentIndex + 1) % this.matches.length;
        this.goToMatch(nextIndex);
    }
    
    goToPrevious() {
        if (this.matches.length === 0) return;
        
        const prevIndex = this.currentIndex === 0 ? this.matches.length - 1 : this.currentIndex - 1;
        this.goToMatch(prevIndex);
    }
    
    removeCurrentHighlight() {
        if (this.currentIndex >= 0 && this.highlights[this.currentIndex]) {
            this.highlights[this.currentIndex].matchSpan.classList.remove('current');
        }
    }
    
    addCurrentHighlight() {
        if (this.currentIndex >= 0 && this.highlights[this.currentIndex]) {
            this.highlights[this.currentIndex].matchSpan.classList.add('current');
        }
    }
    
    scrollToMatch() {
        if (this.currentIndex >= 0 && this.highlights[this.currentIndex]) {
            const matchSpan = this.highlights[this.currentIndex].matchSpan;
            matchSpan.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    }
    
    clearHighlights() {
        // Restore original text nodes
        this.highlights.forEach(highlight => {
            if (highlight.wrapper && highlight.wrapper.parentNode) {
                highlight.wrapper.parentNode.replaceChild(highlight.originalNode, highlight.wrapper);
            }
        });
        
        this.highlights = [];
        this.matches = [];
        this.currentIndex = -1;
        
        this.updateStatus('');
        this.updateButtons();
    }
    
    updateStatus() {
        if (this.matches.length === 0) {
            if (this.searchTerm.trim()) {
                this.status.textContent = 'No results found';
                this.status.classList.add('no-results');
            } else {
                this.status.textContent = '';
                this.status.classList.remove('no-results');
            }
        } else {
            this.status.textContent = `${this.currentIndex + 1} of ${this.matches.length}`;
            this.status.classList.remove('no-results');
        }
    }
    
    updateButtons() {
        const hasMatches = this.matches.length > 0;
        const hasHighlights = this.highlights.length > 0;
        
        this.prevBtn.disabled = !hasMatches;
        this.nextBtn.disabled = !hasMatches;
        this.clearBtn.disabled = !hasHighlights;
    }
}

// Initialize the find in page functionality
let findInPage;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        findInPage = new FindInPage();
    });
} else {
    findInPage = new FindInPage();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.FindInPage = FindInPage;
    window.findInPage = findInPage;
} 