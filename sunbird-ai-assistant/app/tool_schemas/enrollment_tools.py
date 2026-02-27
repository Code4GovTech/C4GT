from typing import List, Dict
from langchain.tools import tool

# Simulated User Enrollment Data
USER_ENROLLMENTS = {
    "user_001": ["python101"],
    "user_002": ["ml202"],
}

PROGRESS_TRACKER = {
    "user_001": {"python101": "80%"},
    "user_002": {"ml202": "40%"},
}

@tool
def get_user_enrollments(user_id: str) -> List[str]:
    """
    Retrieve a list of course IDs that the user is enrolled in.
    """
    return USER_ENROLLMENTS.get(user_id, [])

@tool
def get_course_progress(user_id: str, course_id: str) -> Dict:
    """
    Get progress data for a specific user and course.
    """
    progress = PROGRESS_TRACKER.get(user_id, {}).get(course_id)
    if not progress:
        return {"error": "Progress data not found for given user and course."}
    return {"user_id": user_id, "course_id": course_id, "progress": progress}
