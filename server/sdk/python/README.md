# SchemeSkill Connect Python SDK

A Python SDK for interacting with the SchemeSkill Connect API.

## Installation

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

```python
from schemeskill_sdk import SchemeSkillClient

# Initialize the client
client = SchemeSkillClient(
    base_url="http://localhost:3000",
    api_key="your-api-key"
)

# Search for training modules
results = client.search_modules(
    query="python programming",
    filters={
        "language": "en",
        "level": "beginner"
    }
)

# Get module details
module = client.get_module("module-id")

# Get provider details
provider = client.get_provider("provider-id")
```

## API Reference

### SchemeSkillClient

The main client class for interacting with the SchemeSkill Connect API.

#### Methods

- `search_modules(query: str, filters: Optional[Dict] = None) -> List[Dict]`
  - Search for training modules
  - Returns a list of matching modules

- `get_module(module_id: str) -> Dict`
  - Get details of a specific module
  - Returns module information

- `get_provider(provider_id: str) -> Dict`
  - Get details of a specific provider
  - Returns provider information

## Error Handling

The SDK raises custom exceptions for different types of errors:

- `SchemeSkillError`: Base exception class
- `AuthenticationError`: Raised for authentication failures
- `NotFoundError`: Raised when a resource is not found
- `ValidationError`: Raised for invalid input data
- `ServerError`: Raised for server-side errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 