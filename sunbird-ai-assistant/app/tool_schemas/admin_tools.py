from langchain.tools import tool
from typing import List, Dict

# Simulated Course and User DB
ALL_COURSES = {
    "python101": "Intro to Python",
    "ml202": "Machine Learning Fundamentals",
    "dl301": "Deep Learning with PyTorch"
}

ALL_USERS = {
    "user_001": "admin",
    "user_002": "learner",
    "user_003": "mentor"
}

@tool
def list_all_courses() -> List[str]:
    """
    List all available courses in the platform (Admin only).
    """
    return list(ALL_COURSES.values())

@tool
def manage_users(action: str, target_user: str, new_role: str = "") -> Dict:
    """
    Simulate user management operations (Admin only).
    Supported actions: 'view', 'update'
    """
    if target_user not in ALL_USERS:
        return {"error": "User not found"}

    if action == "view":
        return {target_user: ALL_USERS[target_user]}
    elif action == "update":
        if not new_role:
            return {"error": "New role must be specified for update"}
        ALL_USERS[target_user] = new_role
        return {"message": f"Role updated to '{new_role}' for user '{target_user}'"}
    else:
        return {"error": "Unsupported action. Use 'view' or 'update'"}
