// Persistent Sidebar Content Script with Themes and Modern UI
(function() {
    'use strict';

    // --- Theme definitions ---
    const THEMES = {
        default: { name: "Default" },
        xp: { name: "Windows XP" },
        macos: { name: "macOS Classic" },
        neobrutal: { name: "Neobrutal" },
        nintendo: { name: "Nintendo" },
        orange: { name: "Orange Bright" },
        orangeDark: { name: "Orange Dark" },
        blueLight: { name: "Cute Blue Light" },
        blueDark: { name: "Cute Blue Dark" },
    };

    // --- Inject Tailwind CSS CDN ---
    function injectTailwindCSS() {
        // Check if Tailwind CSS is already loaded
        if (document.querySelector('script[src*="tailwindcss"]') || 
            document.querySelector('#findex-tailwind-css')) {
            return; // Already loaded
        }

        // Create and inject Tailwind CSS CDN script
        const tailwindScript = document.createElement('script');
        tailwindScript.id = 'findex-tailwind-css';
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        tailwindScript.async = false; // Load synchronously to ensure styles are available
        
        // Configure Tailwind to work with our classes
        tailwindScript.onload = () => {
            console.log('Tailwind CSS loaded for Findex sidebar');
            
            // Configure Tailwind for our specific use case
            if (window.tailwind) {
                window.tailwind.config = {
                    corePlugins: {
                        preflight: false, // Disable preflight to avoid conflicts with page styles
                    },
                    important: '#findex-persistent-sidebar-container', // Scope to our container
                    content: ['#findex-persistent-sidebar-container *'], // Only scan our content
                    theme: {
                        extend: {
                            fontFamily: {
                                'pixel': ['monospace'],
                            },
                            animation: {
                                'bounce': 'bounce 0.5s ease infinite',
                            }
                        }
                    }
                };
            }
        };
        
        // Inject into document head
        (document.head || document.documentElement).appendChild(tailwindScript);
        
        // Also add some custom CSS for animations and theme-specific styles
        const customStyles = document.createElement('style');
        customStyles.id = 'findex-custom-styles';
        customStyles.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-25%); }
            }
            
            #findex-persistent-sidebar-container .pixel-font {
                font-family: monospace;
                image-rendering: pixelated;
            }
            
            /* Ensure our sidebar styles take precedence */
            #findex-persistent-sidebar-container * {
                box-sizing: border-box;
            }
            
            /* Fallback styles in case Tailwind CSS doesn't load immediately */
            #findex-sidebar {
                background-color: white !important;
                border: 1px solid #e5e7eb !important;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            }
            
            /* Tailwind utility overrides for better compatibility */
            #findex-persistent-sidebar-container .transition-all {
                transition: all 0.15s ease !important;
            }
            
            #findex-persistent-sidebar-container .duration-300 {
                transition-duration: 0.3s !important;
            }
            
            /* Theme-specific background fallbacks */
            #findex-sidebar.bg-gray-300 { background-color: #d1d5db !important; }
            #findex-sidebar.bg-yellow-300 { background-color: #fde047 !important; }
            #findex-sidebar.bg-red-500 { background-color: #ef4444 !important; }
            #findex-sidebar.bg-orange-500 { background-color: #f97316 !important; }
            #findex-sidebar.bg-orange-900 { background-color: #7c2d12 !important; }
            #findex-sidebar.bg-blue-100 { background-color: #dbeafe !important; }
            #findex-sidebar.bg-blue-900 { background-color: #1e3a8a !important; }
            #findex-sidebar.bg-white { background-color: white !important; }
        `;
        (document.head || document.documentElement).appendChild(customStyles);
    }

    // --- State ---
    let currentTheme = localStorage.getItem('findexSidebarTheme') || 'default';
    let isCollapsed = localStorage.getItem('findexSidebarCollapsed') === 'true';
    let messages = [];
    let chatHistory = [];
    let isLoading = false;
    let lastUrl = window.location.href;
    let nextMessageId = 0;
    let videoData = null;

    // Utility functions
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatViews = (count) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count?.toLocaleString() || "0";
    };

    // Theme utility functions
    const getHeaderClasses = (theme) => {
        switch (theme) {
            case "xp":
                return "flex items-center justify-between p-1 border-b-2 border-black bg-blue-800 text-white";
            case "macos":
                return "flex items-center justify-between px-3 py-1 border-b-2 border-b-[#6e6e6e] bg-[#e0e0e0] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-none";
            case "neobrutal":
                return "flex items-center justify-between p-4 border-b-4 border-black bg-yellow-400";
            case "nintendo":
                return "flex items-center justify-between p-4 border-b border-red-700 bg-red-600 pixel-font";
            case "orange":
                return "flex items-center justify-between p-4 border-b border-orange-600 bg-orange-600";
            case "orangeDark":
                return "flex items-center justify-between p-4 border-b border-orange-800 bg-orange-800";
            case "blueLight":
                return "flex items-center justify-between p-4 border-b border-blue-200 bg-blue-200";
            case "blueDark":
                return "flex items-center justify-between p-4 border-b border-blue-800 bg-blue-800";
            default:
                return "flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50";
        }
    };

    const getInputContainerClasses = (theme) => {
        switch (theme) {
            case "xp":
                return "p-4 border-t border-blue-300 bg-blue-50";
            case "macos":
                return "p-4 border-t border-gray-300 bg-gray-50";
            case "neobrutal":
                return "p-4 border-t-4 border-black bg-yellow-200";
            case "nintendo":
                return "p-4 border-t border-red-300 bg-red-100";
            case "orange":
                return "p-4 border-t border-orange-300 bg-orange-100";
            case "orangeDark":
                return "p-4 border-t border-orange-700 bg-orange-800";
            case "blueLight":
                return "p-4 border-t border-blue-200 bg-blue-50";
            case "blueDark":
                return "p-4 border-t border-blue-700 bg-blue-800";
            default:
                return "p-4 border-t border-gray-200 bg-white";
        }
    };

    const getButtonClasses = (theme) => {
        const baseClasses = "p-2 rounded-lg transition-all duration-150";
        switch (theme) {
            case "xp":
                return `p-1 rounded-none bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black hover:bg-gray-400 active:border-t-black active:border-l-black active:border-r-gray-100 active:border-b-gray-100`;
            case "macos":
                return "px-2 py-1 rounded-none border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] bg-[#e0e0e0] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-none hover:bg-[#d0d0d0] active:border-t-[#6e6e6e] active:border-l-[#6e6e6e] active:border-b-white active:border-r-white";
            case "neobrutal":
                return `${baseClasses} hover:bg-yellow-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]`;
            case "nintendo":
                return `${baseClasses} hover:bg-red-400 border border-red-300 pixel-font text-xs`;
            case "orange":
                return `${baseClasses} hover:bg-orange-400 border border-orange-300`;
            case "orangeDark":
                return `${baseClasses} hover:bg-orange-800 border border-orange-700`;
            case "blueLight":
                return `${baseClasses} hover:bg-blue-200 border border-blue-300`;
            case "blueDark":
                return `${baseClasses} hover:bg-blue-800 border border-blue-700`;
            default:
                return `${baseClasses} hover:bg-blue-100`;
        }
    };

    const getSidebarBaseClasses = (theme) => {
        const base = "fixed right-0 top-0 h-full z-[2147483647] flex flex-col transition-all duration-300";
        switch (theme) {
            case "xp":
                return `${base} bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black text-black shadow-2xl`;
            case "macos":
                return `${base} bg-[#c3c3c3] border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]`;
            case "neobrutal":
                return `${base} bg-yellow-300 border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`;
            case "nintendo":
                return `${base} bg-red-500 border-red-700 text-white pixel-font`;
            case "orange":
                return `${base} bg-orange-500 border-orange-600 text-white`;
            case "orangeDark":
                return `${base} bg-orange-900 border-orange-800 text-orange-100`;
            case "blueLight":
                return `${base} bg-blue-100 border-blue-200 text-blue-900`;
            case "blueDark":
                return `${base} bg-blue-900 border-blue-800 text-blue-100`;
            default:
                return `${base} bg-white border-gray-200 text-gray-900 shadow-2xl`;
        }
    };

    function saveTheme(themeKey) {
        localStorage.setItem('findexSidebarTheme', themeKey);
    }
    function saveCollapsed(collapsed) {
        localStorage.setItem('findexSidebarCollapsed', collapsed ? 'true' : 'false');
    }

    function renderSidebar() {
        // Inject Tailwind CSS first
        injectTailwindCSS();
        
        // Print the current URL in the console
        console.log('Sidebar loaded on URL:', window.location.href);
        // Remove old sidebar if exists
        const old = document.getElementById('findex-persistent-sidebar-container');
        if (old) old.remove();

        // Container
        const sidebarContainer = document.createElement('div');
        sidebarContainer.id = 'findex-persistent-sidebar-container';
        sidebarContainer.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            width: ${isCollapsed ? '0px' : '400px'} !important;
            height: 100vh !important;
            z-index: 2147483647 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            transition: width 0.3s cubic-bezier(.4,0,.2,1);
            background: none;
            display: flex;
            flex-direction: row;
            overflow: hidden;
        `;

        // Floating minimize button (always visible)
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'findex-floating-btn';
        floatingBtn.title = isCollapsed ? 'Open FindexAI' : 'Minimize FindexAI';
        floatingBtn.style.cssText = `
            position: fixed;
            top: 50%;
            right: ${isCollapsed ? '16px' : '416px'};
            width: 48px;
            height: 48px;
            background: #4a90e2;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 2147483648;
            transition: all 0.3s cubic-bezier(.4,0,.2,1);
            transform: translateY(-50%);
            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        floatingBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
        `;
        floatingBtn.onclick = () => {
            isCollapsed = !isCollapsed;
            saveCollapsed(isCollapsed);
            renderSidebar();
        };
        document.body.appendChild(floatingBtn);

        // Sidebar HTML (only render if not collapsed)
        if (!isCollapsed) {
            const sidebarContent = document.createElement('div');
            sidebarContent.id = 'findex-sidebar';
            sidebarContent.className = getSidebarBaseClasses(currentTheme);
            sidebarContent.style.cssText = `
                width: 400px;
                height: 100vh;
                display: flex;
                flex-direction: column;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: ${currentTheme === 'xp' ? '#d1d5db' : 
                                  currentTheme === 'macos' ? '#c3c3c3' : 
                                  currentTheme === 'neobrutal' ? '#fde047' : 
                                  currentTheme === 'nintendo' ? '#ef4444' : 
                                  currentTheme === 'orange' ? '#f97316' : 
                                  currentTheme === 'orangeDark' ? '#7c2d12' : 
                                  currentTheme === 'blueLight' ? '#dbeafe' : 
                                  currentTheme === 'blueDark' ? '#1e3a8a' : 
                                  'white'} !important;
                border: ${currentTheme === 'xp' ? '2px solid #374151' : 
                         currentTheme === 'macos' ? '2px solid #6e6e6e' : 
                         currentTheme === 'neobrutal' ? '4px solid black' : 
                         currentTheme === 'nintendo' ? '1px solid #b91c1c' : 
                         currentTheme === 'orange' ? '1px solid #ea580c' : 
                         currentTheme === 'orangeDark' ? '1px solid #9a3412' : 
                         currentTheme === 'blueLight' ? '1px solid #3b82f6' : 
                         currentTheme === 'blueDark' ? '1px solid #1e40af' : 
                         '1px solid #e5e7eb'} !important;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
            `;
            
            // Apply theme-specific font styles
            if (currentTheme === "nintendo") {
                sidebarContent.style.fontFamily = "monospace";
                sidebarContent.style.imageRendering = "pixelated";
            } else if (currentTheme === "xp") {
                sidebarContent.style.fontFamily = 'Tahoma, "MS Sans Serif", sans-serif';
            } else if (currentTheme === "macos") {
                sidebarContent.style.fontFamily = "'Segoe UI', system-ui, sans-serif";
            }
            
            sidebarContent.innerHTML = `
                <!-- Header -->
                <div id="findex-header" class="${getHeaderClasses(currentTheme)}">
                    <div id="findex-header-content" style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 32px; height: 32px; background: ${currentTheme === 'default' ? '#3b82f6' : currentTheme === 'neobrutal' ? '#000' : currentTheme === 'nintendo' ? '#fff' : currentTheme === 'orange' || currentTheme === 'orangeDark' ? '#ea580c' : currentTheme === 'blueLight' ? '#2563eb' : currentTheme === 'blueDark' ? '#1e40af' : currentTheme === 'xp' ? '#1e40af' : currentTheme === 'macos' ? '#6e6e6e' : '#3b82f6'}; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; display: flex; align-items: center; justify-content: center;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="${currentTheme === 'nintendo' ? '#dc2626' : 'white'}">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                                <path d="M2 17L12 22L22 17"/>
                                <path d="M2 12L12 17L22 12"/>
                            </svg>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-weight: 600; font-size: 16px; color: ${currentTheme === 'xp' ? 'black' : 'inherit'};">FindexAl</h3>
                            <p id="findex-status-text" style="margin: 0; font-size: 12px; opacity: 0.75; color: ${currentTheme === 'xp' ? 'black' : 'inherit'};">Ready to help</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <!-- Theme Dropdown Toggle Button -->
                        <div style="position: relative;" id="findex-theme-dropdown-container">
                            <button id="findex-theme-button" class="${getButtonClasses(currentTheme)}" title="Change theme">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15V9Z"/>
                                </svg>
                            </button>
                            <div id="findex-theme-dropdown" style="display: none; position: absolute; right: 0; top: 100%; margin-top: 8px; width: 12rem; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); z-index: 50; background: white; overflow: hidden; ${currentTheme === 'neobrutal' ? 'border: 2px solid black; box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1); background: #fde047;' : currentTheme === 'xp' ? 'border-radius: 0; border: 2px solid; border-top-color: #f3f4f6; border-left-color: #f3f4f6; border-right-color: black; border-bottom-color: black; background: #d1d5db;' : currentTheme === 'macos' ? 'border-radius: 0; border: 2px solid; border-top-color: white; border-left-color: white; border-bottom-color: #6e6e6e; border-right-color: #6e6e6e; background: #e0e0e0;' : currentTheme === 'nintendo' ? 'background: #fee2e2; border: 1px solid #fca5a5;' : currentTheme === 'orange' ? 'background: #ffedd5; border: 1px solid #fdba74;' : currentTheme === 'orangeDark' ? 'background: #9a3412; border: 1px solid #7c2d12;' : currentTheme === 'blueLight' ? 'background: #dbeafe; border: 1px solid #bfdbfe;' : currentTheme === 'blueDark' ? 'background: #1e40af; border: 1px solid #1e3a8a;' : 'background: white; border: 1px solid #e5e7eb;'}">
                                <div style="padding: 8px; display: flex; flex-direction: column; gap: 4px;">
                                    <!-- Theme options will be populated by JavaScript -->
                                </div>
                            </div>
                        </div>

                        <!-- Search Button -->
                        <button id="findex-search-button" class="${getButtonClasses(currentTheme)}" title="Search in transcript (Ctrl+F)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>

                        <!-- Minimize Button -->
                        <button id="findex-minimize-button" class="${getButtonClasses(currentTheme)}" title="Minimize sidebar">
                            <div style="width: 16px; height: 16px; border: 2px solid currentColor; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '4px'}; transition: transform 0.2s;"></div>
                        </button>

                        <!-- Close Sidebar Button -->
                        <button id="findex-close-button" class="${getButtonClasses(currentTheme)}" title="Close sidebar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Video Info -->
                <div id="findex-video-info" style="display: none; padding: 16px; ${currentTheme === 'xp' ? 'background: #f1f5f9; border-bottom: 1px solid #2563eb;' : currentTheme === 'macos' ? 'background: #f3f4f6; border-bottom: 1px solid #6e6e6e;' : currentTheme === 'neobrutal' ? 'background: #fef3c7; border-bottom: 4px solid black;' : currentTheme === 'nintendo' ? 'background: #fee2e2; border-bottom: 1px solid #dc2626;' : currentTheme === 'orange' ? 'background: #ffedd5; border-bottom: 1px solid #ea580c;' : currentTheme === 'orangeDark' ? 'background: #7c2d12; border-bottom: 1px solid #9a3412;' : currentTheme === 'blueLight' ? 'background: #dbeafe; border-bottom: 1px solid #2563eb;' : currentTheme === 'blueDark' ? 'background: #1e3a8a; border-bottom: 1px solid #1e40af;' : 'background: #f9fafb; border-bottom: 1px solid #e5e7eb;'}">
                    <h4 id="findex-video-title" style="margin: 0 0 8px 0; font-weight: 500; font-size: 14px; line-height: 1.4;"></h4>
                    <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; opacity: 0.75;">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C8.13401 14 1 15.9317 1 19.8V22H23V19.8C23 15.9317 15.866 14 12 14Z"/>
                            </svg>
                            <span id="findex-video-uploader"></span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span id="findex-video-duration"></span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8S1 12 1 12Z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <span id="findex-video-views"></span>
                        </div>
                    </div>
                    <div id="findex-transcript-badge" style="display: none; margin-top: 8px; font-size: 12px; padding: 4px 8px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '4px'}; ${currentTheme === 'neobrutal' ? 'color: black; background: #22c55e; border: 1px solid black;' : 'color: #059669; background: #d1fae5;'}">
                        ✓ Transcript available (<span id="findex-transcript-length">0</span> chars)
                    </div>
                </div>
                
                <!-- Messages -->
                <div id="findex-messages" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px;">
                </div>
                
                <!-- Input -->
                <div id="findex-input-container" class="${getInputContainerClasses(currentTheme)}">
                    <form id="findex-chat-form" style="display: flex; gap: 8px;">
                        <input type="text" id="findex-chat-input" placeholder="Ask about anything..." autocomplete="off" style="flex: 1; padding: 8px 12px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; outline: none; transition: all 0.15s ease; font-size: 14px; ${currentTheme === 'xp' ? 'background: white; border: 2px solid; border-top-color: black; border-left-color: black; border-right-color: white; border-bottom-color: white; color: black;' : currentTheme === 'macos' ? 'background: white; border: 2px solid; border-top-color: #6e6e6e; border-left-color: #6e6e6e; border-right-color: white; border-bottom-color: white; color: black;' : currentTheme === 'neobrutal' ? 'background: white; border: 2px solid black; color: black; box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);' : currentTheme === 'nintendo' ? 'background: white; border: 1px solid #dc2626; color: #dc2626;' : currentTheme === 'orange' ? 'background: white; border: 1px solid #ea580c; color: #ea580c;' : currentTheme === 'orangeDark' ? 'background: #7c2d12; border: 1px solid #9a3412; color: #fed7aa;' : currentTheme === 'blueLight' ? 'background: white; border: 1px solid #2563eb; color: #1e3a8a;' : currentTheme === 'blueDark' ? 'background: #1e3a8a; border: 1px solid #1e40af; color: #dbeafe;' : 'background: white; border: 1px solid #d1d5db; color: #374151;'}" disabled>
                        <button type="submit" style="padding: 8px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s ease; ${currentTheme === 'xp' ? 'background: #2563eb; color: white; border: 2px solid; border-top-color: #f3f4f6; border-left-color: #f3f4f6; border-right-color: black; border-bottom-color: black;' : currentTheme === 'macos' ? 'background: #e0e0e0; color: black; border: 2px solid; border-top-color: white; border-left-color: white; border-bottom-color: #6e6e6e; border-right-color: #6e6e6e;' : currentTheme === 'neobrutal' ? 'background: black; color: #fde047; border: 2px solid black; box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);' : currentTheme === 'nintendo' ? 'background: #dc2626; color: white; border: 1px solid #b91c1c;' : currentTheme === 'orange' ? 'background: #ea580c; color: white; border: 1px solid #c2410c;' : currentTheme === 'orangeDark' ? 'background: #9a3412; color: #fed7aa; border: 1px solid #7c2d12;' : currentTheme === 'blueLight' ? 'background: #2563eb; color: white; border: 1px solid #1d4ed8;' : currentTheme === 'blueDark' ? 'background: #1e40af; color: #dbeafe; border: 1px solid #1e3a8a;' : 'background: #3b82f6; color: white; border: 1px solid #2563eb;'}" disabled>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 2L11 13"/>
                                <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            `;
            sidebarContainer.appendChild(sidebarContent);

            // Get DOM elements
            const themeButton = sidebarContent.querySelector('#findex-theme-button');
            const themeDropdown = sidebarContent.querySelector('#findex-theme-dropdown');
            const themeDropdownContainer = sidebarContent.querySelector('#findex-theme-dropdown-container');
            const minimizeButton = sidebarContent.querySelector('#findex-minimize-button');
            const closeButton = sidebarContent.querySelector('#findex-close-button');
            const searchButton = sidebarContent.querySelector('#findex-search-button');
            const messagesContainer = sidebarContent.querySelector('#findex-messages');
            const chatForm = sidebarContent.querySelector('#findex-chat-form');
            const chatInput = sidebarContent.querySelector('#findex-chat-input');
            const sendButton = chatForm.querySelector('button[type="submit"]');
            const videoInfo = sidebarContent.querySelector('#findex-video-info');
            const videoTitle = sidebarContent.querySelector('#findex-video-title');
            const videoUploader = sidebarContent.querySelector('#findex-video-uploader');
            const videoDuration = sidebarContent.querySelector('#findex-video-duration');
            const videoViews = sidebarContent.querySelector('#findex-video-views');
            const transcriptBadge = sidebarContent.querySelector('#findex-transcript-badge');
            const transcriptLength = sidebarContent.querySelector('#findex-transcript-length');
            const statusText = sidebarContent.querySelector('#findex-status-text');

            // Theme dropdown functionality
            const populateThemeDropdown = () => {
                const themeContent = themeDropdown.querySelector('div');
                if (!themeContent) return;
                themeContent.innerHTML = '';
                Object.entries(THEMES).forEach(([key, theme]) => {
                    const button = document.createElement('button');
                    const isSelected = currentTheme === key;
                    button.style.cssText = `
                        width: 100%; 
                        text-align: left; 
                        padding: 8px 12px; 
                        border: none; 
                        background: ${isSelected ? (currentTheme === 'neobrutal' ? 'black' : currentTheme === 'nintendo' ? '#dc2626' : currentTheme === 'orange' ? '#ea580c' : currentTheme === 'orangeDark' ? '#9a3412' : currentTheme === 'blueLight' ? '#2563eb' : currentTheme === 'blueDark' ? '#1e40af' : currentTheme === 'xp' ? '#1e40af' : currentTheme === 'macos' ? '#6e6e6e' : '#3b82f6') : 'transparent'}; 
                        color: ${isSelected ? (currentTheme === 'neobrutal' ? '#fde047' : 'white') : 'inherit'}; 
                        cursor: pointer; 
                        font-size: 14px; 
                        border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '4px'}; 
                        transition: all 0.15s ease;
                    `;
                    button.textContent = theme.name;
                    button.onmouseover = () => {
                        if (!isSelected) {
                            button.style.backgroundColor = currentTheme === 'neobrutal' ? '#fef3c7' : currentTheme === 'nintendo' ? '#fee2e2' : currentTheme === 'orange' ? '#ffedd5' : currentTheme === 'orangeDark' ? '#7c2d12' : currentTheme === 'blueLight' ? '#dbeafe' : currentTheme === 'blueDark' ? '#1e40af' : currentTheme === 'xp' ? '#f1f5f9' : currentTheme === 'macos' ? '#f3f4f6' : '#f3f4f6';
                        }
                    };
                    button.onmouseout = () => {
                        if (!isSelected) {
                            button.style.backgroundColor = 'transparent';
                        }
                    };
                    button.onclick = () => {
                        currentTheme = key;
                        saveTheme(key);
                        renderSidebar();
                    };
                    themeContent.appendChild(button);
                });
            };

            // Theme dropdown toggle
            themeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = themeDropdown.style.display === 'block';
                themeDropdown.style.display = isVisible ? 'none' : 'block';
                if (!isVisible) {
                    populateThemeDropdown();
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!themeDropdownContainer.contains(e.target)) {
                    themeDropdown.style.display = 'none';
                }
            });

            // Minimize button
            minimizeButton.addEventListener('click', () => {
                isCollapsed = true;
                saveCollapsed(isCollapsed);
                renderSidebar();
            });

            // Close button
            closeButton.addEventListener('click', () => {
                isCollapsed = true;
                saveCollapsed(isCollapsed);
                renderSidebar();
            });

            // Search button
            searchButton.addEventListener('click', () => {
                // Open find-in-page functionality
                if (window.findInPage) {
                    window.findInPage.show();
                }
            });

            // Message rendering
            function renderMessages() {
                messagesContainer.innerHTML = '';
                
                if (messages.length === 0) {
                    // Welcome message
                    const welcomeDiv = document.createElement('div');
                    welcomeDiv.style.cssText = 'text-align: center; margin-top: 60px; opacity: 0.75;';
                    welcomeDiv.innerHTML = `
                        <div style="margin: 0 auto 24px auto; opacity: 0.3;">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.5;">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                                <path d="M2 17L12 22L22 17"/>
                                <path d="M2 12L12 17L22 12"/>
                            </svg>
                        </div>
                        <h3 style="margin: 0 0 8px 0; font-weight: 600; font-size: 18px;">Ask about anything</h3>
                        <p style="margin: 0 0 24px 0; font-size: 14px; opacity: 0.8;">I can help you understand the content, find specific topics, or answer questions about what's discussed.</p>
                        <div style="margin-top: 24px; text-align: left; padding: 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '12px'}; font-size: 14px; ${currentTheme === 'neobrutal' ? 'background: #fef3c7; border: 2px solid black;' : currentTheme === 'nintendo' ? 'background: #fee2e2; border: 1px solid #fca5a5;' : currentTheme === 'orange' ? 'background: #ffedd5; border: 1px solid #fdba74;' : currentTheme === 'orangeDark' ? 'background: #7c2d12; border: 1px solid #9a3412;' : currentTheme === 'blueLight' ? 'background: #dbeafe; border: 1px solid #bfdbfe;' : currentTheme === 'blueDark' ? 'background: #1e40af; border: 1px solid #1e3a8a;' : currentTheme === 'xp' ? 'background: #f1f5f9; border: 2px solid; border-top-color: #f3f4f6; border-left-color: #f3f4f6; border-right-color: black; border-bottom-color: black;' : currentTheme === 'macos' ? 'background: #f3f4f6; border: 2px solid; border-top-color: white; border-left-color: white; border-bottom-color: #6e6e6e; border-right-color: #6e6e6e;' : 'background: #f0f9ff; border: 1px solid #bae6fd;'}">
                            <p style="margin: 0 0 12px 0; font-weight: 500;">Try asking:</p>
                            <div style="margin: 0; line-height: 1.5; opacity: 0.8;">
                                <div style="margin-bottom: 6px;">• "What is this video/ website about?"</div>
                                <div style="margin-bottom: 6px;">• "Summarize the main points"</div>
                                <div style="margin-bottom: 6px;">• "Who what how..."</div>
                            </div>
                        </div>
                    `;
                    messagesContainer.appendChild(welcomeDiv);
                } else {
                    // Render messages
                    messages.forEach(msg => {
                        const messageDiv = document.createElement('div');
                        messageDiv.style.cssText = `display: flex; ${msg.type === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}`;
                        
                        const bubble = document.createElement('div');
                        bubble.style.cssText = `
                            max-width: 85%; 
                            padding: 12px 16px; 
                            border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '16px'}; 
                            font-size: 14px; 
                            line-height: 1.4; 
                            word-wrap: break-word;
                            ${msg.type === 'user' ? 
                                (currentTheme === 'xp' ? 'background: white; color: black; border: 2px solid; border-top-color: #f3f4f6; border-left-color: #f3f4f6; border-right-color: black; border-bottom-color: black;' :
                                currentTheme === 'macos' ? 'background: white; color: black; border: 2px solid; border-top-color: white; border-left-color: white; border-bottom-color: #6e6e6e; border-right-color: #6e6e6e;' :
                                currentTheme === 'neobrutal' ? 'background: black; color: #fde047; border: 2px solid black; box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);' :
                                currentTheme === 'nintendo' ? 'background: white; color: #dc2626; border: 1px solid #fca5a5;' :
                                currentTheme === 'orange' ? 'background: white; color: #ea580c; border: 1px solid #fdba74;' :
                                currentTheme === 'orangeDark' ? 'background: #ea580c; color: white; border: 1px solid #c2410c;' :
                                currentTheme === 'blueLight' ? 'background: #3b82f6; color: white; border: 1px solid #2563eb;' :
                                currentTheme === 'blueDark' ? 'background: #2563eb; color: white; border: 1px solid #1d4ed8;' :
                                'background: #3b82f6; color: white;') : 
                                (currentTheme === 'xp' ? 'background: white; color: black; border: 2px solid; border-top-color: #f3f4f6; border-left-color: #f3f4f6; border-right-color: black; border-bottom-color: black;' :
                                currentTheme === 'macos' ? 'background: white; color: black; border: 2px solid; border-top-color: white; border-left-color: white; border-bottom-color: #6e6e6e; border-right-color: #6e6e6e;' :
                                currentTheme === 'neobrutal' ? 'background: white; color: black; border: 2px solid black; box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);' :
                                currentTheme === 'nintendo' ? 'background: #fee2e2; color: #991b1b; border: 1px solid #fecaca;' :
                                currentTheme === 'orange' ? 'background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa;' :
                                currentTheme === 'orangeDark' ? 'background: #9a3412; color: #fed7aa; border: 1px solid #7c2d12;' :
                                currentTheme === 'blueLight' ? 'background: white; color: #1e40af; border: 1px solid #bfdbfe;' :
                                currentTheme === 'blueDark' ? 'background: #1e40af; color: #bfdbfe; border: 1px solid #1e3a8a;' :
                                'background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;')
                            }
                        `;
                        bubble.textContent = msg.content;
                        messageDiv.appendChild(bubble);
                        messagesContainer.appendChild(messageDiv);
                    });

                    if (isLoading) {
                        const loadingDiv = document.createElement('div');
                        loadingDiv.style.cssText = 'display: flex; justify-content: flex-start;';
                        loadingDiv.innerHTML = `
                            <div style="max-width: 85%; padding: 12px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '16px'}; font-size: 14px; display: flex; align-items: center; gap: 8px; ${currentTheme === 'xp' ? 'background: white; color: black; border: 2px solid; border-top-color: #f3f4f6; border-left-color: #f3f4f6; border-right-color: black; border-bottom-color: black;' : currentTheme === 'macos' ? 'background: white; color: black; border: 2px solid; border-top-color: white; border-left-color: white; border-bottom-color: #6e6e6e; border-right-color: #6e6e6e;' : currentTheme === 'neobrutal' ? 'background: white; color: black; border: 2px solid black; box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);' : currentTheme === 'nintendo' ? 'background: #fee2e2; color: #991b1b; border: 1px solid #fecaca;' : currentTheme === 'orange' ? 'background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa;' : currentTheme === 'orangeDark' ? 'background: #9a3412; color: #fed7aa; border: 1px solid #7c2d12;' : currentTheme === 'blueLight' ? 'background: white; color: #1e40af; border: 1px solid #bfdbfe;' : currentTheme === 'blueDark' ? 'background: #1e40af; color: #bfdbfe; border: 1px solid #1e3a8a;' : 'background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;'}">
                                <div style="display: flex; gap: 4px;">
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: currentColor; opacity: 0.5; animation: bounce 0.5s ease infinite;"></div>
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: currentColor; opacity: 0.5; animation: bounce 0.5s 0.1s ease infinite;"></div>
                                    <div style="width: 8px; height: 8px; border-radius: 50%; background: currentColor; opacity: 0.5; animation: bounce 0.5s 0.2s ease infinite;"></div>
                                </div>
                                <span style="opacity: 0.75; font-size: 12px;">Thinking...</span>
                            </div>
                        `;
                        messagesContainer.appendChild(loadingDiv);
                    }
                }
                
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            renderMessages();

            // Chat form handling
            chatForm.onsubmit = async (e) => {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message && !isLoading) {
                    // Add user message to messages and chatHistory
                    messages.push({ type: 'user', content: message });
                    chatHistory.push({ id: nextMessageId++, role: 'user', content: message });
                    chatInput.value = '';
                    isLoading = true;
                    sendButton.disabled = true;
                    renderMessages();

                    const isYouTubeVideo =
                        (window.location.hostname === 'www.youtube.com' || window.location.hostname === 'youtube.com') &&
                        window.location.pathname === '/watch' &&
                        !!(new URLSearchParams(window.location.search).get('v'));

                    // Helper to add bot message to both messages and chatHistory
                    function addBotMessage(content) {
                        messages.push({ type: 'ai', content });
                        chatHistory.push({ id: nextMessageId++, role: 'bot', content });
                    }

                    // Helper to add bot message to messages only (for crawller prompt)
                    function addBotMessageNoHistory(content) {
                        messages.push({ type: 'ai', content });
                    }

                    // --- YouTube video logic ---
                    if (isYouTubeVideo) {
                        try {
                            const response = await fetch('http://localhost:5454/ask', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    url: window.location.href,
                                    question: message,
                                    chat_history: chatHistory.slice(0, chatHistory.length - 1) // exclude current user message
                                })
                            });
                            if (!response.ok) throw new Error('Backend error');
                            const data = await response.json();
                            if (data.answer && data.answer.trim() === 'Data not available.') {
                                addBotMessageNoHistory('Data not available. Would you like to perform a web search to try to answer this question?');
                                isLoading = false;
                                sendButton.disabled = false;
                                renderMessages();
                                // Add Yes/No buttons
                                const currentMessagesContainer = document.querySelector('#findex-messages');
                                if (currentMessagesContainer) {
                                    const promptDiv = document.createElement('div');
                                    promptDiv.style.cssText = 'display: flex; justify-content: flex-start; margin-top: 8px;';
                                    const buttonContainer = document.createElement('div');
                                    buttonContainer.style.cssText = `max-width: 85%; padding: 12px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '16px'}; display: flex; gap: 8px; align-items: center; ${currentTheme === 'neobrutal' ? 'background: #fef3c7; border: 2px solid black;' : 'background: #f9fafb; border: 1px solid #e5e7eb;'}`;
                                    
                                    const yesBtn = document.createElement('button');
                                    yesBtn.textContent = 'Yes';
                                    yesBtn.style.cssText = `padding: 6px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; border: none; background: #3b82f6; color: white; cursor: pointer; font-size: 14px;`;
                                    
                                    const noBtn = document.createElement('button');
                                    noBtn.textContent = 'No';
                                    noBtn.style.cssText = `padding: 6px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; border: none; background: #e5e7eb; color: #374151; cursor: pointer; font-size: 14px;`;
                                    
                                    buttonContainer.appendChild(yesBtn);
                                    buttonContainer.appendChild(noBtn);
                                    promptDiv.appendChild(buttonContainer);
                                    currentMessagesContainer.appendChild(promptDiv);
                                    currentMessagesContainer.scrollTop = currentMessagesContainer.scrollHeight;
                                    
                                    yesBtn.onclick = async () => {
                                        promptDiv.remove();
                                        isLoading = true;
                                        sendButton.disabled = true;
                                        renderMessages();
                                        try {
                                            const crawllerResp = await fetch('http://localhost:5454/crawller', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    question: message,
                                                    chat_history: []
                                                })
                                            });
                                            if (!crawllerResp.ok) throw new Error('Backend error');
                                            const crawllerData = await crawllerResp.json();
                                            addBotMessage(crawllerData.answer || 'No answer received from web search.');
                                        } catch (err) {
                                            addBotMessage('Error contacting backend (web search): ' + err.message);
                                        } finally {
                                            isLoading = false;
                                            sendButton.disabled = false;
                                            renderMessages();
                                        }
                                    };
                                    noBtn.onclick = () => {
                                        promptDiv.remove();
                                        addBotMessage('Okay, not performing a web search.');
                                        renderMessages();
                                    };
                                }
                            } else {
                                addBotMessage(data.answer || 'No answer received.');
                                isLoading = false;
                                sendButton.disabled = false;
                                renderMessages();
                            }
                        } catch (err) {
                            addBotMessage('Error contacting backend: ' + err.message);
                            isLoading = false;
                            sendButton.disabled = false;
                            renderMessages();
                        }
                    } else {
                        // --- Normal website logic ---
                        try {
                            const response = await fetch('http://localhost:5454/website', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    url: window.location.href,
                                    question: message,
                                    chat_history: chatHistory.slice(0, chatHistory.length - 1) // exclude current user message
                                })
                            });
                            if (!response.ok) throw new Error('Backend error');
                            const data = await response.json();
                            if (data.answer && data.answer.trim() === 'Data not available.') {
                                addBotMessageNoHistory('Data not available. Would you like to perform a web search to try to answer this question?');
                                isLoading = false;
                                sendButton.disabled = false;
                                renderMessages();
                                // Add Yes/No buttons
                                const currentMessagesContainer = document.querySelector('#findex-messages');
                                if (currentMessagesContainer) {
                                    const promptDiv = document.createElement('div');
                                    promptDiv.style.cssText = 'display: flex; justify-content: flex-start; margin-top: 8px;';
                                    const buttonContainer = document.createElement('div');
                                    buttonContainer.style.cssText = `max-width: 85%; padding: 12px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '16px'}; display: flex; gap: 8px; align-items: center; ${currentTheme === 'neobrutal' ? 'background: #fef3c7; border: 2px solid black;' : 'background: #f9fafb; border: 1px solid #e5e7eb;'}`;
                                    
                                    const yesBtn = document.createElement('button');
                                    yesBtn.textContent = 'Yes';
                                    yesBtn.style.cssText = `padding: 6px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; border: none; background: #3b82f6; color: white; cursor: pointer; font-size: 14px;`;
                                    
                                    const noBtn = document.createElement('button');
                                    noBtn.textContent = 'No';
                                    noBtn.style.cssText = `padding: 6px 16px; border-radius: ${currentTheme === 'xp' || currentTheme === 'macos' ? '0' : '8px'}; border: none; background: #e5e7eb; color: #374151; cursor: pointer; font-size: 14px;`;
                                    
                                    buttonContainer.appendChild(yesBtn);
                                    buttonContainer.appendChild(noBtn);
                                    promptDiv.appendChild(buttonContainer);
                                    currentMessagesContainer.appendChild(promptDiv);
                                    currentMessagesContainer.scrollTop = currentMessagesContainer.scrollHeight;
                                    
                                    yesBtn.onclick = async () => {
                                        promptDiv.remove();
                                        isLoading = true;
                                        sendButton.disabled = true;
                                        renderMessages();
                                        try {
                                            const crawllerResp = await fetch('http://localhost:5454/crawller', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    question: message,
                                                    chat_history: []
                                                })
                                            });
                                            if (!crawllerResp.ok) throw new Error('Backend error');
                                            const crawllerData = await crawllerResp.json();
                                            addBotMessage(crawllerData.answer || 'No answer received from web search.');
                                        } catch (err) {
                                            addBotMessage('Error contacting backend (web search): ' + err.message);
                                        } finally {
                                            isLoading = false;
                                            sendButton.disabled = false;
                                            renderMessages();
                                        }
                                    };
                                    noBtn.onclick = () => {
                                        promptDiv.remove();
                                        addBotMessage('Okay, not performing a web search.');
                                        renderMessages();
                                    };
                                }
                            } else {
                                addBotMessage(data.answer || 'No answer received.');
                                isLoading = false;
                                sendButton.disabled = false;
                                renderMessages();
                            }
                        } catch (err) {
                            addBotMessage('Error contacting backend: ' + err.message);
                            isLoading = false;
                            sendButton.disabled = false;
                            renderMessages();
                        }
                    }
                }
            };

            // Input focus effects
            chatInput.addEventListener('focus', () => {
                if (currentTheme === 'default') {
                    chatInput.style.borderColor = '#3b82f6';
                    chatInput.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
            });
            chatInput.addEventListener('blur', () => {
                if (currentTheme === 'default') {
                    chatInput.style.borderColor = '#d1d5db';
                    chatInput.style.boxShadow = 'none';
                }
            });

            // Enable/disable input based on context
            const isYouTubeContext = window.location.hostname === 'www.youtube.com' || window.location.hostname === 'youtube.com';
            if (isYouTubeContext) {
                chatInput.disabled = false;
                chatInput.placeholder = 'Ask about anything...';
                sendButton.disabled = false;
                statusText.textContent = 'Your Agentic Comapnion';
            } else {
                chatInput.disabled = false; // Enable for demo/development
                chatInput.placeholder = 'Ask about this website...';
                sendButton.disabled = false;
                statusText.textContent = 'Your Agentic Comapnion';
            }

            // Update video info if available
            if (videoData) {
                videoInfo.style.display = 'block';
                videoTitle.textContent = videoData.title;
                videoUploader.textContent = videoData.uploader;
                if (videoData.duration > 0) {
                    videoDuration.textContent = formatDuration(videoData.duration);
                } else {
                    videoDuration.parentElement.style.display = 'none';
                }
                if (videoData.view_count > 0) {
                    videoViews.textContent = formatViews(videoData.view_count);
                } else {
                    videoViews.parentElement.style.display = 'none';
                }
                if (videoData.transcript) {
                    transcriptBadge.style.display = 'block';
                    transcriptLength.textContent = videoData.transcript.length;
                } else {
                    transcriptBadge.style.display = 'none';
                }
            }
        }
        document.body.appendChild(sidebarContainer);
    }

    // Additional helper functions for video info and theme management
    function updateVideoInfo(data) {
        if (!data) {
            if (videoData) {
                const videoInfoElement = document.querySelector('#findex-video-info');
                if (videoInfoElement) videoInfoElement.style.display = 'none';
            }
            videoData = null;
            return;
        }
        
        videoData = data;
        const videoInfoElement = document.querySelector('#findex-video-info');
        if (videoInfoElement) {
            videoInfoElement.style.display = 'block';
            
            const titleElement = document.querySelector('#findex-video-title');
            const uploaderElement = document.querySelector('#findex-video-uploader');
            const durationElement = document.querySelector('#findex-video-duration');
            const viewsElement = document.querySelector('#findex-video-views');
            const transcriptBadgeElement = document.querySelector('#findex-transcript-badge');
            const transcriptLengthElement = document.querySelector('#findex-transcript-length');
            
            if (titleElement) titleElement.textContent = data.title;
            if (uploaderElement) uploaderElement.textContent = data.uploader;
            
            if (durationElement && data.duration > 0) {
                durationElement.textContent = formatDuration(data.duration);
                durationElement.parentElement.style.display = 'flex';
            } else if (durationElement) {
                durationElement.parentElement.style.display = 'none';
            }
            
            if (viewsElement && data.view_count > 0) {
                viewsElement.textContent = formatViews(data.view_count);
                viewsElement.parentElement.style.display = 'flex';
            } else if (viewsElement) {
                viewsElement.parentElement.style.display = 'none';
            }
            
            if (transcriptBadgeElement && transcriptLengthElement) {
                if (data.transcript) {
                    transcriptBadgeElement.style.display = 'block';
                    transcriptLengthElement.textContent = data.transcript.length;
                } else {
                    transcriptBadgeElement.style.display = 'none';
                }
            }
        }
    }

    function setTheme(theme) {
        currentTheme = theme;
        saveTheme(theme);
        renderSidebar();
    }

    function addMessage(content, type = 'ai') {
        messages.push({ type, content });
        if (type === 'user') {
            chatHistory.push({ id: nextMessageId++, role: 'user', content });
        } else {
            chatHistory.push({ id: nextMessageId++, role: 'bot', content });
        }
        
        // Re-render messages if sidebar is currently visible
        const messagesContainer = document.querySelector('#findex-messages');
        if (messagesContainer) {
            const renderFunction = document.querySelector('#findex-sidebar')?.renderMessages;
            if (renderFunction) renderFunction();
        }
    }

    function setLoading(loading) {
        isLoading = loading;
        const sendButton = document.querySelector('#findex-chat-form button[type="submit"]');
        const chatInput = document.querySelector('#findex-chat-input');
        
        if (sendButton) sendButton.disabled = loading;
        if (chatInput) chatInput.disabled = loading;
        
        // Re-render messages to show/hide loading indicator
        const messagesContainer = document.querySelector('#findex-messages');
        if (messagesContainer) {
            const renderFunction = document.querySelector('#findex-sidebar')?.renderMessages;
            if (renderFunction) renderFunction();
        }
    }

    function clearMessages() {
        messages = [];
        chatHistory = [];
        const messagesContainer = document.querySelector('#findex-messages');
        if (messagesContainer) {
            const renderFunction = document.querySelector('#findex-sidebar')?.renderMessages;
            if (renderFunction) renderFunction();
        }
    }

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'injectPersistentSidebar') {
            renderSidebar();
            sendResponse({ success: true });
        }
    });

    // Listen for messages from parent window (for iframe communication)
    window.addEventListener('message', (event) => {
        const { type, data } = event.data;

        switch (type) {
            case 'setVideoData':
                updateVideoInfo(data);
                break;
            case 'addMessage':
                addMessage(data.content, data.type);
                break;
            case 'setLoading':
                setLoading(data.loading);
                break;
            case 'clear':
                clearMessages();
                updateVideoInfo(null);
                break;
            case 'setTheme':
                setTheme(data.theme);
                break;
            case 'openSearch':
                // Trigger search functionality
                const searchButton = document.querySelector('#findex-search-button');
                if (searchButton) searchButton.click();
                break;
        }
    });

    // For dev: expose useful functions
    window.findexRenderSidebar = renderSidebar;
    window.findexSetTheme = setTheme;
    window.findexAddMessage = addMessage;
    window.findexSetLoading = setLoading;
    window.findexClearMessages = clearMessages;
    window.findexUpdateVideoInfo = updateVideoInfo;

    // Initialize Tailwind CSS on script load
    injectTailwindCSS();

    console.log('Findex sidebar content script loaded');
})(); 