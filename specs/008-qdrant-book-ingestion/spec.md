# Feature Specification: Qdrant Book Content Ingestion

**Feature Branch**: `008-qdrant-book-ingestion`
**Created**: 2025-12-04
**Status**: Draft
**Input**: User description: "Goal Connect the backend to Qdrant Cloud, ingest the deployed Docusaurus book content in clean text chunks, store embeddings, run the backend services, and verify the chatbot answers correctly from the live book. Scope - Use the deployed Docusaurus book URL as the source - Run the backend server and ingestion pipeline - Chunk and embed book content - Store embeddings in Qdrant Cloud - Verify chatbot responses against visible book pages Qdrant Configuration - Qdrant Cloud endpoint: https://f649a572-2cc1-4054-b389-81efd0eb9b91.europe-west3-0.gcp.cloud.qdrant.io - Authenticate using QDRANT_API_KEY - Create or reuse a single collection for book embeddings - Store metadata: - source_url - page_path - chunk_index - text_content Execution Steps - Run backend server using uvicorn - Run embedding pipeline to fetch book content - Extract and clean text from deployed book pages - Split text into chunks (300–500 tokens) - Generate embeddings and upsert into Qdrant - Confirm data exists in Qdrant collection - Open deployed book in browser and visually verify content - Query chatbot while viewing the book to confirm alignment Validation & Success Criteria - Backend server starts without errors - Embedding pipeline completes successfully - Qdrant collection contains vectors - `/ask` returns book-relevant answers - `/ask-selected` answers are constrained to selected book text - Chatbot responses match visible book content"

## Clarifications

### Session 2025-12-04

- Q: Which embedding model should be used for generating embeddings? → A: Use Gemini
- Q: Should the system require a Google API key for Gemini integration? → A: Add Google API key as a required environment variable
- Q: How should API keys be securely handled in the system? → A: Add requirement to securely store API keys in environment variables only
- Q: What should be the target accuracy for chatbot responses? → A: Set 95% accuracy for chatbot responses with automated testing

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Book Content Indexed for Search (Priority: P1)

An AI researcher wants to ask questions about the content of a deployed Docusaurus book and receive accurate answers based on the book's content. The system should connect to Qdrant Cloud, ingest the book content in clean text chunks, and store embeddings so that the chatbot can retrieve relevant information.

**Why this priority**: This is the foundational functionality - without properly indexed book content, the chatbot cannot provide accurate answers to users' queries.

**Independent Test**: Can be fully tested by running the ingestion pipeline to load book content into Qdrant and verifying that the collection contains the expected vectors and metadata.

**Acceptance Scenarios**:

1. **Given** that the Docusaurus book is deployed at a URL, **When** the ingestion pipeline runs, **Then** the Qdrant collection contains properly chunked and embedded book content with metadata
2. **Given** that book content has been successfully ingested into Qdrant, **When** a user queries the chatbot about book content, **Then** the chatbot returns relevant answers based on the book

---

### User Story 2 - Real-time Chatbot Response Validation (Priority: P2)

A developer wants to verify that the chatbot responds to queries with information that matches the actual content of the deployed book. The system should enable comparison between chatbot answers and the visible book content during testing.

**Why this priority**: This ensures accuracy and reliability of the chatbot responses, preventing users from receiving incorrect information.

**Independent Test**: Can be tested by querying the chatbot while viewing specific book pages and validating that responses align with the relevant content.

**Acceptance Scenarios**:

1. **Given** the backend server is running and Qdrant collection has book embeddings, **When** a user makes a query using `/ask`, **Then** the response is relevant to the book content
2. **Given** a specific book section is visible to the user, **When** a user makes a query using `/ask-selected` about that section, **Then** the response is constrained to information from that selected text

---

### User Story 3 - Ingestion Pipeline Execution (Priority: P3)

A system administrator needs to run the backend server and embedding pipeline to keep the book content index up to date with the deployed Docusaurus book.

**Why this priority**: Ensures the system can be operated in a production environment and maintained effectively.

**Independent Test**: Can be tested by running the backend services with uvicorn and verifying that the ingestion pipeline completes successfully without errors.

**Acceptance Scenarios**:

1. **Given** QDRANT_API_KEY is configured and cloud endpoint is accessible, **When** the backend server starts using uvicorn, **Then** it initializes without errors and connects to Qdrant Cloud

---

### Edge Cases

- What happens when the Docusaurus book URL is temporarily unavailable during ingestion?
- How does the system handle extremely large book documents that exceed memory limits?
- What occurs when the Qdrant Cloud service is unreachable during indexing?
- How does the system handle authentication failures with QDRANT_API_KEY?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST connect to Qdrant Cloud at the specified endpoint: https://f649a572-2cc1-4054-b389-81efd0eb9b91.europe-west3-0.gcp.cloud.qdrant.io
- **FR-002**: System MUST authenticate to Qdrant Cloud using the QDRANT_API_KEY environment variable
- **FR-003**: System MUST fetch content from the deployed Docusaurus book URL and parse it to extract clean text
- **FR-004**: System MUST split extracted text into chunks of 300-500 tokens for optimal embedding
- **FR-005**: System MUST generate embeddings for each text chunk using the Gemini API
- **FR-006**: System MUST store embeddings in a Qdrant Cloud collection with associated metadata: source_url, page_path, chunk_index, and text_content
- **FR-007**: System MUST provide an `/ask` endpoint that retrieves relevant book content and generates responses based on it
- **FR-008**: System MUST provide an `/ask-selected` endpoint that constrains responses to specific book text provided by the user
- **FR-009**: System MUST start without errors when launched using uvicorn
- **FR-010**: System MUST verify the existence of the Qdrant collection and create it if it doesn't exist
- **FR-011**: System MUST authenticate to the Gemini API using the GOOGLE_API_KEY environment variable
- **FR-012**: System MUST securely store all API keys in environment variables only, never in code or configuration files

### Key Entities *(include if feature involves data)*

- **Book Content Chunk**: Represents a segment of text from the Docusaurus book, containing the text content, source URL, page path, and chunk index position
- **Embedding Vector**: Represents a numerical representation of text content generated using the Gemini API that enables semantic similarity search
- **Qdrant Collection**: Container for storing embedding vectors with associated metadata for efficient retrieval
- **Query Request**: Contains a user's question and potentially selected text for targeted responses

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Backend server starts successfully without errors when launched using uvicorn
- **SC-002**: Embedding pipeline completes successfully and ingests all book content from the Docusaurus URL
- **SC-003**: Qdrant collection contains the expected number of vectors after ingestion with proper metadata
- **SC-004**: The `/ask` endpoint returns book-relevant answers that accurately reflect the content of the deployed book
- **SC-005**: The `/ask-selected` endpoint returns answers that are constrained to the selected book text provided by the user
- **SC-006**: Chatbot responses match visible book content with greater than 95% accuracy during automated and manual verification
