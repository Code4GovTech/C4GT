import json
from bot.mock_responses import mock_responses
from bot.analytics import log_interaction
from bot.nudges.nudges import get_nudge

# Load user data
USER_DATA_FILE = "user_data.json"

def load_user_data():
    """Load user data from the JSON file."""
    try:
        with open(USER_DATA_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("User data file not found. Please complete the onboarding process first.")
        return None

def get_stage_specific_response(user_data, query):
    """
    Generate a mock response based on the user's pregnancy stage and query.
    """
    # Find a response based on keywords in the query
    for keyword, response in mock_responses.items():
        if keyword in query.lower():
            return response

    # Default response for unknown queries
    return "I'm sorry, I don't have information on that topic right now. Please consult your healthcare provider."

def main():
    """Main function to handle user queries."""
    # Load user data
    user_data = load_user_data()
    if not user_data:
        return
    
    user_name = user_data["name"]
    pregnancy_stage = user_data["pregnancy_stage"]
    print(f"Welcome back, {user_name}!")
    
    # Provide a proactive nudge
    nudge = get_nudge(pregnancy_stage)
    print(f"Nudge: {nudge}")

    # Chat loop
    while True:
        query = input("Ask a question about pregnancy or infant care (or type 'exit' to quit): ")
        if query.lower() == "exit":
            print("Thank you for using the Pregnancy Chatbot. Take care!")
            break
        
        # Get response from the chatbot
        try:
            response = get_stage_specific_response(user_data, query)
            print(f"Chatbot: {response}")
            # Log the interaction
            log_interaction(user_name, query, response)
        except Exception as e:
            print(f"An error occurred: {e}")
            log_interaction(user_name, query, "No response", error=str(e))

if __name__ == "__main__":
    main()
