# DMP 2026 - Issue #776 Implementation Package

Issue link: https://github.com/Code4GovTech/C4GT/issues/776

This document is a PR-ready implementation package for:

`[MergeShip] MVP-1: GitHub OAuth onboarding + contributor profile bootstrap`

## What is already implemented locally

I completed the MVP-1 implementation in a local MergeShip branch:

- branch: `feat/776-oauth-profile-bootstrap`
- commit: `2351a51`

### Implemented scope

1. Environment-based Appwrite setup for client and server.
2. Contributor profile bootstrap API.
3. Contributor profile fetch API.
4. Onboarding integration to bootstrap profile after GitHub identity resolution.
5. `.env.example` and setup documentation updates.

## API design

### `POST /api/profile/bootstrap`

Creates or updates contributor profile after OAuth login.

Request body:

```json
{
  "userId": "appwrite_user_id",
  "githubId": "github_provider_uid_or_handle",
  "username": "github_login",
  "avatarUrl": "optional",
  "name": "optional",
  "email": "optional"
}
```

Response:

- `200`: `{ ok: true, profile, action: "created" | "updated" }`
- `400`: missing required fields
- `503`: missing server env config
- `500`: internal failure

### `GET /api/profile/me?userId=<id>`

Fetches contributor profile by userId.

Response:

- `200`: `{ ok: true, profile }`
- `400`: missing userId
- `404`: profile not found
- `503`: missing server env config
- `500`: internal failure

## Data model (MVP)

Contributor document fields:

- `userId`
- `githubId`
- `username`
- `avatarUrl`
- `name`
- `email`
- `level` (default `L1`)
- `joinedAt`
- `updatedAt`

## Environment variables required

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
APPWRITE_ENDPOINT=
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_CONTRIBUTOR_COLLECTION_ID=
```

## Planned PR title

`feat(auth): github oauth onboarding and contributor profile bootstrap`

## Planned PR summary

- Add OAuth profile bootstrap and profile retrieval APIs.
- Integrate onboarding flow with bootstrap API call.
- Move Appwrite config to env-based setup.
- Add `.env.example` and setup docs updates.

## Notes

- This implementation is intentionally limited to MVP-1.
- Ranking, triage queue, and gamification are explicitly out of scope for this phase.
