from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from datetime import datetime
import requests

@dataclass
class ModuleContent:
    language: str
    title: str
    description: str
    content: str

@dataclass
class TrainingModule:
    id: str
    provider_id: str
    contents: List[ModuleContent]
    category: str
    sub_category: Optional[str]
    difficulty_level: str
    duration: int
    keywords: List[str]
    prerequisites: List[str]
    learning_outcomes: List[str]
    target_audience: List[str]
    media_urls: List[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    telemetry: Dict[str, int]

@dataclass
class Provider:
    id: str
    name: str
    email: str
    organization: str
    description: Optional[str]
    languages: List[str]
    categories: List[str]
    contact: Dict[str, str]
    is_verified: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
    telemetry: Dict[str, int]

class SchemeSkillSDK:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'Accept': 'application/json'
        })

    def _handle_response(self, response: requests.Response) -> Dict:
        if response.status_code >= 400:
            error_data = response.json()
            raise Exception(
                f"API Error: {error_data.get('message', 'Unknown error')}",
                error_data.get('code', 'UNKNOWN_ERROR'),
                error_data.get('details', {})
            )
        return response.json()

    def search_modules(
        self,
        language: Optional[str] = None,
        category: Optional[str] = None,
        difficulty_level: Optional[str] = None,
        keywords: Optional[str] = None,
        provider_id: Optional[str] = None,
        sort_by: str = 'relevance',
        page: int = 1,
        limit: int = 10
    ) -> Dict:
        params = {
            'language': language,
            'category': category,
            'difficultyLevel': difficulty_level,
            'keywords': keywords,
            'providerId': provider_id,
            'sortBy': sort_by,
            'page': page,
            'limit': limit
        }
        params = {k: v for k, v in params.items() if v is not None}
        
        response = self.session.get(
            f"{self.base_url}/api/search",
            params=params
        )
        return self._handle_response(response)

    def get_module_by_id(
        self,
        module_id: str,
        language: str = 'en'
    ) -> Dict:
        response = self.session.get(
            f"{self.base_url}/api/modules/{module_id}",
            params={'language': language}
        )
        return self._handle_response(response)

    def get_provider_info(self, provider_id: str) -> Dict:
        response = self.session.get(
            f"{self.base_url}/api/providers/{provider_id}"
        )
        return self._handle_response(response)

    def get_module_analytics(self, module_id: str) -> Dict:
        response = self.session.get(
            f"{self.base_url}/api/analytics/modules/{module_id}"
        )
        return self._handle_response(response) 