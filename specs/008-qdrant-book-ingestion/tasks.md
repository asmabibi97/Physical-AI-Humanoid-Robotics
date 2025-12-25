# Tasks: Deploy FastAPI RAG Backend to Hugging Face Spaces

**Feature**: 008-qdrant-book-ingestion
**Generated**: 2025-12-17
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)
**Input**: User stories from spec.md + design from plan.md + contracts/ + data-model.md

## Implementation Strategy

**MVP Scope**: User Story 1 (Book Content Indexed for Search) with basic Hugging Face Spaces deployment, Qdrant connection, and ingestion pipeline.

**Approach**: Deploy existing backend to Hugging Face Spaces with proper Docker configuration and environment variable setup, then verify functionality.

---

## Phase 1: Setup Tasks

**Goal**: Prepare project structure and dependencies for Hugging Face Spaces deployment

- [x] T001 Create Hugging Face Spaces configuration files in project root
- [x] T002 Update Dockerfile for Hugging Face Spaces compatibility
- [x] T003 Update requirements.txt with compatible dependency versions
- [x] T004 Create .env.example with required environment variables
- [x] T005 Verify existing backend structure matches plan.md

---

## Phase 2: Foundational Tasks

**Goal**: Establish core infrastructure for Qdrant Cloud connection and API key management

- [x] T006 [P] Implement secure environment variable loading in src/utils/config.py
- [x] T007 [P] Verify Qdrant Cloud connection in src/services/qdrant_service.py
- [x] T008 [P] Verify Google Gemini API connection in src/services/embedding_service.py
- [x] T009 [P] Update startup health checks in src/api/health.py
- [x] T010 [P] Ensure collection creation on startup in src/main.py

---

## Phase 3: [US1] Book Content Indexed for Search

**Goal**: Connect to Qdrant Cloud, ingest Docusaurus book content, chunk and embed it, store in Qdrant with metadata

**Independent Test**: Run ingestion pipeline to load book content into Qdrant and verify collection contains expected vectors and metadata

- [x] T011 [US1] Implement ingestion endpoint in backend/src/api/routes/ingest.py
- [x] T012 [US1] Create ingestion service in backend/src/services/ingestion_service.py
- [x] T013 [US1] Implement text extraction from Docusaurus URL in backend/src/embedding_pipeline/content_extractor.py
- [x] T014 [US1] Implement text chunking logic (300-500 tokens) in backend/src/embedding_pipeline/text_processor.py
- [x] T015 [US1] Verify embedding generation with Gemini API in backend/src/services/embedding_service.py
- [x] T016 [US1] Implement upsert to Qdrant with metadata in backend/src/services/qdrant_service.py
- [x] T017 [US1] Test ingestion pipeline with sample Docusaurus book URL
- [x] T018 [US1] Verify Qdrant collection contains properly chunked content with metadata

---

## Phase 4: [US2] Real-time Chatbot Response Validation

**Goal**: Enable chatbot to respond to queries with information matching deployed book content

**Independent Test**: Query chatbot while viewing specific book pages and validate responses align with relevant content

- [x] T019 [US2] Implement chat endpoint in backend/src/api/routes/chat.py
- [x] T020 [US2] Create ask service in backend/src/services/ask_service.py
- [x] T021 [US2] Implement similarity search in Qdrant in backend/src/services/qdrant_service.py
- [x] T022 [US2] Implement response generation with Gemini in backend/src/services/response_service.py
- [x] T023 [US2] Add /ask endpoint for general queries in backend/src/api/routes/ask.py
- [x] T024 [US2] Add /ask-selected endpoint for constrained queries in backend/src/api/routes/ask.py
- [x] T025 [US2] Test /ask endpoint returns book-relevant answers
- [x] T026 [US2] Test /ask-selected endpoint constrains to selected text
- [x] T027 [US2] Validate 95%+ accuracy of responses against book content

---

## Phase 5: [US3] Ingestion Pipeline Execution

**Goal**: Ensure backend server runs properly with uvicorn and ingestion pipeline completes without errors

**Independent Test**: Run backend services with uvicorn and verify ingestion pipeline completes successfully

- [x] T028 [US3] Update main application startup in backend/src/main.py
- [x] T029 [US3] Create run_server.py for Hugging Face Spaces startup
- [x] T030 [US3] Test backend server starts without errors using uvicorn
- [x] T031 [US3] Verify Qdrant Cloud connection at startup
- [x] T032 [US3] Test complete ingestion pipeline execution
- [x] T033 [US3] Verify system handles authentication failures gracefully
- [x] T034 [US3] Verify system handles network issues during ingestion

---

## Phase 6: Hugging Face Spaces Deployment

**Goal**: Deploy backend to Hugging Face Spaces and verify all functionality works in production environment

- [x] T035 Configure Hugging Face Space with Docker runtime
- [x] T036 Set environment variables in Space Secrets
- [x] T037 Deploy backend to Hugging Face Space at asmabibi123/rag-chatbot
- [x] T038 Verify health endpoint works on deployed service
- [x] T039 Test ingestion of book content on deployed service
- [x] T040 Verify chat functionality on deployed service
- [x] T041 Test all API endpoints on deployed service
- [x] T042 Document deployment process and troubleshooting steps

---

## Dependencies

**User Story 1 (P1) → User Story 2 (P2)**: Chatbot functionality requires indexed content
**User Story 1 (P1) → User Story 3 (P3)**: Ingestion pipeline execution enables content indexing
**Foundational → All Stories**: Core infrastructure must be established before story-specific functionality

---

## Parallel Execution Examples

**User Story 1 Parallel Tasks**:
- T011 [P] [US1] Endpoint implementation
- T012 [P] [US1] Service implementation
- T013 [P] [US1] Content extraction
- T014 [P] [US1] Text chunking

**User Story 2 Parallel Tasks**:
- T019 [P] [US2] Chat endpoint
- T020 [P] [US2] Ask service
- T021 [P] [US2] Similarity search
- T022 [P] [US2] Response generation

---

## Acceptance Criteria

**User Story 1**: Qdrant collection contains properly chunked and embedded book content with metadata
**User Story 2**: `/ask` returns book-relevant answers, `/ask-selected` constrains to selected text
**User Story 3**: Backend server starts without errors using uvicorn, ingestion completes successfully
**Overall**: All API endpoints work correctly, 95%+ response accuracy, deployed on Hugging Face Spaces