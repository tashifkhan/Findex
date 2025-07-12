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
}

// Utility functions
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const formatViews = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count?.toLocaleString() || "0"
}

// Helper functions to get theme-specific classes
const getHeaderClasses = (theme) => {
  switch (theme) {
    case "xp":
      return "flex items-center justify-between p-1 border-b-2 border-black bg-blue-800 text-white"
    case "macos":
      return "flex items-center justify-between px-3 py-1 border-b-2 border-b-[#6e6e6e] bg-[#e0e0e0] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-none"
    case "neobrutal":
      return "flex items-center justify-between p-4 border-b-4 border-black bg-yellow-400"
    case "nintendo":
      return "flex items-center justify-between p-4 border-b border-red-700 bg-red-600 pixel-font"
    case "orange":
      return "flex items-center justify-between p-4 border-b border-orange-600 bg-orange-600"
    case "orangeDark":
      return "flex items-center justify-between p-4 border-b border-orange-800 bg-orange-800"
    case "blueLight":
      return "flex items-center justify-between p-4 border-b border-blue-200 bg-blue-200"
    case "blueDark":
      return "flex items-center justify-between p-4 border-b border-blue-800 bg-blue-800"
    default:
      return "flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50"
  }
}

const getInputContainerClasses = (theme) => {
  switch (theme) {
    case "xp":
      return "p-4 border-t border-blue-300 bg-blue-50"
    case "macos":
      return "p-4 border-t border-gray-300 bg-gray-50"
    case "neobrutal":
      return "p-4 border-t-4 border-black bg-yellow-200"
    case "nintendo":
      return "p-4 border-t border-red-300 bg-red-100"
    case "orange":
      return "p-4 border-t border-orange-300 bg-orange-100"
    case "orangeDark":
      return "p-4 border-t border-orange-700 bg-orange-800"
    case "blueLight":
      return "p-4 border-t border-blue-200 bg-blue-50"
    case "blueDark":
      return "p-4 border-t border-blue-700 bg-blue-800"
    default:
      return "p-4 border-t border-gray-200 bg-white"
  }
}

const getButtonClasses = (theme) => {
  const baseClasses = "p-2 rounded-lg transition-all duration-150"
  switch (theme) {
    case "xp":
      return `p-1 rounded-none bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black hover:bg-gray-400 active:border-t-black active:border-l-black active:border-r-gray-100 active:border-b-gray-100`
    case "macos":
      return "px-2 py-1 rounded-none border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] bg-[#e0e0e0] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-none hover:bg-[#d0d0d0] active:border-t-[#6e6e6e] active:border-l-[#6e6e6e] active:border-b-white active:border-r-white"
    case "neobrutal":
      return `${baseClasses} hover:bg-yellow-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]`
    case "nintendo":
      return `${baseClasses} hover:bg-red-400 border border-red-300 pixel-font text-xs`
    case "orange":
      return `${baseClasses} hover:bg-orange-400 border border-orange-300`
    case "orangeDark":
      return `${baseClasses} hover:bg-orange-800 border border-orange-700`
    case "blueLight":
      return `${baseClasses} hover:bg-blue-200 border border-blue-300`
    case "blueDark":
      return `${baseClasses} hover:bg-blue-800 border border-blue-700`
    default:
      return `${baseClasses} hover:bg-blue-100`
  }
}

const getChatBubbleClasses = (theme, isUser = false) => {
  const baseClasses = "max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm"
  if (isUser) {
    switch (theme) {
      case "xp":
        return `${baseClasses} bg-white text-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black`
      case "macos":
        return "max-w-xs lg:max-w-md px-4 py-2 rounded-none bg-white text-black border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] font-['Segoe_UI',system-ui,sans-serif] shadow-none"
      case "neobrutal":
        return `${baseClasses} bg-black text-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
      case "nintendo":
        return `${baseClasses} bg-white text-red-600 border border-red-300`
      case "orange":
        return `${baseClasses} bg-white text-orange-600 border border-orange-300`
      case "orangeDark":
        return `${baseClasses} bg-orange-600 text-white border border-orange-500`
      case "blueLight":
        return `${baseClasses} bg-blue-500 text-white border border-blue-600`
      case "blueDark":
        return `${baseClasses} bg-blue-600 text-white border border-blue-500`
      default:
        return `${baseClasses} bg-blue-500 text-white`
    }
  } else {
    switch (theme) {
      case "xp":
        return `${baseClasses} bg-white text-black border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black`
      case "macos":
        return "max-w-xs lg:max-w-md px-4 py-2 rounded-none bg-white text-black border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] font-['Segoe_UI',system-ui,sans-serif] shadow-none"
      case "neobrutal":
        return `${baseClasses} bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
      case "nintendo":
        return `${baseClasses} bg-red-100 text-red-900 border border-red-200`
      case "orange":
        return `${baseClasses} bg-orange-100 text-orange-900 border border-orange-200`
      case "orangeDark":
        return `${baseClasses} bg-orange-800 text-orange-100 border border-orange-700`
      case "blueLight":
        return `${baseClasses} bg-white text-blue-900 border border-blue-200`
      case "blueDark":
        return `${baseClasses} bg-blue-800 text-blue-100 border border-blue-700`
      default:
        return `${baseClasses} bg-gray-100 text-gray-900`
    }
  }
}

