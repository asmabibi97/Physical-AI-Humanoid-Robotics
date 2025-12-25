# Tasks: RAG Chatbot Integration

**Input**: Design documents from `specs/006-rag-chatbot-integration/`

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Initialize Python backend project in the `backend/` directory.
- [x] T002 Add dependencies to `backend/requirements.txt`: `fastapi`, `uvicorn`, `qdrant-client`, `langchain`, `requests`, `beautifulsoup4`, `lxml`.
- [x] T003 Configure basic FastAPI application structure in `backend/src/main.py`.

---

## Phase 2: User Story 1 - Ask a question about the book (Priority: P1) 🎯 MVP

**Goal**: Allow users to ask a question and get an answer from the book.

**Independent Test**: A user can open the chatbot, ask a question, and receive a relevant answer.

### Implementation for User Story 1

- [x] T004 [US1] Create a `ChatbotWidget` React component in `src/theme/ChatbotWidget/index.tsx`.
- [x] T005 [US1] Style the chatbot widget in `src/theme/ChatbotWidget/styles.module.css`.
- [x] T006 [US1] Add a `/chatbot` page at `src/pages/chatbot.mdx` and embed the `ChatbotWidget`.
- [x] T007 [US1] Add a link to the `/chatbot` page in the navbar and footer, by modifying `docusaurus.config.ts`.
- [x] T008 [US1] Implement the `/ask` endpoint in `backend/src/main.py` to handle POST requests.
- [x] T009 [US1] Implement Qdrant search logic in `backend/src/services/qdrant_service.py` to find relevant context.
- [x] T010 [US1] Implement LLM answer generation in `backend/src/services/rag_service.py`, using the context from Qdrant.
- [ ] T011 [US1] Connect the frontend `ChatbotWidget` to the `/ask` backend endpoint.

---

## Phase 3: User Story 2 - Answer based on selected text (Priority: P2)

**Goal**: Allow users to ask a question about a specific piece of selected text.

**Independent Test**: A user can select text, ask a question, and receive an answer relevant to that text.

### Implementation for User Story 2

- [ ] T012 [US2] Add functionality to the `ChatbotWidget` to detect and store user-selected text.
- [x] T013 [US2] Implement the `/ask-selected` endpoint in `backend/src/main.py`.
- [x] T014 [US2] Update `backend/src/services/rag_service.py` to handle requests that provide context directly, bypassing the Qdrant search.
- [ ] T015 [US2] Connect the frontend `ChatbotWidget` to the `/ask-selected` backend endpoint when a user asks a question about selected text.

---

## Phase 4: Embedding Pipeline Implementation

**Goal**: Create the complete embedding pipeline to extract content from Docusaurus site, generate embeddings, and store in Qdrant.

**Independent Test**: The pipeline can extract content from a Docusaurus site, create embeddings, and store them in Qdrant.

### Implementation for Embedding Pipeline

- [x] T016 [EP] Create sitemap reader in `backend/src/embedding_pipeline/sitemap_reader.py` to fetch URLs.
- [x] T017 [EP] Create content extractor in `backend/src/embedding_pipeline/content_extractor.py` to fetch and parse HTML.
- [x] T018 [EP] Create text processor in `backend/src/embedding_pipeline/text_processor.py` to clean and chunk text.
- [x] T019 [EP] Create Cohere embedder in `backend/src/embedding_pipeline/cohere_embedder.py` to generate embeddings.
- [x] T020 [EP] Create Qdrant store in `backend/src/embedding_pipeline/qdrant_store.py` to store embeddings.
- [x] T021 [EP] Create pipeline orchestrator in `backend/src/embedding_pipeline/pipeline.py` to coordinate all components.
- [x] T022 [EP] Create run script `backend/run_pipeline.py` to execute the pipeline from command line.
- [x] T023 [EP] Add `/run-embedding-pipeline` endpoint in `backend/src/main.py` to trigger pipeline via API.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T024 Update `quickstart.md` with final instructions.
- [x] T025 Write a brief `README.md` for the `backend` directory.
- [ ] T026 Add error handling and logging to all backend services.
- [ ] T027 Add environment variable validation for API keys.
- [ ] T028 Create API documentation for all endpoints.

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: Must be completed first.
- **User Story 1 (Phase 2)**: Depends on Setup.
- **User Story 2 (Phase 3)**: Depends on Setup and User Story 1.
- **Embedding Pipeline (Phase 4)**: Can be worked on in parallel with User Stories.
- **Polish (Phase 5)**: Depends on all user stories and pipeline being complete.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: User Story 1.
3. Deploy and validate that the core "ask a question" functionality works.

### Incremental Delivery

1. Add User Story 2 (Phase 3).
2. Complete the Embedding Pipeline (Phase 4).
3. Complete the Polish phase (Phase 5).
4. Deploy and validate the complete RAG chatbot functionality.