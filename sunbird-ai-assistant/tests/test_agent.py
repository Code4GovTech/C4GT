import unittest
from app.agents.sunbird_agent import build_agent
from config.settings import SUNBIRD_BASE_URL, SUNBIRD_AUTH_TOKEN, DEFAULT_USER_ID

class TestSunbirdAgent(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.context = {
            "base_url": SUNBIRD_BASE_URL,
            "token": SUNBIRD_AUTH_TOKEN,
            "user_id": DEFAULT_USER_ID
        }
        cls.agent = build_agent(cls.context)

    def test_course_metadata_tool(self):
        prompt = "List some available courses"
        response = self.agent.chat(prompt)
        self.assertIn("result", response)
        print("Course Metadata Tool Output:", response)

    def test_enrollment_tool(self):
        prompt = "Show my enrolled courses"
        response = self.agent.chat(prompt)
        self.assertIn("result", response)
        print("Enrollment Tool Output:", response)

    def test_profile_tool(self):
        prompt = "What is my profile info?"
        response = self.agent.chat(prompt)
        self.assertIn("result", response)
        print("User Profile Tool Output:", response)

if __name__ == "__main__":
    unittest.main()
