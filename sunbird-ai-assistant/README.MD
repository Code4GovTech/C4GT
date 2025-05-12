# 🧠 Sunbird AI Assistant

A context-aware conversational agent built on top of the **Model Context Protocol (MCP)** and powered by **OpenAI’s function-calling tools**. This assistant interacts with **Sunbird Ed APIs**, adapting its capabilities to different user roles like **learner**, **admin**, and **mentor** to enhance the digital public good ecosystem in education.

---

## 🌐 Overview

Sunbird Ed is a modular Digital Public Good (DPG) designed to support learning and skilling platforms. However, it lacks intelligent conversational capabilities. This project integrates a role-aware AI assistant that:

- Understands the **context** of a specific installation
- Personalizes responses based on **user persona**
- Interacts with key **Sunbird Ed APIs** (mocked or real)
- Is modular and extensible across various deployments

---

## 📌 Features

- 🔧 Tool-based LangChain agent integration with role-aware access
- 🔑 Authentication layer for API authorization
- 💬 Conversational interface (CLI or REST)
- 🧠 Session context manager per installation and user
- 🧰 Supports key Sunbird Ed APIs:
  - Course metadata
  - User enrollments
  - Learning progress
  - Admin controls
- 📦 Easily extendable for additional DPGs and APIs

---

## 🧱 Architecture

```txt
                          +-------------------+
                          |   CLI / Web UI    |
                          +--------+----------+
                                   |
                                   v
                        +----------------------+
                        |   FastAPI Backend     |
                        +----------+-----------+
                                   |
        +--------------------------+-------------------------+
        |                        LangChain Agent              |
        |       (Function Calling, Role-based Tool Access)    |
        +----------+------------+------------+----------------+
                   |            |            |
         +---------+    +-------+-----+    +-+------------------+
         | Course Tools | Enrollment Tools | Admin Tools (RBAC) |
         +-------------+------------------+---------------------+


## Project Structure :

.
├── app/
│   ├── main.py                  
│   ├── agent/
│   │   ├── session_manager.py   # Manages session/user context
│   ├── auth/
│   │   └── auth.py             
│   ├── tool_schemas/
│   │   ├── course_tools.py      
│   │   ├── enrollment_tools.py  
│   │   └── admin_tools.py       
│   ├── utils/
│   │   └── logger.py           
│   ├── tool_registry.py         # Registers tools based on role
│   └── agent_setup.py           
├── requirements.txt
└── README.md


## 🧪 API Simulation & Mocking

All Sunbird Ed APIs like `/course/v1/search`, `/user/enrollment/list` are currently mocked.  
You can easily replace their logic in the tool schema files using actual API calls like:

```python
requests.get("https://<your-sunbird-endpoint>/course/v1/search", headers={...})


