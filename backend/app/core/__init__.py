"""configuration for the backend core module"""

from core.config import (
    get_logger,
    BACKEND_HOST,
    BACKEND_PORT,
)
import core.config as config

__all__ = [
    "config",
    "get_logger",
    "BACKEND_HOST",
    "BACKEND_PORT",
]
