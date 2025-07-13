"""configuration for the backend core module"""

from app.core.config import (
    get_logger,
    BACKEND_HOST,
    BACKEND_PORT,
)
from . import config

__all__ = [
    "config",
    "get_logger",
    "BACKEND_HOST",
    "BACKEND_PORT",
]
