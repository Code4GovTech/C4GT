import sqlite3
import random

conn = sqlite3.connect("employee.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS Employee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    city TEXT,
    gender TEXT,
    total_experience REAL,
    blood_group TEXT
)
""")

first_names = [
    "Alice", "Bob", "Charlie", "Diana", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack",
    "Karen", "Leo", "Mona", "Nate", "Olivia", "Paul", "Quinn", "Rachel", "Sam", "Tina",
    "Uma", "Victor", "Wendy", "Xavier", "Yvonne", "Zachary", "Amber", "Ben", "Cathy", "Derek",
    "Ella", "Fred", "Gina", "Harvey", "Isla", "Jake", "Kelly", "Liam", "Maya", "Noah",
    "Olive", "Peter", "Queen", "Ryan", "Sophie", "Thomas", "Ursula", "Vince", "Willow", "Zane"
]

last_names = [
    "Johnson", "Smith", "Lee", "Evans", "Green", "Wright", "Kim", "Adams", "Brown", "Wilson",
    "Clark", "Carter", "Reed", "Foster", "Bell", "Walker", "Parker", "Morris", "Rogers", "Hughes",
    "Patel", "Kelly", "Price", "James", "Scott", "King", "Russell", "Bailey", "Hayes", "Barnes",
    "Chapman", "Jordan", "Armstrong", "Crawford", "Shaw", "Stone", "Norris", "Palmer", "Holmes", "Douglas",
    "Barrett", "Reeves", "Soto", "Bush", "Lane", "Bates", "Ellis", "Flynn", "Flynn", "Flynn"
]

cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Seattle", "Miami", "Boston", "Dallas", "Atlanta"]
blood_groups = ["O+", "A-", "B+", "AB-", "O-", "B-", "AB+", "A+"]
genders = ["Male", "Female"]

used_names = set()

records = []
while len(records) < 50:
    first = random.choice(first_names)
    last = random.choice(last_names)
    name = f"{first} {last}"

    # Ensure unique name
    if name in used_names:
        continue
    used_names.add(name)

    age = random.randint(22, 50)
    city = random.choice(cities)
    gender = random.choice(genders)
    experience = round(random.uniform(1.0, 15.0), 1)
    blood_group = random.choice(blood_groups)
    
    records.append((name, age, city, gender, experience, blood_group))

cursor.executemany("""
INSERT INTO Employee (name, age, city, gender, total_experience, blood_group)
VALUES (?, ?, ?, ?, ?, ?)
""", records)

conn.commit()
conn.close()

print("Database created and 50 unique employee records inserted successfully!")
