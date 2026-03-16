# SchemeSkill Connect Integration Guide

## Overview
This guide provides detailed instructions for integrating with the SchemeSkill Connect platform. The platform offers a comprehensive API for training module discovery, management, and analytics.

## Quick Start

### 1. Authentication
First, register your application to obtain API credentials:
```bash
curl -X POST https://api.schemeskill.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password",
    "name": "Your Application"
  }'
```

### 2. Get Access Token
Use your credentials to obtain an access token:
```bash
curl -X POST https://api.schemeskill.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

### 3. Make API Requests
Include the access token in all API requests:
```bash
curl -X GET https://api.schemeskill.com/modules \
  -H "Authorization: Bearer your-access-token"
```

## SDKs

### JavaScript/TypeScript
```bash
npm install @schemeskill/sdk
```

```typescript
import { SchemeSkillClient } from '@schemeskill/sdk';

const client = new SchemeSkillClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.schemeskill.com'
});

// Search for modules
const modules = await client.searchModules({
  query: 'JavaScript',
  language: 'en',
  level: 'beginner'
});

// Get module details
const module = await client.getModule('module-id');

// Track progress
await client.updateProgress('module-id', 50);
```

### Python
```bash
pip install schemeskill-sdk
```

```python
from schemeskill import SchemeSkillClient

client = SchemeSkillClient(
    api_key='your-api-key',
    base_url='https://api.schemeskill.com'
)

# Search for modules
modules = client.search_modules(
    query='JavaScript',
    language='en',
    level='beginner'
)

# Get module details
module = client.get_module('module-id')

# Track progress
client.update_progress('module-id', 50)
```

## Webhook Integration

### 1. Register Webhook
```bash
curl -X POST https://api.schemeskill.com/webhooks \
  -H "Authorization: Bearer your-access-token" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhook",
    "events": ["module.completed", "progress.updated"]
  }'
```

### 2. Handle Webhook Events
```typescript
app.post('/webhook', async (req, res) => {
  const signature = req.headers['x-schemeskill-signature'];
  const payload = req.body;

  // Verify webhook signature
  const isValid = verifyWebhookSignature(signature, payload);
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Handle different event types
  switch (payload.event) {
    case 'module.completed':
      await handleModuleCompletion(payload.data);
      break;
    case 'progress.updated':
      await handleProgressUpdate(payload.data);
      break;
  }

  res.status(200).send('OK');
});
```

## Analytics Integration

### 1. Track User Events
```typescript
// Track module view
await client.trackEvent({
  type: 'module.view',
  moduleId: 'module-id',
  userId: 'user-id'
});

// Track progress
await client.trackEvent({
  type: 'progress.update',
  moduleId: 'module-id',
  userId: 'user-id',
  progress: 50
});
```

### 2. Retrieve Analytics
```typescript
// Get module analytics
const analytics = await client.getModuleAnalytics('module-id', {
  timeRange: 'week'
});

// Get user analytics
const userAnalytics = await client.getUserAnalytics('user-id', {
  timeRange: 'month'
});
```

## Best Practices

### 1. Error Handling
```typescript
try {
  const modules = await client.searchModules({ query: 'JavaScript' });
} catch (error) {
  if (error.status === 401) {
    // Handle authentication error
  } else if (error.status === 429) {
    // Handle rate limit error
  } else {
    // Handle other errors
  }
}
```

### 2. Rate Limiting
- Implement exponential backoff for retries
- Cache responses when appropriate
- Monitor rate limit headers

### 3. Security
- Store API keys securely
- Use HTTPS for all requests
- Validate webhook signatures
- Implement proper access control

### 4. Performance
- Use pagination for large datasets
- Implement client-side caching
- Optimize request frequency

## Support
For additional support:
- Documentation: https://docs.schemeskill.com
- API Reference: https://api.schemeskill.com/docs
- Support Email: support@schemeskill.com
- GitHub Issues: https://github.com/schemeskill/connect/issues 