const getChatInputClasses = (theme) => {
  const baseClasses =
    "flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed text-sm"
  switch (theme) {
    case "xp":
      return `${baseClasses} bg-white border-2 border-t-black border-l-black border-r-white border-b-white text-black placeholder-gray-500 rounded-none`
    case "neobrutal":
      return `${baseClasses} bg-white border-2 border-black text-black placeholder-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
    case "nintendo":
      return `${baseClasses} bg-white border border-red-300 text-red-900 placeholder-red-500`
    case "orange":
      return `${baseClasses} bg-white border border-orange-300 text-orange-900 placeholder-orange-500`
    case "orangeDark":
      return `${baseClasses} bg-orange-700 border border-orange-600 text-orange-100 placeholder-orange-300`
    case "blueLight":
      return `${baseClasses} bg-white border border-blue-300 text-blue-900 placeholder-blue-500`
    case "blueDark":
      return `${baseClasses} bg-blue-700 border border-blue-600 text-blue-100 placeholder-blue-300`
    case "macos":
      return "flex-1 px-3 py-2 rounded-none border-2 border-t-[#6e6e6e] border-l-[#6e6e6e] border-r-white border-b-white text-black placeholder-gray-500 font-['Segoe_UI',system-ui,sans-serif] shadow-none"
    default:
      return `${baseClasses} bg-white border border-gray-300 text-gray-900 placeholder-gray-500 disabled:bg-gray-100`
  }
}

const getSendButtonClasses = (theme) => {
  const baseClasses = "px-1 py-2 rounded-lg disabled:cursor-not-allowed flex items-center space-x-2"
  switch (theme) {
    case "xp":
      return `${baseClasses} p-1 rounded-none bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black hover:bg-gray-400 active:border-t-black active:border-l-black active:border-r-gray-100 active:border-b-gray-100 disabled:opacity-50`
    case "neobrutal":
      return `${baseClasses} bg-black text-yellow-300 hover:bg-gray-800 disabled:bg-gray-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150`
    case "nintendo":
      return `${baseClasses} bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 border border-red-700 pixel-font text-xs transition-all duration-150`
    case "orange":
      return `${baseClasses} bg-orange-600 text-white hover:bg-orange-700 disabled:bg-orange-300 border border-orange-700 transition-all duration-150`
    case "orangeDark":
      return `${baseClasses} bg-orange-600 text-white hover:bg-orange-500 disabled:bg-orange-800 border border-orange-500 transition-all duration-150`
    case "blueLight":
      return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 border border-blue-600 transition-all duration-150`
    case "blueDark":
      return `${baseClasses} bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-800 border border-blue-500 transition-all duration-150`
    case "macos":
      return "px-1 py-2 rounded-none border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] bg-[#e0e0e0] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-none hover:bg-[#d0d0d0] active:border-t-[#6e6e6e] active:border-l-[#6e6e6e] active:border-b-white active:border-r-white"
    default:
      return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 transition-all duration-150`
  }
}

const getWelcomeMessageClasses = (theme) => {
  switch (theme) {
    case "neobrutal":
      return "bg-yellow-200 border-2 border-black"
    case "nintendo":
      return "bg-red-100"
    case "orange":
      return "bg-orange-100"
    case "orangeDark":
      return "bg-orange-800"
    case "blueLight":
      return "bg-blue-50"
    case "blueDark":
      return "bg-blue-800"
    default:
      return "bg-blue-50"
  }
}

const getThemeDropdownClasses = (theme) => {
  const base = "absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50"
  switch (theme) {
    case "neobrutal":
      return `${base} bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
    case "nintendo":
      return `${base} bg-red-100 border-red-300`
    case "orange":
      return `${base} bg-orange-100 border-orange-300`
    case "orangeDark":
      return `${base} bg-orange-800 border-orange-700`
    case "blueLight":
      return `${base} bg-blue-50 border-blue-200`
    case "blueDark":
      return `${base} bg-blue-800 border-blue-700`
    default:
      return `${base} bg-white border-gray-200`
  }
}

