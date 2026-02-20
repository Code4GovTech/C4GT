# SchemeSkill Connect API Documentation

## Base URL
```
https://api.schemeskill.com
```

## Authentication
All API requests require authentication using a JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```
Request body:
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

#### Login
```http
POST /auth/login
```
Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Training Modules

#### Create Module
```http
POST /modules
```
Request body:
```json
{
  "title": {
    "en": "string",
    "es": "string",
    "fr": "string"
  },
  "description": {
    "en": "string",
    "es": "string",
    "fr": "string"
  },
  "content": [
    {
      "text": "string",
      "language": "string",
      "media": [
        {
          "type": "video|image|document",
          "url": "string",
          "thumbnail": "string"
        }
      ]
    }
  ],
  "metadata": {
    "level": "beginner|intermediate|advanced",
    "category": "string",
    "duration": "number",
    "keywords": ["string"],
    "prerequisites": ["string"],
    "targetAudience": ["string"]
  },
  "price": {
    "amount": "number",
    "currency": "string"
  }
}
```

#### Get Module
```http
GET /modules/:id
```

#### Search Modules
```http
GET /search
```
Query parameters:
- `query`: Search term
- `language`: Filter by language
- `level`: Filter by level
- `category`: Filter by category

#### Update Module Progress
```http
POST /modules/:id/progress
```
Request body:
```json
{
  "progress": "number"
}
```

### Analytics

#### Get Module Analytics
```http
GET /analytics/modules/:id
```
Query parameters:
- `timeRange`: day|week|month|year

#### Get User Analytics
```http
GET /analytics/users/:id
```
Query parameters:
- `timeRange`: day|week|month|year

### Search History

#### Get User Search History
```http
GET /search/history
```

#### Get Search Recommendations
```http
GET /search/recommendations
```

## Error Responses

All error responses follow this format:
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

Common error codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address. The following headers are included in responses:
- `X-RateLimit-Limit`: Maximum number of requests
- `X-RateLimit-Remaining`: Number of requests remaining
- `X-RateLimit-Reset`: Time when the rate limit resets

## Pagination

Endpoints that return lists support pagination using query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Response includes pagination metadata:
```json
{
  "data": [],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "pages": "number"
  }
}
``` 