from langchain.agents import initialize_agent
from langchain.chat_models import ChatOpenAI
from tool_registry import register_tools
from app.agent.session_manager import SessionManager
from app.utils.loggers import get_logger

logger = get_logger()

def setup_agent(installation_id: str, user_id: str, persona: str):
    """
    Initialize the LangChain agent with tools registered based on user persona.
    """
    logger.info(f"Setting up agent for user '{user_id}' with role '{persona}' on installation '{installation_id}'")

    # Register tools based on user role/persona (e.g., learner, admin)
    tools = register_tools(persona)

    # Setup LLM (OpenAI GPT-4)
    llm = ChatOpenAI(temperature=0, model="gpt-4")

    # Create a session manager with contextual memory
    session = SessionManager(installation_id, user_id, persona)

    # Initialize LangChain agent with tools and LLM
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent_type="openai-tools",
        verbose=True
    )

    return agent, session
