// Fixed Find Tool Injector - Content Script
// This script injects the fixed find tool into any webpage

(function () {
    'use strict';

    let toolReady = false;

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
            return;
        }

        const button = document.createElement('div');
        button.id = 'fixed-find-floating-button';
        button.innerHTML = '🔍';
        button.title = 'Fixed Find Tool (Ctrl+Shift+F)';
        button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            background: #3b82f6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 9999;
            font-size: 18px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
            opacity: 0.7;
        `;

        button.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.opacity = '0.7';
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', () => {
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

        document.body.appendChild(button);

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
    }

    // Wait for the page to load before adding the floating button
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addFloatingButton);
    } else {
        addFloatingButton();
    }

})(); 