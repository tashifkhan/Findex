// Persistent Sidebar Content Script with Themes and Modern UI
(function() {
    'use strict';

    // --- Theme definitions ---
    const THEMES = {
        default: {
            name: 'Default',
            sidebar: 'background: #f5f7fa; color: #374151;',
            header: 'background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); color: white;',
            bubbleUser: 'background: #4a90e2; color: #fff;',
            bubbleAI: 'background: white; color: #374151; border: 1px solid #e5e7eb;',
            input: 'background: white; color: #374151; border: 2px solid #e2e8f0;',
            button: 'background: #4a90e2; color: #fff;',
        },
        xp: {
            name: 'Windows XP',
            sidebar: 'background: linear-gradient(to bottom, #e0e7ff, #f1f5f9); color: #111827;',
            header: 'background: #2563eb; color: #fff;',
            bubbleUser: 'background: #2563eb; color: #fff;',
            bubbleAI: 'background: #fff; color: #1e40af; border: 1px solid #2563eb;',
            input: 'background: #fff; color: #111827; border: 1.5px solid #2563eb;',
            button: 'background: #2563eb; color: #fff;',
        },
        macos: {
            name: 'macOS Classic',
            sidebar: 'background: #e5e7eb; color: #111827;',
            header: 'background: #c3c3c3; color: #111827;',
            bubbleUser: 'background: #fff; color: #111827; border: 1px solid #6e6e6e;',
            bubbleAI: 'background: #f3f4f6; color: #111827;',
            input: 'background: #fff; color: #111827; border: 1.5px solid #6e6e6e;',
            button: 'background: #6e6e6e; color: #fff;',
        },
        neobrutal: {
            name: 'Neobrutal',
            sidebar: 'background: #fde047; color: #111827;',
            header: 'background: #fde047; color: #000;',
            bubbleUser: 'background: #000; color: #fde047; border: 2px solid #000;',
            bubbleAI: 'background: #fff; color: #000; border: 2px solid #000;',
            input: 'background: #fff; color: #000; border: 2px solid #000;',
            button: 'background: #fde047; color: #000; border: 2px solid #000;',
        },
        nintendo: {
            name: 'Nintendo',
            sidebar: 'background: #ef4444; color: #fff;',
            header: 'background: #ef4444; color: #fff;',
            bubbleUser: 'background: #fff; color: #dc2626; border: 1px solid #fca5a5;',
            bubbleAI: 'background: #fee2e2; color: #991b1b; border: 1px solid #fecaca;',
            input: 'background: #fff; color: #dc2626; border: 1.5px solid #dc2626;',
            button: 'background: #dc2626; color: #fff;',
        },
        orange: {
            name: 'Orange Bright',
            sidebar: 'background: #f97316; color: #fff;',
            header: 'background: #f97316; color: #fff;',
            bubbleUser: 'background: #fff; color: #ea580c; border: 1px solid #fdba74;',
            bubbleAI: 'background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa;',
            input: 'background: #fff; color: #ea580c; border: 1.5px solid #ea580c;',
            button: 'background: #ea580c; color: #fff;',
        },
        blueLight: {
            name: 'Cute Blue Light',
            sidebar: 'background: #dbeafe; color: #1e3a8a;',
            header: 'background: #dbeafe; color: #1e3a8a;',
            bubbleUser: 'background: #3b82f6; color: #fff;',
            bubbleAI: 'background: #fff; color: #1e40af; border: 1px solid #bfdbfe;',
            input: 'background: #fff; color: #1e3a8a; border: 1.5px solid #bfdbfe;',
            button: 'background: #2563eb; color: #fff;',
        },
        blueDark: {
            name: 'Cute Blue Dark',
            sidebar: 'background: #1e3a8a; color: #dbeafe;',
            header: 'background: #1e3a8a; color: #dbeafe;',
            bubbleUser: 'background: #2563eb; color: #fff;',
            bubbleAI: 'background: #1e40af; color: #dbeafe; border: 1px solid #1e3a8a;',
            input: 'background: #1e3a8a; color: #dbeafe; border: 1.5px solid #1e40af;',
            button: 'background: #1e40af; color: #dbeafe;',
        },
    };

    // --- State ---
    let currentTheme = localStorage.getItem('findexSidebarTheme') || 'default';
    let isCollapsed = localStorage.getItem('findexSidebarCollapsed') === 'true';
    let messages = [];
    let isLoading = false;
    let lastUrl = window.location.href;

    // --- Utility functions ---
    function applyTheme(sidebar, themeKey) {
        const theme = THEMES[themeKey] || THEMES.default;
        const sidebarElement = sidebar.querySelector('.findex-sidebar') || sidebar;
        sidebarElement.style.cssText = sidebarElement.style.cssText.replace(/background:[^;]+;/, '') + theme.sidebar;
        
        const header = sidebar.querySelector('.findex-header');
        if (header) header.style.cssText = header.style.cssText.replace(/background:[^;]+;/, '') + theme.header;
        
        const input = sidebar.querySelector('.findex-input');
        if (input) input.style.cssText = input.style.cssText.replace(/background:[^;]+;|border:[^;]+;/, '') + theme.input;
        
        sidebar.querySelectorAll('.findex-bubble.user').forEach(b => {
            b.style.cssText = b.style.cssText.replace(/background:[^;]+;|color:[^;]+;/, '') + theme.bubbleUser;
        });
        sidebar.querySelectorAll('.findex-bubble.ai').forEach(b => {
            b.style.cssText = b.style.cssText.replace(/background:[^;]+;|color:[^;]+;|border:[^;]+;/, '') + theme.bubbleAI;
        });
        sidebar.querySelectorAll('.findex-send-btn').forEach(b => {
            b.style.cssText = b.style.cssText.replace(/background:[^;]+;/, '') + theme.button;
        });
    }

    function saveTheme(themeKey) {
        localStorage.setItem('findexSidebarTheme', themeKey);
    }
    function saveCollapsed(collapsed) {
        localStorage.setItem('findexSidebarCollapsed', collapsed ? 'true' : 'false');
    }

    function renderSidebar() {
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
            sidebarContent.className = 'findex-sidebar';
            sidebarContent.style.cssText = `
                width: 400px;
                height: 100vh;
                display: flex;
                flex-direction: column;
                background: #f5f7fa;
                box-sizing: border-box;
                box-shadow: -4px 0 20px rgba(0,0,0,0.1);
            `;
            sidebarContent.innerHTML = `
                <div class="findex-header" style="background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); color: white; padding: 16px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                                <path d="M14 2V8H20" stroke="white" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-weight: 600; font-size: 16px;">FindexAI</h3>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8;">your agentic companion</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="findex-settings-btn" title="Settings" style="padding: 8px; border-radius: 6px; border: none; cursor: pointer; background: rgba(255,255,255,0.1); transition: background 0.2s;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
                                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2589 9.77251 19.9896C9.5799 19.7202 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.74102 9.96512 4.01040 9.77251C4.27977 9.5799 4.48571 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"/>
                            </svg>
                        </button>
                        <button class="findex-search-btn" title="Search" style="padding: 8px; border-radius: 6px; border: none; cursor: pointer; background: rgba(255,255,255,0.1); transition: background 0.2s;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21L16.65 16.65"/>
                            </svg>
                        </button>
                        <button class="findex-refresh-btn" title="Refresh" style="padding: 8px; border-radius: 6px; border: none; cursor: pointer; background: rgba(255,255,255,0.1); transition: background 0.2s;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C9.61588 21 7.49055 20.0185 5.97992 18.4622"/>
                                <path d="M3 12L7 8L3 4"/>
                            </svg>
                        </button>
                        <button class="findex-close-btn" title="Close" style="padding: 8px; border-radius: 6px; border: none; cursor: pointer; background: rgba(255,255,255,0.1); transition: background 0.2s;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="findex-messages" style="flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 16px; background: #f5f7fa;"></div>
                <div style="padding: 20px; background: #f5f7fa; border-top: 1px solid #e2e8f0;">
                    <form id="findex-chat-form" style="display: flex; gap: 12px; align-items: center;">
                        <input id="findex-chat-input" class="findex-input" type="text" placeholder="Ask anything about the video" style="flex: 1; padding: 12px 16px; border-radius: 24px; font-size: 14px; outline: none; border: 2px solid #e2e8f0; background: white; transition: all 0.15s ease;" autocomplete="off">
                        <button type="submit" class="findex-send-btn" style="width: 48px; height: 48px; border-radius: 50%; border: none; cursor: pointer; background: #4a90e2; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M22 2L11 13"/>
                                <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            `;
            sidebarContainer.appendChild(sidebarContent);

            // --- Theme Dropdown ---
            const themeDropdownBtn = sidebarContent.querySelector('.findex-settings-btn');
            const themeDropdown = document.createElement('div');
            themeDropdown.className = 'findex-theme-list';
            themeDropdown.style.cssText = `
                display: none;
                position: absolute;
                right: 16px;
                top: 60px;
                background: #fff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                z-index: 1000;
                min-width: 180px;
                padding: 8px;
            `;
            sidebarContent.appendChild(themeDropdown);
            
            themeDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                themeDropdown.style.display = themeDropdown.style.display === 'block' ? 'none' : 'block';
                if (themeDropdown.style.display === 'block') {
                    themeDropdown.innerHTML = Object.entries(THEMES).map(([key, theme]) =>
                        `<button data-theme="${key}" style="display: block; width: 100%; text-align: left; padding: 10px 14px; border: none; background: ${currentTheme === key ? '#4a90e2' : 'none'}; color: ${currentTheme === key ? '#fff' : '#333'}; cursor: pointer; font-size: 14px; border-radius: 8px; margin-bottom: 4px; transition: all 0.2s;">${theme.name}</button>`
                    ).join('');
                    themeDropdown.querySelectorAll('button').forEach(btn => {
                        btn.onclick = (ev) => {
                            const themeKey = btn.getAttribute('data-theme');
                            currentTheme = themeKey;
                            saveTheme(themeKey);
                            renderSidebar();
                        };
                    });
                }
            });
            document.addEventListener('click', (e) => {
                if (!themeDropdown.contains(e.target) && e.target !== themeDropdownBtn) {
                    themeDropdown.style.display = 'none';
                }
            });

            // --- Close Sidebar (X) ---
            sidebarContent.querySelector('.findex-close-btn').onclick = () => {
                isCollapsed = true;
                saveCollapsed(isCollapsed);
                renderSidebar();
            };

            // --- Copy URL ---
            sidebarContent.querySelectorAll('.findex-copy-btn').forEach(btn => {
                btn.onclick = async () => {
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6L9 17L4 12"/></svg>`;
                        setTimeout(() => { 
                            btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4M16 4C16 5.10457 15.1046 6 14 6H10C8.89543 6 8 5.10457 8 4"/></svg>`; 
                        }, 1000);
                    } catch (err) {
                        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
                        setTimeout(() => { 
                            btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4M16 4C16 5.10457 15.1046 6 14 6H10C8.89543 6 8 5.10457 8 4"/></svg>`; 
                        }, 1000);
                    }
                };
            });

            // --- Chat ---
            const messagesContainer = sidebarContent.querySelector('#findex-messages');
            function renderMessages() {
                messagesContainer.innerHTML = '';
                if (messages.length === 0) {
                    messagesContainer.innerHTML = `
                        <div style="text-align: center; margin-top: 60px; opacity: 0.75;">
                            <div style="margin: 0 auto 24px auto; opacity: 0.3;">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="#9ca3af">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                                    <path d="M2 17L12 22L22 17"/>
                                    <path d="M2 12L12 17L22 12"/>
                                </svg>
                            </div>
                            <h3 style="margin: 0 0 8px 0; font-weight: 600; font-size: 18px; color: #374151;">Ask anything about the video</h3>
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #6b7280;">Ask me anything.</p>
                            <div style="margin-top: 24px; text-align: left; padding: 16px; border-radius: 12px; background: white; font-size: 14px; border: 1px solid #e5e7eb;">
                                <p style="margin: 0 0 12px 0; font-weight: 500; color: #374151;">Try asking:</p>
                                <div style="margin: 0; color: #6b7280; line-height: 1.5;">
                                    <div style="margin-bottom: 6px;">"What is the video about?"</div>
                                    <div style="margin-bottom: 6px;">"What is the website all about?"</div>
                                    <div style="margin-bottom: 6px;">"How to do ..."</div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    messages.forEach(msg => {
                        const msgDiv = document.createElement('div');
                        msgDiv.className = 'findex-bubble ' + (msg.type === 'user' ? 'user' : 'ai');
                        msgDiv.style.cssText = `
                            margin: ${msg.type === 'user' ? '0 0 0 auto' : '0 auto 0 0'};
                            max-width: 85%;
                            padding: 12px 16px;
                            border-radius: 18px;
                            font-size: 14px;
                            margin-bottom: 12px;
                            line-height: 1.4;
                            ${msg.type === 'user' ? 
                                'background: #4a90e2; color: white;' : 
                                'background: white; color: #374151; border: 1px solid #e5e7eb;'
                            }
                        `;
                        msgDiv.textContent = msg.content;
                        messagesContainer.appendChild(msgDiv);
                    });
                    if (isLoading) {
                        const loadingDiv = document.createElement('div');
                        loadingDiv.className = 'findex-bubble ai';
                        loadingDiv.style.cssText = `
                            margin: 0 auto 0 0;
                            max-width: 85%;
                            padding: 12px 16px;
                            border-radius: 18px;
                            font-size: 14px;
                            margin-bottom: 12px;
                            background: white;
                            color: #374151;
                            border: 1px solid #e5e7eb;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        `;
                        loadingDiv.innerHTML = `
                            <span style="color: #6b7280; font-size: 12px;">Thinking...</span>
                            <div style="display: flex; gap: 2px;">
                                <div style="width: 4px; height: 4px; background: #6b7280; border-radius: 50%; animation: bounce 0.5s infinite;"></div>
                                <div style="width: 4px; height: 4px; background: #6b7280; border-radius: 50%; animation: bounce 0.5s 0.1s infinite;"></div>
                                <div style="width: 4px; height: 4px; background: #6b7280; border-radius: 50%; animation: bounce 0.5s 0.2s infinite;"></div>
                            </div>
                        `;
                        messagesContainer.appendChild(loadingDiv);
                    }
                }
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            renderMessages();

            // Chat form
            const chatForm = sidebarContent.querySelector('#findex-chat-form');
            const chatInput = sidebarContent.querySelector('#findex-chat-input');
            chatForm.onsubmit = (e) => {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message && !isLoading) {
                    messages.push({ type: 'user', content: message });
                    chatInput.value = '';
                    isLoading = true;
                    renderMessages();
                    setTimeout(() => {
                        messages.push({ type: 'ai', content: `This is a demo response to: "${message}". In a real implementation, this would connect to your AI backend.` });
                        isLoading = false;
                        renderMessages();
                    }, 1000);
                }
            };

            // Input focus effects
            chatInput.addEventListener('focus', () => {
                chatInput.style.borderColor = '#4a90e2';
                chatInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
            });
            chatInput.addEventListener('blur', () => {
                chatInput.style.borderColor = '#e2e8f0';
                chatInput.style.boxShadow = 'none';
            });

            // --- Apply theme ---
            applyTheme(sidebarContent, currentTheme);
        }
        document.body.appendChild(sidebarContainer);
    }

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'injectPersistentSidebar') {
            renderSidebar();
            sendResponse({ success: true });
        }
    });

    // Add keyframes for loading dots and button hover effects
    if (!document.getElementById('findex-sidebar-style')) {
        const style = document.createElement('style');
        style.id = 'findex-sidebar-style';
        style.textContent = `
            @keyframes bounce { 
                0%, 100% { transform: translateY(0); } 
                50% { transform: translateY(-4px); } 
            }
            .findex-settings-btn:hover, .findex-search-btn:hover, .findex-refresh-btn:hover, .findex-close-btn:hover {
                background: rgba(255,255,255,0.2) !important;
            }
            .findex-send-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
            }
            .findex-floating-btn:hover {
                transform: translateY(-50%) scale(1.1);
                box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
            }
        `;
        document.head.appendChild(style);
    }

    // For dev: expose renderSidebar
    window.findexRenderSidebar = renderSidebar;

    console.log('Findex sidebar content script loaded');
})(); 