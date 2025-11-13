import os
import time
import hashlib
from typing import Optional
from utils.loggers import get_logger

logger = get_logger()

# Simulate a user/token database
MOCK_USERS = {
    "user_001": "admin",
    "user_002": "learner",
    "user_003": "mentor"
}

# Simulated secret key (could be replaced with JWT secret or OAuth config)
SECRET_KEY = os.getenv("AUTH_SECRET_KEY", "sunbird_secret_key")

# Token TTL in seconds (e.g., 1 hour)
TOKEN_TTL = 3600


def generate_token(user_id: str) -> str:
    """Generate a simple hashed token with TTL."""
    if user_id not in MOCK_USERS:
        raise ValueError("Invalid user ID")

    timestamp = str(int(time.time()) + TOKEN_TTL)
    raw = f"{user_id}:{timestamp}:{SECRET_KEY}"
    token = hashlib.sha256(raw.encode()).hexdigest()
    logger.info(f"Generated token for {user_id}")
    return f"{user_id}:{timestamp}:{token}"


def validate_token(token: str) -> Optional[str]:
    """Validate token and return user_id if valid, else None."""
    try:
        user_id, timestamp, token_hash = token.split(":")
        if time.time() > int(timestamp):
            logger.warning("Token expired")
            return None

        expected_raw = f"{user_id}:{timestamp}:{SECRET_KEY}"
        expected_hash = hashlib.sha256(expected_raw.encode()).hexdigest()

        if expected_hash == token_hash:
            logger.info(f"Validated token for {user_id}")
            return user_id
        else:
            logger.warning("Token hash mismatch")
            return None
    except Exception as e:
        logger.error(f"Token validation failed: {e}")
        return None


def get_user_role(user_id: str) -> Optional[str]:
    """Get the role of the user from mock DB."""
    return MOCK_USERS.get(user_id)
