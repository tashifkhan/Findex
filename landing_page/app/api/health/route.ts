import { NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_URL || 'https://findex-backend.tashif.codes';

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
      status: backendStatus === 'healthy' ? 'healthy' : 'unhealthy',
      backend: {
        status: backendStatus,
        message: backendMessage,
        url: BACKEND_BASE_URL
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        backend: {
          status: 'unhealthy',
          message: 'Health check failed',
          url: BACKEND_BASE_URL
        },
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
