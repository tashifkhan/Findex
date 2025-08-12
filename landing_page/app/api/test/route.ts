import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://findex-backend.tashif.codes';

export async function GET() {
  try {
    // Test all backend endpoints
    const endpoints = [
      { name: 'health', url: `${BACKEND_BASE_URL}/health/` },
      { name: 'react_agent', url: `${BACKEND_BASE_URL}/agent/` },
      { name: 'website', url: `${BACKEND_BASE_URL}/website/` },
      { name: 'youtube', url: `${BACKEND_BASE_URL}/ask/` },
      { name: 'github', url: `${BACKEND_BASE_URL}/git-crawl/` },
      { name: 'websearch', url: `${BACKEND_BASE_URL}/crawller/` },
    ];

    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint.url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          return {
            name: endpoint.name,
            url: endpoint.url,
            status: response.status,
            ok: response.ok,
            statusText: response.statusText
          };
        } catch (error) {
          return {
            name: endpoint.name,
            url: endpoint.url,
            status: 0,
            ok: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    const endpointStatuses = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          name: endpoints[index].name,
          url: endpoints[index].url,
          status: 0,
          ok: false,
          error: result.reason
        };
      }
    });

    const allHealthy = endpointStatuses.every(ep => ep.ok || ep.status === 405); // 405 = Method Not Allowed is OK for GET on POST endpoints

    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'partial',
      backend_url: BACKEND_BASE_URL,
      timestamp: new Date().toISOString(),
      endpoints: endpointStatuses,
      summary: {
        total: endpoints.length,
        healthy: endpointStatuses.filter(ep => ep.ok || ep.status === 405).length,
        unhealthy: endpointStatuses.filter(ep => !ep.ok && ep.status !== 405).length
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        backend_url: BACKEND_BASE_URL,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
