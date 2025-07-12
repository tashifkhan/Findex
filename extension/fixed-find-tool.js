// Fixed Find Tool - Top Right Corner DOM Search
class FixedFindTool {
    constructor() {
        try {
            console.log('FixedFindTool constructor called');
            
            this.toolbar = null;
            this.input = null;
            this.status = null;
            this.prevBtn = null;
            this.nextBtn = null;
            this.clearBtn = null;
            this.closeBtn = null;
            this.caseSensitiveCheckbox = null;
            this.wholeWordCheckbox = null;
            this.searchInHTMLCheckbox = null;
            
            this.searchTerm = '';
            this.matches = [];
            this.currentIndex = -1;
            this.highlights = [];
            this.isVisible = false;
            this.searchInHTML = false;
            
            console.log('FixedFindTool properties initialized');
            this.init();
        } catch (error) {
            console.error('Error in FixedFindTool constructor:', error);
        }
    }
    
    init() {
        try {
            // Create toolbar if it doesn't exist
            if (!document.getElementById('fixedFindToolbar')) {
                this.createToolbar();
            }
            
            // Wait a bit for the DOM to be ready
            setTimeout(() => {
                // Check if toolbar was created successfully
                if (document.getElementById('fixedFindToolbar')) {
                    this.initializeElements();
                } else {
                    console.error('Toolbar creation failed');
                }
            }, 50);
        } catch (error) {
            console.error('Error in FixedFindTool init:', error);
            // Retry initialization after a delay
            setTimeout(() => {
                this.init();
            }, 100);
        }
    }
    
    initializeElements(retryCount = 0) {
        try {
            // Limit retries to prevent infinite loops
            if (retryCount > 20) {
                console.error('FixedFindTool initialization failed after 20 retries');
                return;
            }
            
            this.toolbar = document.getElementById('fixedFindToolbar');
            this.input = document.getElementById('fixedFindInput');
            this.status = document.getElementById('fixedFindStatus');
            this.prevBtn = document.getElementById('fixedFindPrevBtn');
            this.nextBtn = document.getElementById('fixedFindNextBtn');
            this.clearBtn = document.getElementById('fixedFindClearBtn');
            this.closeBtn = document.getElementById('fixedFindCloseBtn');
            this.caseSensitiveCheckbox = document.getElementById('fixedFindCaseSensitive');
            this.wholeWordCheckbox = document.getElementById('fixedFindWholeWord');
            this.searchInHTMLCheckbox = document.getElementById('fixedFindInHTML');
            
            // Check if all elements are found
            if (!this.toolbar || !this.input || !this.status || !this.prevBtn || 
                !this.nextBtn || !this.clearBtn || !this.closeBtn || 
                !this.caseSensitiveCheckbox || !this.wholeWordCheckbox || !this.searchInHTMLCheckbox) {
                console.log(`FixedFindTool elements not found, retrying... (attempt ${retryCount + 1}/20)`);
                setTimeout(() => {
                    this.initializeElements(retryCount + 1);
                }, 100);
                return;
            }
            
            this.bindEvents();
            this.setupKeyboardShortcuts();
            console.log('FixedFindTool initialized successfully');
        } catch (error) {
            console.error('Error initializing FixedFindTool elements:', error);
        }
    }
    
