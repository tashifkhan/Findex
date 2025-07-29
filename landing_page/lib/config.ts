// Backend configuration
export const BACKEND_CONFIG = {
  // Default backend URL - can be overridden by environment variable
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5454",
  
  // API endpoints
  ENDPOINTS: {
    REACT_AGENT: "/agent",
    YOUTUBE: "/ask", 
    GITHUB: "/git-crawl",
    WEBSEARCH: "/crawller",
    WEBSITE: "/website",
    DOCS: "/docs" // Under construction
  }
} as const;

// Agent types
export const AGENT_TYPES = {
  REACT: "react",
  YOUTUBE: "youtube", 
  GITHUB: "github",
  WEBSEARCH: "websearch",
  WEBSITE: "website",
  DOCS: "docs"
} as const;

export type AgentType = typeof AGENT_TYPES[keyof typeof AGENT_TYPES]; 