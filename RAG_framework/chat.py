from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import pandas as pd
import sqlite3
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
import os
os.environ["LANGCHAIN_PYDANTIC_V1"] = "1"

load_dotenv()
app = Flask(__name__)

api_key = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_API_KEY"] = api_key

vectorstore = None
conversation_chain = None
chat_history = []

db_connection = sqlite3.connect("employee.db", check_same_thread=False)

table_schema = """
Table: Employee
Columns:
- id (INTEGER PRIMARY KEY AUTOINCREMENT)
- name (TEXT)
- age (INTEGER)
- city (TEXT)
- gender (TEXT)
- total_experience (REAL)
- blood_group (TEXT)
"""

def main(csv_file_path):
    """Main function to initialize vectorstore and conversation_chain."""
    global vectorstore, conversation_chain
    try:
        raw_chunks = get_csv_chunks(csv_file_path)
        vectorstore = get_vectorstore(raw_chunks)
        conversation_chain = get_conversation_chain(vectorstore)
    except Exception as e:
        print(f"Error in main function: {str(e)}")

def get_csv_chunks(csv_file_path):
    """Extract and format text chunks from CSV file."""
    try:
        df = pd.read_csv(csv_file_path)
        chunks = []
        for _, row in df.iterrows():
            question = str(row.get('question', '')).strip()
            query = str(row.get('query', '')).strip()
            description = str(row.get('description', '')).strip()
            formatted_text = f"question: {question} query: {query} description: {description}"
            chunks.append(formatted_text)
        return chunks
    except Exception as e:
        print(f"Error in get_csv_chunks function: {str(e)}")

def get_vectorstore(text_chunks):
    """Generate vectorstore from text chunks."""
    try:
        embeddings = OpenAIEmbeddings()
        vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
        return vectorstore
    except Exception as e:
        print(f"Error in get_vectorstore function: {str(e)}")

def get_conversation_chain(vectorstore):
    """Create a conversation chain for handling user queries."""
    try:
        llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.3)
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(),
        )
        return conversation_chain
    except Exception as e:
        print(f"Error in get_conversation_chain function: {str(e)}")

@app.route("/", methods=["POST"])
def answer_question():
    """Handle POST requests containing user questions."""
    try:
        data = request.get_json()
        if "question" in data:
            user_question = data["question"]
            response = handle_user_input(user_question)
            print("answer", response)
            return jsonify({"response": response})
        else:
            return jsonify({"error": "Missing 'question' parameter in the request"}), 400
    except Exception as e:
        print(f"Error in answer_question function: {str(e)}")
        return jsonify({"error": "An error occurred while processing the request"}), 500

import re

def handle_user_input(user_question):
    try:
        global chat_history
        default_prompt = ("You are a SQL expert support bot. Given the following Employee database table schema, "
                          "write only the correct SQL query for the user's question without any explanation. "
                          "Just return the SQL inside triple backticks.\n\n"
                          f"{table_schema}\n\n"
                          "If it is a greeting like 'hi' or 'hello', reply politely like 'Hello! I'm here to assist you.'\n\n")
        user_question_with_prompt = default_prompt + user_question
        response = conversation_chain.invoke({'question': user_question_with_prompt, 'chat_history': chat_history})

        if 'answer' in response:
            sql_query = response['answer']

            sql_query = sql_query.replace("```sql", "").replace("```", "").strip()

            sql_match = re.search(r"(SELECT .*?;)", sql_query, flags=re.IGNORECASE | re.DOTALL)
            if sql_match:
                sql_query = sql_match.group(1).strip()
            else:
                sql_query = sql_query.split('\n')[-1].strip()

            print(f"Cleaned SQL: {sql_query}")

            try:
                cursor = db_connection.cursor()
                cursor.execute(sql_query)
                result = cursor.fetchall()
                columns = [description[0] for description in cursor.description]
                formatted_result = [dict(zip(columns, row)) for row in result]


                return {"query": sql_query, "result": formatted_result}
            except Exception as query_error:
                print(f"Error executing SQL query: {str(query_error)}")
                return "An error occurred while executing the SQL query."
        else:
            return "Error: Unexpected response format"
    except Exception as e:
        print(f"Error in handle_user_input function: {str(e)}")
        return "An error occurred while processing the user input"



if __name__ == '__main__':
    csv_file_path = "employee_questions.csv"  
    main(csv_file_path)
    app.run(port=8000)
