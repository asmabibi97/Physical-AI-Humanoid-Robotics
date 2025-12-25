# API Contract: Stats Endpoint

## Endpoint
`GET /stats`

## Description
Returns system statistics about the RAG system, specifically the total number of chunks stored in Qdrant.

## Request

### Headers
- `Content-Type: application/json`

### Query Parameters
None required

## Response

### Success Response (200 OK)
```json
{
  "total_chunks": 148,
  "last_ingestion_time": "2025-12-15T10:30:00Z",
  "indexed_books": [
    "https://example.com/book"
  ]
}
```

### Error Response (500 Internal Server Error)
```json
{
  "error": "Stats retrieval failed",
  "details": "Error retrieving statistics: [specific error message]"
}
```

## Validation Rules
- Response must include total_chunks as a non-negative integer
- last_ingestion_time should be in ISO 8601 format if present
- indexed_books should be an array of URLs

## Performance Requirements
- Should return response within 1 second for 95% of requests
- Should provide accurate count of stored chunks in Qdrant