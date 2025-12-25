# API Contract: Chat Endpoint

## Endpoint
`POST /chat`

## Description
Accepts a user question and returns an AI-generated answer based on the indexed book content. Performs similarity search in Qdrant and uses Gemini to generate contextual answers.

## Request

### Headers
- `Content-Type: application/json`

### Body
```json
{
  "question": "What is the main concept discussed in chapter 3?",
  "top_k": 5
}
```

### Fields
- `question` (string, required): The user's question about the book content
- `top_k` (integer, optional): Number of results to return (default: 5, min: 1, max: 20)

## Response

### Success Response (200 OK)
```json
{
  "answer": "The main concept discussed in chapter 3 is retrieval augmented generation...",
  "source_chunks": [
    {
      "id": "chunk-123",
      "text_content": "Retrieval augmented generation combines...",
      "source_url": "https://example.com/book/chapter3",
      "page_path": "/book/chapter3",
      "chunk_index": 0
    }
  ],
  "confidence_score": 0.87,
  "accuracy_score": 0.92
}
```

### Error Response (400 Bad Request)
```json
{
  "error": "Question cannot be empty",
  "details": "The question field is required and cannot be empty"
}
```

### Error Response (500 Internal Server Error)
```json
{
  "error": "Chat processing failed",
  "details": "Error processing question: [specific error message]"
}
```

## Validation Rules
- `question` must not be empty
- `top_k` must be between 1 and 20

## Performance Requirements
- Should return response within 5 seconds for 90% of requests
- Should maintain 90% answer accuracy based on source material