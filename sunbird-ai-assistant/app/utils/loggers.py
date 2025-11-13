import logging
import sys

def get_logger(name: str = "sunbird_ai_assistant") -> logging.Logger:
    """Initializes and returns a configured logger instance."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # Avoid duplicate handlers in case of reloads (e.g., FastAPI dev server)
    if not logger.handlers:
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] %(name)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )

        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(formatter)

        logger.addHandler(stream_handler)

    return logger
