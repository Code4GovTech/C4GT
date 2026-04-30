# DMP 2026 Proposal Pack (Shivam Pal)

This document contains 3 proposal drafts optimized for:
- 2 hours/day availability
- full-stack + backend + devops + ML profile
- better selection probability (fit + execution realism)

---

## Proposal 1 (Primary) - Issue #774

**Ticket:** [#774 - MergeShip](https://github.com/Code4GovTech/C4GT/issues/774)  
**Title Suggestion:** MergeShip Contributor-Maintainer Orchestration Core (MVP)

### Why this project (short note for application)
This project matches my strongest stack areas: backend APIs, full-stack workflow design, integration engineering, and practical DevOps. I plan to focus on an MVP that improves contributor onboarding and maintainers' triage workflow with measurable outcomes.

### Goals
- [ ] Build GitHub OAuth based onboarding flow with contributor profile bootstrap.
- [ ] Implement L1-L3 ranking engine using deterministic scoring (initial rules + configurable weights).
- [ ] Build PR triage API with maintainers' priority stack and assignment recommendations.
- [ ] Implement basic quest/XP pipeline (first issue linked, first PR opened, first PR merged, first review).
- [ ] Deliver midpoint demo with contributor and maintainer dashboard views.

### Expected Outcome
An MVP platform where:
- contributors can authenticate via GitHub, see rank and suggested next tasks,
- maintainers can view sorted PR/task queues and assign work faster,
- platform tracks progress through transparent XP and milestone events.

### Acceptance Criteria
- User can sign in via GitHub OAuth and create a profile successfully.
- Rank engine produces stable L1-L3 output for sample contributor profiles.
- Maintainer queue API returns sortable, filterable PR/task recommendations.
- Quest/XP events are persisted and visible on contributor dashboard.
- Docker-based local setup and one-click run instructions are available.

### Implementation Details
- **Backend:** Node.js + Express modular services (`auth`, `ranking`, `triage`, `quests`)
- **Frontend:** React/Next dashboard pages for contributor + maintainer views
- **Database:** MongoDB collections for user profile, rank snapshots, quest events
- **Integrations:** GitHub OAuth + GitHub API ingestion for contribution stats
- **DevOps:** Docker compose, env templates, CI lint/test checks
- **AI Scope (MVP-safe):** Start with template-based issue decomposition; optional LLM hook behind feature flag

### 2-hour/day execution plan (realistic)
- **Week 1:** setup, auth, schema, basic profile flow
- **Week 2:** ranking engine + tests + initial dashboard cards
- **Week 3:** PR triage API + maintainer queue UI
- **Week 4:** quest/XP events + docs + polish + demo video

### Risk & Mitigation
- **Risk:** Full custom LLM can exceed timeline  
  **Mitigation:** deliver deterministic decomposition templates first; keep LLM integration optional.
- **Risk:** GitHub API limits  
  **Mitigation:** cached snapshots and background sync.

### Suggested issue comment (human tone)
I am interested in working on this with an MVP-first approach. I can contribute consistently (~2 hours/day) and focus on a production-friendly orchestration core: GitHub OAuth onboarding, deterministic L1-L3 ranking, PR triage APIs, and quest/XP tracking.  
If this scope looks good, I can share a milestone-wise implementation plan and begin with auth + ranking engine foundation.

---

## Proposal 2 (Backup A) - Issue #748

**Ticket:** [#748 - Finternet Verifiable Presentations + ZK Selective Disclosure](https://github.com/Code4GovTech/C4GT/issues/748)  
**Title Suggestion:** UNITS Credential Verification Pipeline with Selective Disclosure MVP

### Why this project
This aligns with my backend + security engineering interest. I can contribute by building a reliable verification service with clear API contracts and auditability.

### Goals
- [ ] Build credential verification API for VP validation workflow.
- [ ] Implement selective disclosure proof handling path (MVP-focused).
- [ ] Add robust validation/error taxonomy for malformed credentials/proofs.
- [ ] Provide audit logs and verification traces for maintainers/debugging.
- [ ] Add integration tests with sample credential payloads.

### Expected Outcome
A working backend verification module that accepts VP payloads, validates required claims selectively, and returns deterministic verification results with trace IDs.

### Acceptance Criteria
- API handles valid/invalid VP payloads deterministically.
- Selective-disclosure validation path is implemented for target fields.
- Verification responses include trace metadata and machine-readable errors.
- Test suite covers positive, negative, and replay-like edge cases.

### Implementation Details
- **Backend:** Python/FastAPI or Node/Express (as per project conventions)
- **Security:** strict schema + signature/proof validation pipeline
- **Observability:** structured logs + correlation IDs
- **DevOps:** reproducible local setup + CI validation tests

### 2-hour/day plan
- **Week 1:** read existing flow, schema contracts, API skeleton
- **Week 2:** core VP validation + error taxonomy
- **Week 3:** selective disclosure + logging + integration tests
- **Week 4:** hardening, docs, and maintainers' review iteration

---

## Proposal 3 (Backup B) - Issue #749

**Ticket:** [#749 - Finternet MCP Server for UNITS API](https://github.com/Code4GovTech/C4GT/issues/749)  
**Title Suggestion:** MCP Adapter Layer for UNITS API with Reliability Guardrails

### Why this project
Strong fit for backend/platform work: API adapter design, tool contracts, reliability, and maintainability.

### Goals
- [ ] Build MCP server wrapper for prioritized UNITS API actions.
- [ ] Add typed tool contracts and schema-level validation.
- [ ] Implement retry/fallback for unstable upstream responses.
- [ ] Add response caching for repetitive reads where safe.
- [ ] Add telemetry for latency/error rate per tool endpoint.

### Expected Outcome
An MCP server integration layer that agents/tools can use with stable contracts and improved operational reliability.

### Acceptance Criteria
- Core MCP tools are discoverable and executable end-to-end.
- Validation rejects malformed tool calls with clear error structure.
- Retry and fallback logic handles transient failures correctly.
- Logs/metrics show per-tool performance and failure context.

### Implementation Details
- **Backend:** adapter modules around UNITS APIs
- **Contracts:** JSON schema validation for tool input/output
- **Reliability:** timeout/retry circuit, defensive response parsing
- **DevOps:** dockerized local run + smoke tests in CI

### 2-hour/day plan
- **Week 1:** contract design + baseline tools
- **Week 2:** robust error handling + retries + caching
- **Week 3:** telemetry + integration tests + docs
- **Week 4:** maintainers' feedback loop + refinement

---

## Final Submission Strategy

1. Submit **Proposal 1 (#774)** as primary.
2. Keep **#748** and **#749** as polished backups.
3. Before submitting, add one meaningful issue comment and one small starter contribution (docs/test/setup) for the primary ticket.
4. Keep scope realistic and milestone-bound; avoid overpromising custom-LLM-heavy first deliverable.

---

## Quick Personal Pitch (can reuse in forms)

I have been contributing consistently to open-source projects in backend, full-stack, and CI/dev workflows. I prefer shipping maintainable increments with clear test coverage and practical documentation. For DMP 2026, I am targeting a milestone-driven implementation with realistic scope and consistent execution.
