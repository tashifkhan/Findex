import { NextRequest, NextResponse } from 'next/server';

// Define the request types based on your Python backend models
interface ChatRequest {
  agent: string;
  question: string;
  url?: string;
  chat_history: { role: string; content: string }[];
}

interface BackendResponse {
  answer?: string;
  content?: string;
  response?: string;
  detail?: string;
}

// Backend configuration - matches your Python FastAPI backend
const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://findex-backend.tashif.codes';

// Agent endpoint mapping based on your main.py file
const AGENT_ENDPOINTS = {
  react: '/agent/',           // Maps to agent_router with prefix="/agent"
  websearch: '/crawller/',    // Maps to crawller_router with prefix="/crawller" 
  youtube: '/ask/',           // Maps to ask_router with prefix="/ask"
  github: '/git-crawl/',      // Maps to git_crawl_router with prefix="/git-crawl"
  website: '/website/',       // Maps to website_router with prefix="/website"
  webstroller: '/website/',   // Alternative name for website agent
  'web-scroller': '/website/', // Another alternative name for website agent
} as const;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { agent, question, url, chat_history } = body;

    // Validate required fields
    if (!agent || !question) {
      return NextResponse.json(
        { error: 'Missing required fields: agent and question' },
        { status: 400 }
      );
    }

    // Get the endpoint for the agent
    const agentKey = agent.toLowerCase() as keyof typeof AGENT_ENDPOINTS;
    const endpoint = AGENT_ENDPOINTS[agentKey];

    if (!endpoint) {
      return NextResponse.json(
        { error: `Unknown agent type: ${agent}. Available agents: ${Object.keys(AGENT_ENDPOINTS).join(', ')}` },
        { status: 400 }
      );
    }

    // Validate URL for agents that require it
    const urlRequiredAgents = ['youtube', 'github', 'website', 'webstroller', 'web-scroller'];
    if (urlRequiredAgents.includes(agentKey) && !url) {
      return NextResponse.json(
        { error: `URL is required for ${agent} agent` },
        { status: 400 }
      );
    }

    // Prepare request body based on your Python backend models
    const requestBody: {
      question: string;
      chat_history: Array<{ role: string; content: string }>;
      url?: string;
    } = {
      question,
      chat_history: chat_history || []
    };

    // Add URL for agents that need it (website, youtube, github)
    if (url && urlRequiredAgents.includes(agentKey)) {
      requestBody.url = url;
    }

    // Make request to Python FastAPI backend
    const backendUrl = `${BACKEND_BASE_URL}${endpoint}`;
    console.log(`Backend Base URL: ${BACKEND_BASE_URL}`);
    console.log(`Making request to: ${backendUrl}`);
    console.log(`Request body:`, JSON.stringify(requestBody, null, 2));
    console.log(`Chat history length: ${chat_history?.length || 0}`);

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: BackendResponse = await response.json().catch(() => ({}));
      console.error(`Backend error (${response.status}):`, errorData);
      
      return NextResponse.json(
        { 
          error: errorData.detail || `Backend error: ${response.status} ${response.statusText}`,
          status: response.status 
        },
        { status: response.status }
      );
    }

    const data: BackendResponse = await response.json();
    console.log(`Backend response:`, data);

    // Extract the answer from various possible response formats
    // Based on your Python routes, different endpoints return different field names
    let answer = '';
    if (data.answer) {
      answer = data.answer;           // From website.py, ask.py, crawller.py, react_ask.py
    } else if (data.content) {
      answer = data.content;          // From git_crawl.py
    } else if (data.response) {
      answer = data.response;         // Fallback
    } else {
      answer = 'Received response but couldn\'t extract the answer.';
    }

    return NextResponse.json({ 
      answer,
      agent,
      timestamp: new Date().toISOString(),
      backend_endpoint: endpoint
    });

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: 'Failed to process chat request'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint - calls your Python backend health endpoint
export async function GET() {
  try {
    // Check backend health using your health endpoint
    const healthResponse = await fetch(`${BACKEND_BASE_URL}/health/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => null);

    let backendStatus = 'unhealthy';
    let backendMessage = 'Backend unreachable';

    if (healthResponse?.ok) {
      try {
        const healthData = await healthResponse.json();
        backendStatus = healthData.status || 'healthy';
        backendMessage = healthData.message || 'Backend is running';
      } catch {
        backendStatus = 'healthy'; // Response was ok but couldn't parse JSON
        backendMessage = 'Backend is running';
      }
    }

    return NextResponse.json({
      status: 'ok',
      backend: {
        status: backendStatus,
        message: backendMessage,
        url: BACKEND_BASE_URL
      },
      timestamp: new Date().toISOString(),
      available_agents: Object.keys(AGENT_ENDPOINTS),
      endpoints: AGENT_ENDPOINTS
    });

  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        backend: {
          status: 'unhealthy',
          message: 'Health check failed',
          url: BACKEND_BASE_URL
        },
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
