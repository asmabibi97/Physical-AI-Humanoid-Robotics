# Qdrant Vector Storage Configuration

## Overview
This document outlines the configuration and setup of Qdrant vector database for storing document embeddings generated from the Docusaurus site. Qdrant will serve as the vector store for the RAG chatbot's retrieval system.

## Qdrant Collection Design

### Collection Schema
- **Collection Name**: `docusaurus_embeddings`
- **Vector Size**: 1024 (for Cohere embed-multilingual-v3.0 model)
- **Distance Metric**: Cosine
- **Vector Type**: float

### Payload Structure
Each record in Qdrant will contain:
```json
{
  "url": "string",
  "title": "string",
  "content": "string",
  "headings": ["string"],
  "chunk_index": "integer",
  "source_document": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Field Descriptions
- `url`: Original page URL from Docusaurus site
- `title`: Page title
- `content`: The text content of the chunk
- `headings`: Array of relevant headings for context
- `chunk_index`: Position of this chunk in the original document
- `source_document`: Identifier for the source document
- `created_at`: Timestamp when record was created
- `updated_at`: Timestamp when record was last updated

## Qdrant Configuration

### Connection Parameters
- **Host**: Qdrant server URL
- **Port**: 6333 (default) or as configured
- **API Key**: For secured instances
- **Timeout**: Request timeout configuration

### Collection Configuration
```python
collection_config = {
    "vector_size": 1024,
    "distance": "Cosine",
    "hnsw_config": {
        "m": 16,
        "ef_construct": 100,
        "full_scan_threshold": 10000
    },
    "optimizer_config": {
        "deleted_threshold": 0.2,
        "vacuum_min_vector_number": 1000
    },
    "wal_config": {
        "wal_capacity_mb": 32,
        "wal_segments_ahead": 0
    }
}
```

## Implementation Architecture

### Vector Store Class
```python
class QdrantVectorStore:
    def __init__(self, host, port=6333, api_key=None):
        self.client = qdrant_client.QdrantClient(
            host=host,
            port=port,
            api_key=api_key
        )
        self.collection_name = "docusaurus_embeddings"

    def create_collection(self):
        # Create collection with specified configuration
        pass

    def store_embeddings(self, chunks, embeddings):
        # Store chunks with their embeddings in Qdrant
        pass

    def search_similar(self, query_embedding, top_k=5):
        # Search for similar vectors to the query
        pass

    def delete_collection(self):
        # Delete the entire collection (for re-indexing)
        pass

    def update_record(self, record_id, payload):
        # Update a specific record
        pass
```

## Indexing Strategy

### Point Structure
Each point in Qdrant will have:
- **ID**: Unique identifier (UUID or hash of content)
- **Vector**: The embedding vector (1024-dimensional)
- **Payload**: Metadata associated with the chunk

### Batch Operations
- Use batch operations for efficient indexing
- Optimal batch size: 100-1000 points per batch
- Handle batch failures individually

## Search Configuration

### Search Parameters
- **Top-k**: Number of similar results to return (default: 5)
- **Score Threshold**: Minimum similarity score (default: 0.3)
- **With Payload**: Whether to return metadata with results
- **With Vector**: Whether to return vectors with results

### Filtering Options
- Filter by source URL
- Filter by document type
- Filter by date range
- Filter by content type

## Performance Optimization

### HNSW Index Configuration
- `m`: Max number of outgoing connections (default: 16)
- `ef_construct`: Size of the dynamic list for HNSW (default: 100)
- `full_scan_threshold`: When to switch to full scan (default: 10000)

### Optimizer Settings
- Configure optimizer for background operations
- Set appropriate thresholds for cleanup operations
- Balance between search performance and index optimization

## Security Considerations
- Use API keys for secured Qdrant instances
- Configure proper network security
- Validate all inputs before storing
- Implement proper access controls

## Error Handling
- Handle network connectivity issues
- Manage Qdrant server errors
- Handle duplicate key conflicts
- Implement retry mechanisms for failed operations

## Monitoring and Maintenance
- Monitor collection size and performance
- Track query response times
- Monitor resource usage (memory, disk)
- Implement backup and recovery procedures

## Configuration Parameters
- `host`: Qdrant server host (default: localhost)
- `port`: Qdrant server port (default: 6333)
- `api_key`: API key for secured instances
- `collection_name`: Name of the collection (default: docusaurus_embeddings)
- `vector_size`: Size of embedding vectors (default: 1024)
- `distance_metric`: Distance metric (default: Cosine)
- `batch_size`: Batch size for operations (default: 100)
- `timeout`: Request timeout in seconds (default: 30)
- `search_limit`: Maximum number of search results (default: 1000)

## Testing Strategy
- Unit tests for individual operations
- Integration tests with Qdrant instance
- Performance tests for search operations
- Error handling tests