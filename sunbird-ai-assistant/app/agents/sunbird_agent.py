from openai_mcp_sdk.agent import Agent
from app.tools.course_tool import CourseMetadataTool
from app.tools.enrollment_tool import EnrollmentTool
from app.tools.profile_tool import UserProfileTool

def build_agent(context: dict) -> Agent:
    tools = [
        CourseMetadataTool(),
        EnrollmentTool(),
        UserProfileTool()
    ]
    return Agent(tools=tools, initial_context=context)
