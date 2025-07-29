# Use Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install UV package manager
RUN pip install uv

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install Python dependencies using UV
RUN uv sync --frozen

# Copy the application code
COPY . .

# Create a non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose the port
EXPOSE 5454

# Set environment variables
ENV PYTHONPATH=/app
ENV BACKEND_HOST=0.0.0.0
ENV BACKEND_PORT=5454

# Run the application
CMD ["uv", "run", "python", "main.py"]
