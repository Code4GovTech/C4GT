from fastapi import APIRouter

mock_router = APIRouter()

@mock_router.get("/course/v1/search")
def search_courses(query: str = ""):
    return {
        "courses": [
            {"id": "c101", "title": "Python Basics"},
            {"id": "c102", "title": "Data Science"},
        ]
    }

@mock_router.get("/user/enrollment/list")
def get_enrollments(user_id: str):
    return {
        "user_id": user_id,
        "enrollments": [
            {"course_id": "c101", "progress": "50%"},
        ]
    }
