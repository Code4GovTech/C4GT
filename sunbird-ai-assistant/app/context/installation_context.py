def get_installation_context():
    return {
        "deployment": "sunbird-dev",
        "base_url": "https://dev.sunbird.org/api",
        "token": "your-auth-token",  # Secure this in production
        "features_enabled": ["courses", "progress", "enrollments"]
    }
