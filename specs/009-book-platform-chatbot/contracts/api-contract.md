# API Contract: Interactive Book Platform with Embedded Chatbot

## Overview
This document defines the API contracts for the Interactive Book Platform with Embedded Chatbot. These contracts specify the interface between the frontend application and the backend services.

## Base URL
```
https://rag-chatbot-backend-production-83ba.up.railway.app/
```

## Authentication
No authentication required for public endpoints. API keys are managed server-side for external services (Qdrant, Cohere, Google).

## Endpoints

### Health Check
```
GET /health
```

#### Description
Check the health status of the system, including connectivity to Qdrant and AI services.

#### Response
```json
{
  "status": "string (healthy|degraded|unhealthy)",
  "qdrant_connected": "boolean",
  "qdrant_collection_exists": "boolean",
  "gemini_connected": "boolean",
  "qdrant_host": "string",
  "collection_name": "string",
  "timestamp": "string (ISO 8601 format)"
}
```

### Chat Endpoint
```
POST /chat
```

#### Description
Process user questions and return AI-generated answers based on indexed book content.

#### Request Body
```json
{
  "question": "string (required)",
  "top_k": "integer (optional, default: 5, range: 1-20)"
}
```

#### Response
```json
{
  "answer": "string",
  "source_chunks": [
    {
      "text": "string",
      "source_url": "string",
      "page_path": "string",
      "confidence": "float"
    }
  ],
  "confidence_score": "float",
  "accuracy_score": "float"
}
```

#### Error Responses
- `400 Bad Request`: Invalid input (empty question, invalid top_k)
- `500 Internal Server Error`: Error processing question

### Ingest Endpoint
```
POST /ingest
```

#### Description
Ingest book content, create embeddings, and store in Qdrant vector database.

#### Request Body
```json
{
  "book_url": "string (required)",
  "chunk_size": "integer (optional, default: 400)",
  "reindex": "boolean (optional, default: false)"
}
```

#### Response
```json
{
  "chunks_stored": "integer",
  "status": "string",
  "message": "string"
}
```

#### Error Responses
- `400 Bad Request`: Invalid input parameters
- `500 Internal Server Error`: Error during ingestion

### Stats Endpoint
```
GET /stats
```

#### Description
Retrieve system statistics about indexed content.

#### Response
```json
{
  "total_chunks": "integer",
  "last_ingestion_time": "string (ISO 8601 format) or null",
  "indexed_books": "array of strings"
}
```

#### Error Responses
- `500 Internal Server Error`: Error retrieving statistics

## Error Response Format
All error responses follow this format:
```json
{
  "detail": "string (error message)"
}
```

## Rate Limits
- Standard rate limiting applies (specific limits to be configured based on deployment)
- Clients should implement appropriate retry logic with exponential backoff

## Versioning
API versioning is handled through the base URL and follows semantic versioning principles. Current API is version 1.0.

## Data Formats
- Request/Response: JSON
- Content encoding: UTF-8
- Date format: ISO 8601 (YYYY-MM-DDTHH:MM:SS.ssssss)

## Security
- All communication should be over HTTPS
- Sensitive API keys are stored server-side and not exposed to clients
- Input validation is performed on all endpoints
- Sanitization of user inputs is performed where appropriate