from app.services.context_loader import get_installation_context
from app.utils.loggers import get_logger

logger = get_logger()

class SessionManager:
    def __init__(self, installation_id: str, user_id: str, persona: str):
        self.installation_id = installation_id
        self.user_id = user_id
        self.persona = persona
        self.context = self.load_context()

    def load_context(self):
        context = get_installation_context(self.installation_id)
        logger.info(f"Loaded context for {self.installation_id}")
        return {
            "persona": self.persona,
            "installation_context": context,
            "user_id": self.user_id
        }

    def inject_context(self, prompt: str) -> str:
        return f"{self.persona.upper()} CONTEXT: {self.context}\n\n{prompt}"
