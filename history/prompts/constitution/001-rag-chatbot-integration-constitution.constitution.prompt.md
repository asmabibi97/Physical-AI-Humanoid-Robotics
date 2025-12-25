---
ID: "001"
TITLE: "RAG Chatbot Integration Constitution"
STAGE: "constitution"
DATE_ISO: "2025-12-08"
SURFACE: "agent"
MODEL: "claude-sonnet-4-5-20250929"
FEATURE: "rag-chatbot-docusaurus"
BRANCH: "001-rag-chatbot-docusaurus"
USER: "user"
COMMAND: "/sp.constitution RAG Chatbot Integration (Minimal Qdrant Only)"
LABELS: ["rag", "chatbot", "docusaurus", "qdrant"]
LINKS:
  SPEC: "null"
  TICKET: "null"
  ADR: "null"
  PR: "null"
FILES_YAML:
  - "history/prompts/constitution/001-rag-chatbot-integration-constitution.constitution.prompt.md"
TESTS_YAML:
  - "null"
PROMPT_TEXT: """
/sp.constitution RAG Chatbot Integration (Minimal Qdrant Only)

Purpose:
Add a simple RAG chatbot to the Docusaurus book that answers questions based strictly on the book text already stored in Qdrant.

Scope:
- Backend:
  - Use a lightweight script/server to query Qdrant (Python or Node.js).
  - Perform embedding search → return top matches → send to LLM for answer.
  - Use the existing Qdrant data already uploaded (no re-ingestion).
  - Backend directory:
    D:\it course code\gemini cli\claude-code\RAG-DOCS-main\RAG-DOCS-main
- Frontend:
  - Add a chatbot UI to Docusaurus.
  - Provide:
    - Ask-anything mode (full-book)
    - "Answer based on selected text" mode
- Integration:
  - Add chatbot link in navbar/footer.
  - Embed chatbot panel inside book pages.

Success Criteria:
- Chatbot retrieves context only from Qdrant.
- Accurate, grounded answers.
- Fast, simple integration without extra services.

Constraints:
- Only Qdrant used for retrieval.
- Any LLM model can be used, but must rely only on retrieved context.
- No additional databases or SDKs required.

Not Building:
- Postgres/Neon integration
- ChatKit or OpenAI Agents backend
- Multi-source data ingestion
"""
RESPONSE_TEXT: "Created a Prompt History Record for the RAG Chatbot Integration Constitution."
OUTCOME: "Constitution document recorded for future reference."
EVALUATION: "The constitution provides clear purpose, scope, success criteria, constraints, and non-goals for the RAG Chatbot Integration using Qdrant."
---
