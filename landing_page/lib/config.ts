// Backend configuration
export const BACKEND_CONFIG = {
  // Use Next.js API route instead of direct backend calls
  BASE_URL: "/api",
  
  // Simplified endpoints - all agents go through single chat endpoint
  ENDPOINTS: {
    CHAT: "/chat", // Single endpoint for all agents
    HEALTH: "/chat", // GET request for health check
  },
  
  // Keep original backend config for reference/direct access if needed
  DIRECT_BACKEND: {
    BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
    ENDPOINTS: {
      REACT_AGENT: "/agent/",
      YOUTUBE: "/ask/", 
      GITHUB: "/git-crawl/",
      WEBSEARCH: "/crawller/",
      WEBSITE: "/website/",
      DOCS: "/docs/" // Under construction
    }
  }
} as const;

// Agent types - mapped to your Python backend agents
export const AGENT_TYPES = {
  REACT: "react",
  YOUTUBE: "youtube", 
  GITHUB: "github",
  WEBSEARCH: "websearch",
  WEBSITE: "website",
  WEBSTROLLER: "webstroller", // Alternative name for website agent
  WEB_SCROLLER: "web-scroller", // Another alternative name for website agent
  DOCS: "docs"
} as const;

export type AgentType = typeof AGENT_TYPES[keyof typeof AGENT_TYPES]; 