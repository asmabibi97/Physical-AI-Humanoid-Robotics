# API Contract: Ingest Endpoint

## Endpoint
`POST /ingest`

## Description
Triggers the ingestion of Docusaurus book content into the RAG system. Crawls the specified book URL, chunks the content, generates embeddings using Gemini, and stores in Qdrant.

## Request

### Headers
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (if authentication is required)

### Body
```json
{
  "book_url": "https://example.com/book",
  "chunk_size": 400,
  "reindex": false
}
```

### Fields
- `book_url` (string, required): URL of the Docusaurus book to ingest
- `chunk_size` (integer, optional): Size of text chunks (default: 400, min: 100, max: 1000)
- `reindex` (boolean, optional): Whether to reindex existing content (default: false)

## Response

### Success Response (200 OK)
```json
{
  "status": "success",
  "total_chunks_processed": 150,
  "total_chunks_stored": 148,
  "processing_time": 12.5,
  "accuracy_score": 0.95
}
```

### Error Response (400 Bad Request)
```json
{
  "error": "Invalid URL format",
  "details": "The provided book_url is not a valid URL"
}
```

### Error Response (500 Internal Server Error)
```json
{
  "error": "Ingestion failed",
  "details": "Error during ingestion: [specific error message]"
}
```

## Validation Rules
- `book_url` must be a valid URL
- `chunk_size` must be between 100 and 1000
- `reindex` must be a boolean value

## Performance Requirements
- Should complete ingestion within 60 seconds for books up to 1000 pages
- Should achieve 95% success rate for valid book URLs