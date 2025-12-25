# Data Model: RAG Chatbot

This document defines the data models for the RAG chatbot feature.

## Entities

### Query

-   **description**: Represents a user's question.
-   **fields**:
    -   `text`: string

### Context

-   **description**: Represents the retrieved text from Qdrant.
-   **fields**:
    -   `chunks`: array of strings

### Answer

-   **description**: Represents the final response from the LLM.
-   **fields**:
    -   `text`: string
