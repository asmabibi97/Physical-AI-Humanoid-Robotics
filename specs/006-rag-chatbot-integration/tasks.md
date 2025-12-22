# Tasks: RAG Chatbot Integration

**Input**: Design documents from `specs/006-rag-chatbot-integration/`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize Python backend project in the `backend/` directory.
- [ ] T002 Add dependencies to `backend/requirements.txt`: `fastapi`, `uvicorn`, `qdrant-client`, `langchain`.
- [ ] T003 Configure basic FastAPI application structure in `backend/src/index.ts` (renaming to `backend/src/main.py`).

---

## Phase 2: User Story 1 - Ask a question about the book (Priority: P1) 🎯 MVP

**Goal**: Allow users to ask a question and get an answer from the book.

**Independent Test**: A user can open the chatbot, ask a question, and receive a relevant answer.

### Implementation for User Story 1

- [ ] T004 [US1] Create a `ChatbotWidget` React component in `src/theme/ChatbotWidget/index.tsx`.
- [ ] T005 [US1] Style the chatbot widget in `src/theme/ChatbotWidget/styles.module.css`.
- [ ] T006 [US1] Add a `/chatbot` page at `src/pages/chatbot.md` and embed the `ChatbotWidget`.
- [ ] T007 [US1] Add a link to the `/chatbot` page in the navbar and footer, by modifying `docusaurus.config.ts`.
- [ ] T008 [US1] Implement the `/ask` endpoint in `backend/src/main.py` to handle POST requests.
- [ ] T009 [US1] Implement Qdrant search logic in `backend/src/services/qdrant_service.py` to find relevant context.
- [ ] T010 [US1] Implement LLM answer generation in `backend/src/services/rag_service.py`, using the context from Qdrant.
- [ ] T011 [US1] Connect the frontend `ChatbotWidget` to the `/ask` backend endpoint.

---

## Phase 3: User Story 2 - Answer based on selected text (Priority: P2)

**Goal**: Allow users to ask a question about a specific piece of selected text.

**Independent Test**: A user can select text, ask a question, and receive an answer relevant to that text.

### Implementation for User Story 2

- [ ] T012 [US2] Add functionality to the `ChatbotWidget` to detect and store user-selected text.
- [ ] T013 [US2] Implement the `/ask-selected` endpoint in `backend/src/main.py`.
- [ ] T014 [US2] Update `backend/src/services/rag_service.py` to handle requests that provide context directly, bypassing the Qdrant search.
- [ ] T015 [US2] Connect the frontend `ChatbotWidget` to the `/ask-selected` backend endpoint when a user asks a question about selected text.

---

## Phase 4: Polish & Cross-Cutting Concerns

- [ ] T016 Update `quickstart.md` with final instructions.
- [ ] T017 Write a brief `README.md` for the `backend` directory.

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: Must be completed first.
- **User Story 1 (Phase 2)**: Depends on Setup.
- **User Story 2 (Phase 3)**: Depends on Setup, but can be worked on in parallel with User Story 1.
- **Polish (Phase 4)**: Depends on all user stories being complete.

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup.
2.  Complete Phase 2: User Story 1.
3.  Deploy and validate that the core "ask a question" functionality works.

### Incremental Delivery

1.  Add User Story 2 (Phase 3).
2.  Deploy and validate the "answer based on selected text" functionality.
3.  Complete the Polish phase.
