# Docker Setup for Findex Backend

This guide explains how to run the Findex backend using Docker and Docker Compose.

## Prerequisites

- Docker Engine installed on your system
- Docker Compose installed on your system
- A `.env` file in the backend directory with required environment variables

## Environment Setup

1. Copy the example environment file:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Edit the `.env` file with your actual values:

   ```bash
   nano backend/.env
   ```

   Make sure to set:

   - `GOOGLE_API_KEY`: Your Google API key for the AI services
   - Other required environment variables as needed

## Running with Docker Compose

### Start the services:

```bash
docker-compose up -d
```

### View logs:

```bash
docker-compose logs -f findex-backend
```

### Stop the services:

```bash
docker-compose down
```

### Rebuild the backend image:

```bash
docker-compose build findex-backend
```

### Run with rebuild:

```bash
docker-compose up --build -d
```

## Running with Docker only

### Build the image:

```bash
cd backend
docker build -t findex-backend .
```

### Run the container:

```bash
docker run -d \
  --name findex-backend \
  -p 5454:5454 \
  --env-file .env \
  findex-backend
```

## API Endpoints

Once the backend is running, you can access the API at:

- Base URL: `http://localhost:5454`
- Health check: `http://localhost:5454/health`
- API documentation: `http://localhost:5454/docs` (FastAPI auto-generated)

## Available Routes

- `/health` - Health check endpoint
- `/video-info` - Video information endpoints
- `/subs` - Subtitle endpoints
- `/ask` - Q&A endpoints
- `/website` - Website processing endpoints
- `/crawller` - Web crawler endpoints

## Development

For development, you can mount the backend directory as a volume to enable hot reloading:

```bash
# The docker-compose.yml already includes this volume mount
docker-compose up -d
```

## Troubleshooting

1. **Port conflicts**: If port 5454 is already in use, change the port mapping in docker-compose.yml
2. **Environment variables**: Ensure all required environment variables are set in the `.env` file
3. **Build issues**: Try rebuilding the image with `--no-cache` flag:
   ```bash
   docker-compose build --no-cache findex-backend
   ```

## Additional Services

The docker-compose.yml includes commented sections for additional services:

- PostgreSQL database
- Redis for caching

Uncomment these sections if your application requires them.

## Security Notes

- The `.env` file contains sensitive information and should not be committed to version control
- For production deployment, consider using Docker secrets or a proper secrets management system
- The health check endpoint helps with container orchestration and monitoring
