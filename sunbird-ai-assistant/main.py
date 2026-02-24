from app.agents.sunbird_agent import build_agent
from app.interface.cli_interface import chat_loop
from config.settings import SUNBIRD_BASE_URL, SUNBIRD_AUTH_TOKEN, DEFAULT_USER_ID

def main():
    print("Initializing Sunbird AI Assistant...")

    # Shared context passed to tools and agent
    context = {
        "base_url": SUNBIRD_BASE_URL,
        "token": SUNBIRD_AUTH_TOKEN,
        "user_id": DEFAULT_USER_ID
    }

    # Build the agent with context-aware tools
    agent = build_agent(context)

    # Start CLI loop
    chat_loop(agent)

if __name__ == "__main__":
    main()
