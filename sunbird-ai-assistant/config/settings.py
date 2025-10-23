import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Base URL of the Sunbird Ed API deployment
SUNBIRD_BASE_URL = os.getenv("SUNBIRD_BASE_URL", "https://dev.sunbird.org/api")

# Bearer token or API key for authentication (keep this secure!)
SUNBIRD_AUTH_TOKEN = os.getenv("SUNBIRD_AUTH_TOKEN")

# Default user ID (for testing or fallback)
DEFAULT_USER_ID = os.getenv("DEFAULT_USER_ID", "replace_with_a_test_user_id")

# Logging level
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Tool config: default course fetch limit
DEFAULT_COURSE_LIMIT = int(os.getenv("DEFAULT_COURSE_LIMIT", 10))
