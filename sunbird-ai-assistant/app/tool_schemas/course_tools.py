from typing import Dict
from langchain.tools import tool

# Simulated Course Catalog
COURSE_DB = {
    "python101": {"title": "Intro to Python", "level": "Beginner", "duration": "4 weeks"},
    "ml202": {"title": "Machine Learning Fundamentals", "level": "Intermediate", "duration": "6 weeks"}
}

@tool
def get_course_metadata(course_id: str) -> Dict:
    """
    Fetch metadata about a specific course using its ID.
    """
    course = COURSE_DB.get(course_id)
    if not course:
        return {"error": f"No course found with ID '{course_id}'."}
    return {
        "course_id": course_id,
        "title": course["title"],
        "level": course["level"],
        "duration": course["duration"]
    }
