#bot/onboarding/onboarding_flow.py

import json

# File to store user data
USER_DATA_FILE = "user_data.json"

def save_user_data(user_data):
    """Save user data to a JSON file."""
    try:
        with open(USER_DATA_FILE, "w") as f:
            json.dump(user_data, f, indent=4)
        print("User data saved successfully!")
    except Exception as e:
        print(f"Error saving user data: {e}")

def collect_user_details():
    """Collect user details during onboarding."""
    user_data = {}
    print("Welcome to the Pregnancy Chatbot!")
    
    # Collect user information
    user_data["name"] = input("Please enter your name: ")
    user_data["pregnancy_stage"] = input("Enter your pregnancy stage (e.g., 1st trimester, 2nd trimester): ")
    user_data["preferred_language"] = input("Preferred language (e.g., English, Hindi): ")
    
    # Save user data
    save_user_data(user_data)

if __name__ == "__main__":
    collect_user_details()
