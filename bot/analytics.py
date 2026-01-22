import json
from datetime import datetime

# File to store analytics data
ANALYTICS_FILE = "analytics.json"

def log_interaction(user_name, query, response, error=None):
    """Log user interactions to an analytics file."""
    interaction = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user_name": user_name,
        "query": query,
        "response": response,
        "error": error
    }
    try:
        # Append new interaction to the analytics file
        with open(ANALYTICS_FILE, "a") as f:
            f.write(json.dumps(interaction) + "\n")
        print("Interaction logged successfully!")
    except Exception as e:
        print(f"Error logging interaction: {e}")
