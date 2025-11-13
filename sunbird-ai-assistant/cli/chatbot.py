from app.services.auth import generate_token, validate_token, get_user_role
from app.agent.mcp_agent import setup_agent

def run_chat():
    print("=== Sunbird AI Assistant ===")
    user_id = input("Enter User ID: ")
    
    try:
        token = generate_token(user_id)
        print(f"🔐 Your session token: {token}")
    except ValueError:
        print("🚫 Invalid user ID")
        return

    installation_id = input("Enter Deployment ID (e.g., demo): ")

    # Authenticate the token
    validated_user = validate_token(token)
    if not validated_user:
        print("❌ Token expired or invalid.")
        return

    role = get_user_role(validated_user)
    print(f"✅ Authenticated as {role} ({validated_user})")

    agent, session = setup_agent(installation_id, validated_user, role)

    print("\nYou can now start chatting with the AI Assistant.")
    while True:
        user_input = input(">> ")
        if user_input.lower() in ("exit", "quit"):
            break

        prompt = session.inject_context(user_input)
        result = agent.run(prompt)
        print("🤖", result)