const getThemeDropdownButtonClasses = (theme, isSelected) => {
  const base = "w-full text-left px-3 py-2 rounded-md transition-colors text-sm"
  if (isSelected) {
    return `${base} theme-dropdown-button selected` // Use a specific class for selected state
  }
  return `${base} theme-dropdown-button` // Use a base class for non-selected state
}

const getTranscriptBadgeClasses = (theme) => {
  switch (theme) {
    case "neobrutal":
      return "text-black bg-green-300 border border-black"
    default:
      return "text-green-600 bg-green-50"
  }
}

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const sidebar = document.getElementById("sidebar");
    const messages = document.getElementById("messages");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const themeButton = document.getElementById("themeButton");
    const themeDropdown = document.getElementById("themeDropdown");
    const themeDropdownContainer = document.getElementById("theme-dropdown-container");
    const minimizeButton = document.getElementById("minimizeButton");
    const closeButton = document.getElementById("closeButton");
    const welcomeMessage = document.getElementById("welcome-message");
    const searchButton = document.getElementById("searchButton");
    const videoInfo = document.getElementById("video-info");
    const videoTitle = document.getElementById("video-title")
    const videoUploader = document.getElementById("video-uploader")
    const videoDuration = document.getElementById("video-duration")
    const videoViews = document.getElementById("video-views")
    const transcriptBadge = document.getElementById("transcript-badge")
    const transcriptLength = document.getElementById("transcript-length")
    const statusText = document.getElementById("status-text")
    const headerContent = document.getElementById("header-content")
    const themeDropdownWrapper = document.getElementById("theme-dropdown-wrapper")
    const sendButton = chatForm.querySelector('button[type="submit"]')

    // State
    let isMinimized = false
    let currentTheme = "default"
    let messageHistory = []
    let isLoading = false
    let videoData = null

    // Development mode check
    const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    const isOnYouTube = window.location.hostname === "www.youtube.com"
    const canInteract = isOnYouTube || isDevelopment

    // Update input placeholder and status based on context
    const updateContextStatus = () => {
      if (canInteract) {
        chatInput.placeholder = isDevelopment && !isOnYouTube ? "Ask about the extension..." : "Ask about this video..."
        chatInput.disabled = false
        statusText.textContent = isOnYouTube ? "Ready to help" : "Demo mode"
      } else {
        chatInput.placeholder = "Navigate to a YouTube video first"
        chatInput.disabled = true
        statusText.textContent = "Navigate to YouTube"
      }
      // Also update send button disabled state
      sendButton.disabled = !chatInput.value.trim() || !canInteract || isLoading
    }

    // Theme Management
    const setTheme = (theme) => {
      document.body.className = `theme-${theme}`
      currentTheme = theme

      // Update UI elements based on theme
      updateUIForTheme(theme)
    }

    const updateUIForTheme = (theme) => {
      // Apply theme classes to main elements
      sidebar.className = `${getSidebarBaseClasses(theme)} ${isMinimized ? "w-16" : "w-96"}`
      document.getElementById("header").className = getHeaderClasses(theme)
      document.getElementById("input-container").className = getInputContainerClasses(theme)
      chatInput.className = getChatInputClasses(theme)
      sendButton.className = getSendButtonClasses(theme)

      // Update font and rendering for body
      document.body.style.fontFamily =
        theme === "nintendo"
          ? "monospace"
          : theme === "xp"
            ? 'Tahoma, "MS Sans Serif", sans-serif'
            : theme === "macos"
              ? "'Segoe UI', system-ui, sans-serif"
              : "inherit"
      document.body.style.imageRendering = theme === "nintendo" ? "pixelated" : "auto"

      // Update video info section if visible
      if (videoData) {
        updateVideoInfoStyle(theme)
      }

      // Update welcome message background
      const welcomeMessageDiv = welcomeMessage.querySelector("div")
      if (welcomeMessageDiv) {
        welcomeMessageDiv.className = `mt-4 space-y-2 text-xs text-left p-3 rounded-lg ${getWelcomeMessageClasses(theme)}`
      }

      // Update theme dropdown appearance
      themeDropdown.className = `${getThemeDropdownClasses(theme)} ${themeDropdown.classList.contains("show") ? "show" : ""}`
      populateThemeDropdown() // Re-populate to update selected state and button styles
    }

    const updateVideoInfoStyle = (theme) => {
      if (!videoInfo) return
      videoInfo.className = `p-4 border-b ${
        theme === "xp"
          ? "bg-blue-50 border-blue-300"
          : theme === "macos"
            ? "bg-gray-50 border-gray-300"
            : theme === "neobrutal"
              ? "bg-yellow-200 border-b-4 border-black"
              : theme === "nintendo"
                ? "bg-red-100 border-red-300"
                : theme === "orange"
                  ? "bg-orange-100 border-orange-300"
                  : theme === "orangeDark"
                    ? "bg-orange-800 border-orange-700"
                    : theme === "blueLight"
                      ? "bg-blue-50 border-blue-200"
                      : theme === "blueDark"
                        ? "bg-blue-800 border-blue-700"
                        : "bg-gray-50 border-gray-200"
      }`
      // Update transcript badge style
      transcriptBadge.className = `mt-2 text-xs px-2 py-1 rounded ${getTranscriptBadgeClasses(theme)} ${videoData && videoData.transcript ? "" : "hidden"}`
    }

    // Message handling
    const addMessage = (content, type = "assistant") => {
      // Remove welcome message if present
      if (welcomeMessage.parentNode === messages) {
        messages.removeChild(welcomeMessage)
      }

      const messageDiv = document.createElement("div")
      messageDiv.className = `flex ${type === "user" ? "justify-end" : "justify-start"}`

      const bubble = document.createElement("div")
      bubble.className = `chat-bubble ${type}`
      bubble.textContent = content

      messageDiv.appendChild(bubble)
      messages.appendChild(messageDiv)

      // Auto scroll
      messages.scrollTop = messages.scrollHeight

      // Add to history
      messageHistory.push({ content, type })
    }

    const setLoading = (loading) => {
      isLoading = loading
      sendButton.disabled = loading || !chatInput.value.trim() || !canInteract

      if (loading) {
        const loadingBubble = document.createElement("div")
        loadingBubble.id = "loading-bubble"
        loadingBubble.className = "flex justify-start"
        loadingBubble.innerHTML = `
                <div class="chat-bubble assistant">
                    <div class="flex items-center space-x-2">
                        <div class="loading-dots">
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                        </div>
                        <span class="opacity-75 text-xs">Thinking...</span>
                    </div>
                </div>
            `
        messages.appendChild(loadingBubble)
        messages.scrollTop = messages.scrollHeight
      } else {
        const loadingBubble = document.getElementById("loading-bubble")
        if (loadingBubble) {
          loadingBubble.remove()
        }
      }
    }

    // Video data handling
    const updateVideoInfo = (data) => {
      if (!data) {
        videoInfo.classList.add("hidden")
        videoData = null
        return
      }
      videoData = data
      videoInfo.classList.remove("hidden")
      videoTitle.textContent = data.title
      videoUploader.textContent = data.uploader

      if (data.duration > 0) {
        videoDuration.textContent = formatDuration(data.duration)
        videoDuration.parentElement.classList.remove("hidden")
      } else {
        videoDuration.parentElement.classList.add("hidden")
      }

      if (data.view_count > 0) {
        videoViews.textContent = formatViews(data.view_count)
        videoViews.parentElement.classList.remove("hidden")
      } else {
        videoViews.parentElement.classList.add("hidden")
      }

      if (data.transcript) {
        transcriptBadge.classList.remove("hidden")
        transcriptLength.textContent = data.transcript.length
      } else {
        transcriptBadge.classList.add("hidden")
      }
      updateVideoInfoStyle(currentTheme)
    }

    // Event Handlers
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const message = chatInput.value.trim()
      if (message && !isLoading) {
        addMessage(message, "user")
        chatInput.value = ""
        sendButton.disabled = true // Disable immediately after sending

        // Emit message event for parent window
        window.parent.postMessage(
          {
            type: "askQuestion",
            message,
          },
          "*",
        )
      }
    })

    chatInput.addEventListener("input", () => {
      sendButton.disabled = !chatInput.value.trim() || !canInteract || isLoading
    })

    minimizeButton.addEventListener("click", () => {
      isMinimized = !isMinimized
      sidebar.style.width = isMinimized ? "4rem" : "24rem"
      minimizeButton.querySelector("div").classList.toggle("rotate-45", isMinimized)

      // Hide/show elements based on minimized state
      headerContent.style.display = isMinimized ? "none" : "flex"
      themeDropdownWrapper.style.display = isMinimized ? "none" : "block"
      searchButton.style.display = isMinimized ? "none" : "block"
      videoInfo.style.display = isMinimized ? "none" : videoData ? "block" : "none" // Re-evaluate video info visibility
      messages.style.display = isMinimized ? "none" : "block"
      document.getElementById("input-container").style.display = isMinimized ? "none" : "block"

      if (!isMinimized) {
        chatInput.focus()
      }
    })

    // Theme dropdown handling - TOGGLE FUNCTIONALITY
    themeButton.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent document click from immediately closing it
      themeDropdown.classList.toggle("show")
      themeDropdown.className = `${getThemeDropdownClasses(currentTheme)} ${themeDropdown.classList.contains("show") ? "show" : ""}`
    })

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeDropdownContainer.contains(e.target)) {
            themeDropdown.classList.remove('show');
        }
    });

    // Close sidebar button functionality
    closeButton.addEventListener("click", () => {
        // First try to send message to parent
        try {
            window.parent.postMessage({ type: 'close' }, '*');
        } catch (e) {
            console.error('Error sending close message:', e);
        }
        
        // Fallback: try to close the window directly if it's a popup
        if (window.opener) {
            window.close();
        }
    })

    searchButton.addEventListener("click", () => {
      window.parent.postMessage({ type: "search" }, "*")
    })

    // Populate theme dropdown
    const populateThemeDropdown = () => {
      const themeContent = themeDropdown.querySelector("div")
      themeContent.innerHTML = "" // Clear existing buttons
      Object.entries(THEMES).forEach(([key, theme]) => {
        const button = document.createElement("button")
        button.className = getThemeDropdownButtonClasses(currentTheme, currentTheme === key)
        button.textContent = theme.name
        button.onclick = () => {
          setTheme(key)
          themeDropdown.classList.remove("show")
        }
        themeContent.appendChild(button)
      })
    }

    // Listen for messages from parent window
    window.addEventListener("message", (event) => {
      const { type, data } = event.data

      switch (type) {
        case "setVideoData":
          updateVideoInfo(data)
          break
        case "addMessage":
          addMessage(data.content, data.type)
          break
        case "setLoading":
          setLoading(data.loading)
          break
        case "clear":
          messages.innerHTML = ""
          messageHistory = []
          videoData = null
          updateVideoInfo(null)
          if (welcomeMessage) {
            messages.appendChild(welcomeMessage)
            // Re-apply welcome message specific classes
            const welcomeMessageDiv = welcomeMessage.querySelector("div")
            if (welcomeMessageDiv) {
              welcomeMessageDiv.className = `mt-4 space-y-2 text-xs text-left p-3 rounded-lg ${getWelcomeMessageClasses(currentTheme)}`
            }
          }
          break
      }
    })

    // Initialize
    updateContextStatus()
    populateThemeDropdown() // Populate dropdown on initial load

    // Load saved theme
    const chrome = window.chrome // Declare chrome variable
    if (chrome && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get("theme", (data) => {
        if (data.theme) {
          setTheme(data.theme)
        } else {
          updateUIForTheme(currentTheme) // Apply default theme classes if no saved theme
        }
      })
    } else {
      // Fallback for environments without chrome.storage (e.g., local browser preview)
      updateUIForTheme(currentTheme)
    }
})

// Base classes for the sidebar container itself, used by updateUIForTheme
const getSidebarBaseClasses = (theme) => {
  const base = "fixed right-0 top-0 h-full z-40 flex flex-col transition-all duration-300"
  switch (theme) {
    case "xp":
      return `${base} bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black text-black shadow-2xl`
    case "macos":
      return `${base} bg-[#c3c3c3] border-2 border-t-white border-l-white border-b-[#6e6e6e] border-r-[#6e6e6e] text-black font-['Segoe_UI',system-ui,sans-serif] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]`
    case "neobrutal":
      return `${base} bg-yellow-300 border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
    case "nintendo":
      return `${base} bg-red-500 border-red-700 text-white pixel-font`
    case "orange":
      return `${base} bg-orange-500 border-orange-600 text-white`
    case "orangeDark":
      return `${base} bg-orange-900 border-orange-800 text-orange-100`
    case "blueLight":
      return `${base} bg-blue-100 border-blue-200 text-blue-900`
    case "blueDark":
      return `${base} bg-blue-900 border-blue-800 text-blue-100`
    default:
      return `${base} bg-white border-gray-200 text-gray-900 shadow-2xl`
  }
}
