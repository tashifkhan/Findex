// Fixed Find Tool Injector - Content Script
// This script injects the fixed find tool into any webpage

(function () {
    'use strict';

    let toolReady = false;
    let isRetroTheme = false; // Track theme state
    
    // Theme management
    const themes = {
        default: {
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            shadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            fontFamily: 'inherit'
        },
        retro: {
            background: '#f7d51d',
            color: '#222',
            border: '3px solid #222',
            shadow: '0 4px 16px #0008, 0 0 0 2px #f7d51d inset',
            fontFamily: "'Press Start 2P', 'VT323', 'Courier New', Courier, monospace"
        }
    };
    
    // Function to toggle theme
    function toggleTheme() {
        isRetroTheme = !isRetroTheme;
        updateAllButtonThemes();
        
        // Save theme preference
        if (chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ 'searchButtonTheme': isRetroTheme ? 'retro' : 'default' });
        }
        
        console.log('Theme toggled to:', isRetroTheme ? 'retro' : 'default');
    }
    
    // Function to update all button themes
    function updateAllButtonThemes() {
        const theme = isRetroTheme ? themes.retro : themes.default;
        
        // Update fixed find button
        const fixedFindButton = document.getElementById('fixed-find-floating-button');
        if (fixedFindButton) {
            applyThemeToButton(fixedFindButton, theme);
        }
        
        // Update page search button
        const pageSearchButton = document.getElementById('page-search-floating-button');
        if (pageSearchButton) {
            applyThemeToButton(pageSearchButton, theme);
        }
    }
    
    // Function to apply theme to a button
    function applyThemeToButton(button, theme) {
        button.style.background = theme.background;
        button.style.color = theme.color;
        button.style.border = theme.border;
        button.style.boxShadow = theme.shadow;
        button.style.fontFamily = theme.fontFamily;
        
        if (isRetroTheme) {
            button.style.textShadow = '1px 1px 0 #fff, 2px 2px 0 #f7d51d';
            button.style.letterSpacing = '0.5px';
        } else {
            button.style.textShadow = 'none';
            button.style.letterSpacing = 'normal';
        }
    }

    // Inject the fixed find tool script
    function injectFixedFindTool() {
        if (document.querySelector('script[src*="fixed-find-tool.js"]')) {
            console.log('Fixed Find Tool script already injected');
            return;
        }

        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('fixed-find-tool.js');
        script.onload = function () {
            // Script loaded successfully
            console.log('Fixed Find Tool script loaded successfully');

            // Wait a bit for the tool to initialize
            setTimeout(() => {
                // Send a message to check if the tool is ready
                window.postMessage({ type: 'FIXED_FIND_CHECK_READY' }, '*');
            }, 200);
        };
        script.onerror = function () {
            console.error('Failed to load Fixed Find Tool script');
        };
        (document.head || document.documentElement).appendChild(script);
    }

    // Listen for messages from the page script
    window.addEventListener('message', function (event) {
        if (event.source !== window) return;

        if (event.data.type === 'FIXED_FIND_READY') {
            console.log('Fixed Find Tool is ready');
            toolReady = true;
        } else if (event.data.type === 'FIXED_FIND_NOT_READY') {
            console.log('Fixed Find Tool is not ready');
            toolReady = false;
        }
    });

    // Inject the script
    injectFixedFindTool();

    // Listen for messages from the extension
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'toggleFixedFind') {
            if (toolReady) {
                // Send message to page script to toggle the tool
                window.postMessage({ type: 'FIXED_FIND_TOGGLE' }, '*');
                sendResponse({ success: true });
            } else {
                // Tool not ready yet, try to inject it
                console.log('Fixed Find Tool not ready, attempting to inject...');
                injectFixedFindTool();

                // Wait a bit and try again
                setTimeout(() => {
                    window.postMessage({ type: 'FIXED_FIND_TOGGLE' }, '*');
                    sendResponse({ success: true });
                }, 300);
            }
            return true; // Keep the message channel open for async response
        }
    });

    // Add keyboard shortcut listener for Ctrl+Shift+F
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            e.stopPropagation();
            
            if (toolReady) {
                window.postMessage({ type: 'FIXED_FIND_TOGGLE' }, '*');
            } else {
                console.log('Fixed Find Tool not ready, injecting...');
                injectFixedFindTool();
                setTimeout(() => {
                    window.postMessage({ type: 'FIXED_FIND_TOGGLE' }, '*');
                }, 300);
            }
        }
    });

    // Add a small floating button to show the tool is available
    function addFloatingButton() {
        // Check if button already exists
        if (document.getElementById('fixed-find-floating-button')) {
            console.log('Floating button already exists');
            return;
        }

        console.log('Creating floating button...');

        const button = document.createElement('div');
        button.id = 'fixed-find-floating-button';
        button.innerHTML = '🔍';
        button.title = 'Fixed Find Tool (Ctrl+Shift+F) - Right-click to toggle theme';
        button.style.cssText = `
            position: fixed !important;
            top: 10px !important;
            right: 10px !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            z-index: 999999 !important;
            font-size: 18px !important;
            transition: all 0.2s ease !important;
            opacity: 0.7 !important;
            pointer-events: auto !important;
        `;
        
        // Apply current theme
        const currentTheme = isRetroTheme ? themes.retro : themes.default;
        applyThemeToButton(button, currentTheme);

        button.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.opacity = '0.7';
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Floating button clicked');
            
            if (toolReady) {
                window.postMessage({ type: 'FIXED_FIND_TOGGLE' }, '*');
            } else {
                // Tool not ready, try to inject and show
                console.log('Fixed Find Tool not ready, injecting...');
                injectFixedFindTool();
                setTimeout(() => {
                    window.postMessage({ type: 'FIXED_FIND_TOGGLE' }, '*');
                }, 300);
            }
        });
        
        // Right-click to toggle theme
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });

        // Ensure the button is added to the body
        if (document.body) {
            document.body.appendChild(button);
            console.log('Floating button added to page');
        } else {
            console.log('Document body not ready, waiting...');
            // Wait for body to be available
            setTimeout(addFloatingButton, 100);
            return;
        }

        // Hide button when find tool is visible
        const observer = new MutationObserver(() => {
            const toolbar = document.getElementById('fixedFindToolbar');
            if (toolbar && toolbar.classList.contains('show')) {
                button.style.display = 'none';
            } else {
                button.style.display = 'flex';
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

            // Force show the button initially
    setTimeout(() => {
        if (button.style.display === 'none') {
            button.style.display = 'flex';
        }
    }, 1000);
    
    // Expose function to manually show the button (for debugging)
    window.showFixedFindButton = () => {
        if (button && button.style.display === 'none') {
            button.style.display = 'flex';
            console.log('Fixed find button manually shown');
        } else {
            console.log('Fixed find button already visible or not found');
        }
    };
    }

    // Wait for the page to load before adding the floating button
    function initializeFloatingButton() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addFloatingButton);
        } else {
            addFloatingButton();
        }
        
        // Also try to add the button after a short delay to ensure it appears
        setTimeout(addFloatingButton, 500);
        setTimeout(addFloatingButton, 1000);
        setTimeout(addFloatingButton, 2000);
    }
    
    // Initialize immediately
    initializeFloatingButton();
    
    // Also listen for page visibility changes to ensure button appears when tab becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(addFloatingButton, 100);
        }
    });
    
    // Global function to show all search buttons
    window.showAllSearchButtons = () => {
        console.log('Showing all search buttons...');
        addFloatingButton();
        if (window.pageSearch && window.pageSearch.addPageSearchFloatingButton) {
            window.pageSearch.addPageSearchFloatingButton();
        }
        if (window.showFixedFindButton) window.showFixedFindButton();
        if (window.showPageSearchButton) window.showPageSearchButton();
    };
    
    // Expose theme system globally
    window.isRetroTheme = isRetroTheme;
    window.toggleTheme = toggleTheme;
    window.updateAllButtonThemes = updateAllButtonThemes;
    
    // Load saved theme preference
    function loadThemePreference() {
        if (chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get(['searchButtonTheme'], (result) => {
                if (result.searchButtonTheme === 'retro') {
                    isRetroTheme = true;
                    window.isRetroTheme = true;
                    updateAllButtonThemes();
                    console.log('Loaded retro theme preference');
                }
            });
        }
    }
    
    // Load theme preference on initialization
    loadThemePreference();

})(); 