def chat_loop(agent):
    print("Sunbird AI Assistant (type 'exit' to quit)\n")
    while True:
        user_input = input("> ")
        if user_input.lower() in ("exit", "quit"):
            print("Goodbye!")
            break
        response = agent.chat(user_input)
        print(response)
