import redis
from app.config import REDIS_HOST, REDIS_PORT

r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def set_cache(key, value):
    r.set(key, value)

def get_cache(key):
    return r.get(key)
