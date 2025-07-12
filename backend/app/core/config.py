import os
import logging
import dotenv

# load .env varibles
dotenv.load_dotenv()

FLASK_ENV = os.getenv("FLASK_ENV", "development")
FLASK_DEBUG = os.getenv("FLASK_DEBUG", True if FLASK_ENV == "development" else False)
BACKEND_HOST = os.getenv("BACKEND_HOST", "0.0.0.0")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", 5454))

# Google API key
google_api_key = os.getenv("GOOGLE_API_KEY", "")

# logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
