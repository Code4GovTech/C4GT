# SchemeSkill Connect SDKs

This directory contains SDK implementations for various programming languages to help integrate with the SchemeSkill Connect API.

## Available SDKs

### TypeScript/JavaScript SDK

```typescript
import { createSchemeSkillSDK } from '@schemeskill/sdk';

const sdk = createSchemeSkillSDK({
  baseUrl: 'https://api.schemeskill.com',
  apiKey: 'your-api-key'
});

// Search for modules
const result = await sdk.searchModules({
  language: 'en',
  category: 'agriculture',
  difficultyLevel: 'beginner'
});

// Get a specific module
const module = await sdk.getModuleById('module-id', { language: 'en' });

// Get provider info
const provider = await sdk.getProviderInfo('provider-id');

// Get module analytics
const analytics = await sdk.getModuleAnalytics('module-id');
```

### Python SDK

```python
from schemeskill_sdk import SchemeSkillSDK

sdk = SchemeSkillSDK(
    base_url='https://api.schemeskill.com',
    api_key='your-api-key'
)

# Search for modules
result = sdk.search_modules(
    language='en',
    category='agriculture',
    difficulty_level='beginner'
)

# Get a specific module
module = sdk.get_module_by_id('module-id', language='en')

# Get provider info
provider = sdk.get_provider_info('provider-id')

# Get module analytics
analytics = sdk.get_module_analytics('module-id')
```

## Installation

### TypeScript/JavaScript

```bash
npm install @schemeskill/sdk
# or
yarn add @schemeskill/sdk
```

### Python

```bash
pip install schemeskill-sdk
```

## Features

- Type-safe API calls
- Automatic error handling
- Support for all API endpoints
- Built-in retry mechanism
- Comprehensive documentation
- Multi-language support

## Error Handling

All SDKs provide consistent error handling:

```typescript
try {
  const result = await sdk.searchModules({ /* ... */ });
} catch (error) {
  console.error(error.code);    // Error code
  console.error(error.message); // Error message
  console.error(error.details); // Additional error details
}
```

## Contributing

We welcome contributions to our SDKs. Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 