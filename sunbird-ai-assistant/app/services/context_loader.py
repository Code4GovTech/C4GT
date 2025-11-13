import json
from app.utils.redis_cache import get_cache, set_cache

def get_installation_context(installation_id: str):
    key = f"context:{installation_id}"
    cached = get_cache(key)
    if cached:
        return json.loads(cached)

    with open(f"data/installation_contexts/demo_deployment.json") as f:
        context = json.load(f)
        set_cache(key, json.dumps(context))
        return context
