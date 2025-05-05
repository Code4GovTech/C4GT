def call(self, input_data: dict) -> dict:
    url = f"{input_data['base_url']}/course/v1/search"
    headers = {
        "Authorization": f"Bearer {input_data['token']}",
        "Content-Type": "application/json"
    }
    body = {
        "request": {
            "filters": input_data.get("filters", {}),
            "limit": input_data.get("limit", 10)
        }
    }

    response = requests.post(url, json=body, headers=headers)
    return response.json()
