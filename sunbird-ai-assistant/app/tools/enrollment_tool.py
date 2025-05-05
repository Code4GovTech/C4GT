def call(self, input_data: dict) -> dict:
    user_id = input_data["user_id"]
    url = f"{input_data['base_url']}/user/enrollment/list/{user_id}"
    headers = {
        "Authorization": f"Bearer {input_data['token']}",
        "Content-Type": "application/json"
    }

    response = requests.get(url, headers=headers)
    return response.json()
