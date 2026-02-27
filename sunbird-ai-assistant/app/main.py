from fastapi import FastAPI
from app.agent.mcp_agent import setup_agent
from app.services.mock_api import mock_router

from utils.loggers import get_logger

logger = get_logger()

logger.info("Assistant initialized successfully.")
logger.error("Failed to load user enrollments.")


app = FastAPI()

# Include mock API routes to simulate Sunbird Ed
app.include_router(mock_router)


@app.on_event("startup")
async def startup_event():
    setup_agent()
