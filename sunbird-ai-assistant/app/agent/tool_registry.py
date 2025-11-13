from app.tool_schemas.course_tools import get_course_metadata
from app.tool_schemas.enrollment_tools import get_user_enrollments, get_course_progress

def register_tools(user_role: str):
    """Dynamically register tools based on the user's role/persona."""
    tools = [get_course_metadata, get_user_enrollments, get_course_progress]

    if user_role == "admin":
        # Simulate additional admin-only tools (add them to a separate schema file)
        from app.tool_schemas.admin_tools import manage_users, list_all_courses
        tools += [manage_users, list_all_courses]

    return tools