    createToolbar() {
        try {
            console.log('Creating toolbar...');
            
            // Check if DOM is ready
            if (!document.body) {
                console.log('Document body not ready, waiting...');
                setTimeout(() => {
                    this.createToolbar();
                }, 50);
                return;
            }
            
            // Add CSS if not already present
            if (!document.getElementById('fixedFindToolbarStyles')) {
                const style = document.createElement('style');
                style.id = 'fixedFindToolbarStyles';
                style.textContent = `
                    .fixed-find-toolbar {
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
                        min-width: 320px;
                        display: none;
                    }
                    .fixed-find-toolbar.show {
                        display: block;
                        animation: slideInFixed 0.3s ease-out;
                    }
                    @keyframes slideInFixed {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .fixed-find-toolbar-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 8px;
                    }
                    .fixed-find-toolbar-title {
                        font-weight: 600;
                        color: #1f2937;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    .fixed-find-toolbar-shortcut {
                        font-size: 11px;
                        color: #6b7280;
                        background: #f3f4f6;
                        padding: 2px 6px;
                        border-radius: 3px;
                        font-weight: normal;
                    }
                    .fixed-find-toolbar-close {
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                        color: #6b7280;
                        font-size: 16px;
                        line-height: 1;
                    }
                    .fixed-find-toolbar-close:hover {
                        background: #f3f4f6;
                        color: #374151;
                    }
                    .fixed-find-toolbar-input-group {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-bottom: 8px;
                    }
                    .fixed-find-toolbar-input {
                        flex: 1;
                        padding: 6px 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 4px;
                        font-size: 14px;
                        outline: none;
                    }
                    .fixed-find-toolbar-input:focus {
                        border-color: #3b82f6;
                        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                    }
                    .fixed-find-toolbar-options {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 8px;
                        flex-wrap: wrap;
                    }
                    .fixed-find-toolbar-checkbox {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        font-size: 12px;
                        color: #6b7280;
                    }
                    .fixed-find-toolbar-checkbox input { margin: 0; }
                    .fixed-find-toolbar-controls {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .fixed-find-toolbar-nav {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    .fixed-find-toolbar-btn {
                        padding: 6px 12px;
                        border: 1px solid #d1d5db;
                        background: #ffffff;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                        color: #374151;
                        transition: all 0.15s ease;
                    }
                    .fixed-find-toolbar-btn:hover:not(:disabled) {
                        background: #f9fafb;
                        border-color: #9ca3af;
                    }
                    .fixed-find-toolbar-btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    .fixed-find-toolbar-status {
                        font-size: 12px;
                        color: #6b7280;
                        text-align: right;
                    }
                    
                    /* Highlight styles */
                    .fixed-find-highlight {
                        background-color: #fef3c7;
                        border: 1px solid #f59e0b;
                        border-radius: 2px;
                        padding: 1px 2px;
                    }
                    .fixed-find-highlight.current {
                        background-color: #fbbf24;
                        border-color: #d97706;
                        box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3);
                    }
                    
                    /* Responsive design */
                    @media (max-width: 768px) {
                        .fixed-find-toolbar {
                            top: 10px;
                            right: 10px;
                            left: 10px;
                            min-width: auto;
                        }
                        .fixed-find-toolbar-options {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 6px;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Build toolbar programmatically to avoid TrustedHTML issues
            const toolbarElement = document.createElement('div');
            toolbarElement.id = 'fixedFindToolbar';
            toolbarElement.className = 'fixed-find-toolbar';
            
            // Create header
            const header = document.createElement('div');
            header.className = 'fixed-find-toolbar-header';
            
            const title = document.createElement('div');
            title.className = 'fixed-find-toolbar-title';
            title.textContent = '🔍 DOM Search';
            
            const shortcut = document.createElement('span');
            shortcut.className = 'fixed-find-toolbar-shortcut';
            shortcut.textContent = 'Ctrl+Shift+F';
            title.appendChild(shortcut);
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'fixed-find-toolbar-close';
            closeBtn.id = 'fixedFindCloseBtn';
            closeBtn.title = 'Close (Esc)';
            closeBtn.textContent = '×';
            
            header.appendChild(title);
            header.appendChild(closeBtn);
            
            // Create input group
            const inputGroup = document.createElement('div');
            inputGroup.className = 'fixed-find-toolbar-input-group';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'fixedFindInput';
            input.className = 'fixed-find-toolbar-input';
            input.placeholder = 'Search in DOM...';
            input.autocomplete = 'off';
            
            inputGroup.appendChild(input);
            
            // Create options
            const options = document.createElement('div');
            options.className = 'fixed-find-toolbar-options';
            
            const caseSensitiveLabel = document.createElement('label');
            caseSensitiveLabel.className = 'fixed-find-toolbar-checkbox';
            const caseSensitiveCheckbox = document.createElement('input');
            caseSensitiveCheckbox.type = 'checkbox';
            caseSensitiveCheckbox.id = 'fixedFindCaseSensitive';
            caseSensitiveLabel.appendChild(caseSensitiveCheckbox);
            caseSensitiveLabel.appendChild(document.createTextNode(' Case sensitive'));
            
            const wholeWordLabel = document.createElement('label');
            wholeWordLabel.className = 'fixed-find-toolbar-checkbox';
            const wholeWordCheckbox = document.createElement('input');
            wholeWordCheckbox.type = 'checkbox';
            wholeWordCheckbox.id = 'fixedFindWholeWord';
            wholeWordLabel.appendChild(wholeWordCheckbox);
            wholeWordLabel.appendChild(document.createTextNode(' Whole word'));
            
            const htmlLabel = document.createElement('label');
            htmlLabel.className = 'fixed-find-toolbar-checkbox';
            const htmlCheckbox = document.createElement('input');
            htmlCheckbox.type = 'checkbox';
            htmlCheckbox.id = 'fixedFindInHTML';
            htmlLabel.appendChild(htmlCheckbox);
            htmlLabel.appendChild(document.createTextNode(' Search in HTML'));
            
            options.appendChild(caseSensitiveLabel);
            options.appendChild(wholeWordLabel);
            options.appendChild(htmlLabel);
            
            // Create controls
            const controls = document.createElement('div');
            controls.className = 'fixed-find-toolbar-controls';
            
            const nav = document.createElement('div');
            nav.className = 'fixed-find-toolbar-nav';
            
            const prevBtn = document.createElement('button');
            prevBtn.className = 'fixed-find-toolbar-btn';
            prevBtn.id = 'fixedFindPrevBtn';
            prevBtn.title = 'Previous (Shift+Enter)';
            prevBtn.textContent = '↑ Prev';
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'fixed-find-toolbar-btn';
            nextBtn.id = 'fixedFindNextBtn';
            nextBtn.title = 'Next (Enter)';
            nextBtn.textContent = '↓ Next';
            
            const clearBtn = document.createElement('button');
            clearBtn.className = 'fixed-find-toolbar-btn';
            clearBtn.id = 'fixedFindClearBtn';
            clearBtn.title = 'Clear highlights';
            clearBtn.textContent = 'Clear';
            
            nav.appendChild(prevBtn);
            nav.appendChild(nextBtn);
            nav.appendChild(clearBtn);
            
            const status = document.createElement('div');
            status.className = 'fixed-find-toolbar-status';
            status.id = 'fixedFindStatus';
            
            controls.appendChild(nav);
            controls.appendChild(status);
            
            // Assemble toolbar
            toolbarElement.appendChild(header);
            toolbarElement.appendChild(inputGroup);
            toolbarElement.appendChild(options);
            toolbarElement.appendChild(controls);
            
            document.body.appendChild(toolbarElement);
            console.log('Toolbar created successfully');
        } catch (error) {
            console.error('Error creating toolbar:', error);
        }
    }
    
    bindEvents() {
        this.input.addEventListener('input', () => {
            this.searchTerm = this.input.value;
            this.performSearch();
        });
        
        this.prevBtn.addEventListener('click', () => {
            this.goToPrevious();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.goToNext();
        });
        
        this.clearBtn.addEventListener('click', () => {
            this.clearHighlights();
        });
        
        this.closeBtn.addEventListener('click', () => {
            this.hide();
        });
        
        this.caseSensitiveCheckbox.addEventListener('change', () => {
            this.performSearch();
        });
        
        this.wholeWordCheckbox.addEventListener('change', () => {
            this.performSearch();
        });
        
        this.searchInHTMLCheckbox.addEventListener('change', () => {
            this.searchInHTML = this.searchInHTMLCheckbox.checked;
            this.performSearch();
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+F to show/hide
            if (e.ctrlKey && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                if (this.isVisible) {
                    this.hide();
                } else {
                    this.show();
                }
            }
            
            // Only handle other shortcuts when toolbar is visible
            if (!this.isVisible) return;
            
            // Escape to close
            if (e.key === 'Escape') {
                e.preventDefault();
                this.hide();
            }
            
            // Enter for next, Shift+Enter for previous
            if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.goToPrevious();
                } else {
                    this.goToNext();
                }
            }
        });
        
        // Listen for messages from content script
        window.addEventListener('message', (event) => {
            if (event.source !== window) return;
            
            switch (event.data.type) {
                case 'FIXED_FIND_CHECK_READY':
                    // Respond with ready status
                    if (this.toolbar && this.input) {
                        window.postMessage({ type: 'FIXED_FIND_READY' }, '*');
                    } else {
                        window.postMessage({ type: 'FIXED_FIND_NOT_READY' }, '*');
                    }
                    break;
                    
                case 'FIXED_FIND_TOGGLE':
                    // Toggle the tool visibility
                    if (this.isVisible) {
                        this.hide();
                    } else {
                        this.show();
                    }
                    break;
            }
        });
    }
    
    show() {
        // Ensure elements are initialized before showing
        if (!this.toolbar || !this.input) {
            console.log('FixedFindTool elements not ready, initializing...');
            this.initializeElements();
            setTimeout(() => {
                this.show();
            }, 50);
            return;
        }
        
        this.isVisible = true;
        this.toolbar.classList.add('show');
        this.input.focus();
        this.input.select();
    }
    
    hide() {
        if (!this.toolbar) {
            return;
        }
        
        this.isVisible = false;
        this.toolbar.classList.remove('show');
        this.clearHighlights();
    }
    
    performSearch() {
        // Ensure elements are initialized
        if (!this.caseSensitiveCheckbox || !this.wholeWordCheckbox || !this.searchInHTMLCheckbox) {
            console.log('FixedFindTool elements not ready for search, initializing...');
            this.initializeElements();
            setTimeout(() => {
                this.performSearch();
            }, 50);
            return;
        }
        
        this.clearHighlights();
        this.matches = [];
        this.currentIndex = -1;
        
        if (!this.searchTerm.trim()) {
            this.updateStatus();
            this.updateButtons();
            return;
        }
        
        const caseSensitive = this.caseSensitiveCheckbox.checked;
        const wholeWord = this.wholeWordCheckbox.checked;
        const regex = this.createSearchRegex(this.searchTerm, caseSensitive, wholeWord);
        
        // Search in text content and HTML
        this.searchInDOM(regex);
        
        if (this.matches.length > 0) {
            this.currentIndex = 0;
            this.highlightMatches();
            this.goToMatch(0);
        }
        
        this.updateStatus();
        this.updateButtons();
    }
    
    searchInDOM(regex) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: (node) => {
                    // Skip script and style tags
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const tagName = node.tagName.toLowerCase();
                        if (['script', 'style', 'noscript'].includes(tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        // Skip the toolbar itself
                        if (node.id === 'fixedFindToolbar' || node.closest('#fixedFindToolbar')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeType === Node.TEXT_NODE) {
                // Search in text content
                const text = node.textContent;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    this.matches.push({
                        node: node,
                        start: match.index,
                        end: match.index + match[0].length,
                        text: match[0],
                        type: 'text'
                    });
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && this.searchInHTML) {
                // Search in HTML attributes
                const attributes = node.attributes;
                for (let i = 0; i < attributes.length; i++) {
                    const attr = attributes[i];
                    const value = attr.value;
                    let match;
                    while ((match = regex.exec(value)) !== null) {
                        this.matches.push({
                            node: node,
                            attribute: attr.name,
                            start: match.index,
                            end: match.index + match[0].length,
                            text: match[0],
                            type: 'attribute'
                        });
                    }
                }
            }
        }
    }
    
    createSearchRegex(searchText, caseSensitive, wholeWord) {
        let pattern = this.escapeRegex(searchText);
        if (wholeWord) {
            pattern = `\\b${pattern}\\b`;
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
            if (match.type === 'text') {
                const highlight = this.createTextHighlight(match, index);
                this.highlights.push(highlight);
            } else if (match.type === 'attribute') {
                const highlight = this.createAttributeHighlight(match, index);
                this.highlights.push(highlight);
            }
        });
    }
    
    createTextHighlight(match, index) {
        const textNode = match.node;
        const parent = textNode.parentNode;
        const text = textNode.textContent;
        
        // Create wrapper span
        const wrapper = document.createElement('span');
        wrapper.className = `fixed-find-highlight ${index === this.currentIndex ? 'current' : ''}`;
        wrapper.dataset.findIndex = index;
        
        // Split text and create text nodes
        const beforeText = text.substring(0, match.start);
        const matchText = text.substring(match.start, match.end);
        const afterText = text.substring(match.end);
        
        if (beforeText) {
            wrapper.appendChild(document.createTextNode(beforeText));
        }
        
        const matchSpan = document.createElement('span');
        matchSpan.textContent = matchText;
        matchSpan.style.backgroundColor = index === this.currentIndex ? '#fbbf24' : '#fef3c7';
        matchSpan.style.border = index === this.currentIndex ? '1px solid #d97706' : '1px solid #f59e0b';
        matchSpan.style.borderRadius = '2px';
        matchSpan.style.padding = '1px 2px';
        wrapper.appendChild(matchSpan);
        
        if (afterText) {
            wrapper.appendChild(document.createTextNode(afterText));
        }
        
        parent.replaceChild(wrapper, textNode);
        return wrapper;
    }
    
    createAttributeHighlight(match, index) {
        const element = match.node;
        const attrName = match.attribute;
        const attrValue = element.getAttribute(attrName);
        
        // Create a visual indicator for attribute matches
        const indicator = document.createElement('div');
        indicator.className = `fixed-find-highlight ${index === this.currentIndex ? 'current' : ''}`;
        indicator.dataset.findIndex = index;
        indicator.style.position = 'absolute';
        indicator.style.top = '0';
        indicator.style.left = '0';
        indicator.style.width = '100%';
        indicator.style.height = '100%';
        indicator.style.backgroundColor = index === this.currentIndex ? 'rgba(251, 191, 36, 0.3)' : 'rgba(254, 243, 199, 0.3)';
        indicator.style.border = index === this.currentIndex ? '2px solid #d97706' : '2px solid #f59e0b';
        indicator.style.borderRadius = '4px';
        indicator.style.pointerEvents = 'none';
        indicator.style.zIndex = '9999';
        
        // Make element position relative if it's not already
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(indicator);
        return indicator;
    }
    
    goToMatch(index) {
        if (index < 0 || index >= this.matches.length) return;
        
        this.currentIndex = index;
        this.removeCurrentHighlight();
        this.addCurrentHighlight();
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
        this.highlights.forEach(highlight => {
            highlight.classList.remove('current');
            if (highlight.style) {
                highlight.style.backgroundColor = '#fef3c7';
                highlight.style.borderColor = '#f59e0b';
            }
        });
    }
    
    addCurrentHighlight() {
        if (this.currentIndex >= 0 && this.currentIndex < this.highlights.length) {
            const highlight = this.highlights[this.currentIndex];
            highlight.classList.add('current');
            if (highlight.style) {
                highlight.style.backgroundColor = '#fbbf24';
                highlight.style.borderColor = '#d97706';
            }
        }
    }
    
    scrollToMatch() {
        if (this.currentIndex >= 0 && this.currentIndex < this.matches.length) {
            const match = this.matches[this.currentIndex];
            const element = match.type === 'text' ? match.node.parentNode : match.node;
            
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }
    
    clearHighlights() {
        this.highlights.forEach(highlight => {
            if (highlight.parentNode) {
                // Restore original text node
                if (highlight.dataset.findIndex !== undefined) {
                    const textContent = highlight.textContent;
                    const textNode = document.createTextNode(textContent);
                    highlight.parentNode.replaceChild(textNode, highlight);
                } else {
                    highlight.remove();
                }
            }
        });
        
        this.highlights = [];
        this.matches = [];
        this.currentIndex = -1;
        this.updateStatus();
        this.updateButtons();
    }
    
    updateStatus() {
        if (!this.status) {
            return;
        }
        
        if (this.matches.length === 0) {
            this.status.textContent = this.searchTerm ? 'No results found' : '';
        } else {
            this.status.textContent = `${this.currentIndex + 1} of ${this.matches.length} results`;
        }
    }
    
    updateButtons() {
        if (!this.prevBtn || !this.nextBtn || !this.clearBtn) {
            return;
        }
        
        const hasResults = this.matches.length > 0;
        this.prevBtn.disabled = !hasResults;
        this.nextBtn.disabled = !hasResults;
        this.clearBtn.disabled = !hasResults;
    }
}

// Initialize the fixed find tool
try {
    console.log('Creating FixedFindTool instance...');
    const fixedFindTool = new FixedFindTool();
    
    // Make it globally accessible
    window.fixedFindTool = fixedFindTool;
    console.log('FixedFindTool instance created and assigned to window.fixedFindTool');
    
    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = FixedFindTool;
    }
} catch (error) {
    console.error('Error creating FixedFindTool instance:', error);
    // Create a minimal fallback object
    window.fixedFindTool = {
        isVisible: false,
        show: function() { console.error('FixedFindTool not properly initialized'); },
        hide: function() { console.error('FixedFindTool not properly initialized'); },
        init: function() { console.error('FixedFindTool not properly initialized'); }
    };
} 