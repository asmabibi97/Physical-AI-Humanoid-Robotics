# Cohere Embedding Integration Specification

## Overview
This document outlines the integration with Cohere's embedding API to generate vector representations of text chunks. The integration will handle API calls, rate limiting, error handling, and caching.

## Cohere API Configuration

### API Endpoint
- Base URL: `https://api.cohere.ai/v1/embed`
- Method: POST
- Content-Type: `application/json`

### Authentication
- API Key: Required in header `Authorization: Bearer {api_key}`
- Environment variable: `COHERE_API_KEY`

### Model Selection
- Recommended model: `embed-multilingual-v3.0`
- Input type options:
  - `search_document`: For documents being indexed
  - `search_query`: For search queries
  - `classification`: For classification tasks
  - `clustering`: For clustering tasks

## Integration Architecture

### Embedding Generator Class
```python
class CohereEmbeddingGenerator:
    def __init__(self, api_key, model="embed-multilingual-v3.0", batch_size=96):
        self.api_key = api_key
        self.model = model
        self.batch_size = batch_size
        self.base_url = "https://api.cohere.ai/v1/embed"
        self.rate_limiter = RateLimiter()

    def generate_embeddings(self, texts, input_type="search_document"):
        # Validate inputs
        # Batch texts to optimize API usage
        # Make API calls with error handling
        # Return embeddings with metadata
        pass

    def _make_api_call(self, batch, input_type):
        # Prepare request payload
        # Make HTTP request
        # Handle response and errors
        pass
```

### Rate Limiting
- Requests per minute: Respect Cohere's rate limits
- Retry mechanism: Implement exponential backoff
- Concurrent requests: Limit to avoid hitting limits

## Implementation Details

### Request Format
```json
{
  "model": "embed-multilingual-v3.0",
  "texts": ["text1", "text2", ...],
  "input_type": "search_document",
  "embedding_types": ["float"],
  "truncate": "END"
}
```

### Response Format
```json
{
  "id": "request-id",
  "texts": ["text1", "text2", ...],
  "embeddings": {
    "float": [
      [0.1, 0.2, 0.3, ...],
      [0.4, 0.5, 0.6, ...]
    ]
  },
  "meta": {
    "api_version": {...},
    "billed_units": {...}
  }
}
```

### Error Handling
- HTTP 429: Rate limit exceeded - implement retry with backoff
- HTTP 400: Bad request - validate inputs before sending
- HTTP 401: Unauthorized - check API key
- Network errors: Implement retry mechanism
- API timeouts: Set appropriate timeout values

### Caching Strategy
- Cache embeddings to avoid redundant API calls
- Use content hash as cache key
- Implement cache expiration
- Store cache in local file or Redis

## Performance Optimization

### Batching
- Batch multiple texts in a single API call
- Optimal batch size: 96 texts per request (based on Cohere limits)
- Process large datasets in chunks

### Asynchronous Processing
- Use async/await for non-blocking API calls
- Process multiple batches concurrently
- Implement proper connection pooling

## Configuration Parameters
- `api_key`: Cohere API key (required)
- `model`: Embedding model name (default: embed-multilingual-v3.0)
- `batch_size`: Number of texts per API call (default: 96)
- `input_type`: Type of input for embedding (default: search_document)
- `max_retries`: Maximum retry attempts (default: 3)
- `timeout`: Request timeout in seconds (default: 30)
- `rate_limit_requests`: Max requests per minute (default: 100)
- `cache_enabled`: Whether to enable caching (default: true)

## Security Considerations
- Secure API key storage (environment variables)
- HTTPS for all API communications
- Input validation to prevent injection attacks
- Rate limiting to prevent abuse

## Monitoring and Logging
- Log API request/response for debugging
- Track API usage and costs
- Monitor rate limit status
- Error logging with appropriate detail level

## Testing Strategy
- Unit tests for API request/response handling
- Integration tests with mock Cohere API
- Performance tests for batching and rate limiting
- Error condition testing