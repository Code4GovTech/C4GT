# 🤖 Sunbird AI Assistant

An intelligent, context-aware AI assistant powered by the Model Context Protocol (MCP), designed to integrate with the Sunbird Ed platform and enhance learning experiences through natural language interaction.

Built by COSS • Category: AI & Conversational Agents, Education

---

## 🚀 Project Overview

Sunbird AI Assistant enables conversational access to Sunbird Ed’s powerful learning APIs through a modular AI agent. It allows users to:

- Query course metadata
- Retrieve enrollment information
- View their profile details
- Leverage deployment-specific context
- Extend toward personalized learning journeys

---

## 🧠 Features

- **Context-Aware**: The AI assistant is capable of responding based on both installation-level context and user-specific data.
- **Customizable Tools**: Integrates with the Sunbird Ed APIs for fetching course metadata, user enrollments, and profile information.
- **Extensible**: Designed to allow easy integration of additional tools and features.
- **Lightweight UI**: Initially built with a simple CLI interface for easy interaction and testing.

---

## ⚙️ Setup & Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Code4GovTech/C4GT.git
    cd C4GT/sunbird-ai-assistant
    ```

2. **Install Dependencies**

    Make sure you have Python 3.8 or higher installed.

    ```bash
    pip install -r requirements.txt
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root of the project and add the following:

    ```dotenv
    SUNBIRD_BASE_URL=https://dev.sunbird.org/api
    SUNBIRD_AUTH_TOKEN=your_bearer_token_here
    DEFAULT_USER_ID=your_test_user_id
    LOG_LEVEL=DEBUG
    DEFAULT_COURSE_LIMIT=10
    ```

    > **Note**: Make sure to keep your Bearer Token (`SUNBIRD_AUTH_TOKEN`) secure and do not expose it in your public repository.

---

## 🧪 Running Tests

Run the integration tests to verify that the AI assistant is correctly interacting with the Sunbird Ed APIs.

```bash
python -m unittest tests/test_agent.py
