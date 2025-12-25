# RAG Chatbot Embedding Pipeline Specification

## Overview
This specification outlines the embedding pipeline for the RAG chatbot that will extract text from a deployed Docusaurus site, generate embeddings using Cohere, and store them in Qdrant for retrieval.

## Goals
- Extract all meaningful content from the deployed Docusaurus site
- Clean and chunk the content appropriately for embedding
- Generate high-quality vector embeddings using Cohere
- Store embeddings in Qdrant with relevant metadata for efficient retrieval
- Ensure the pipeline is reliable, scalable, and maintainable

## Success Criteria
- Complete extraction of all meaningful book content from the live site
- Cleaned and consistently chunked text ready for embedding
- High-quality vector embeddings stored in Qdrant with metadata
- Pipeline executes reliably with proper error handling
- Generated embeddings enable accurate semantic search in the chatbot

## Requirements

### Functional Requirements
1. **Content Extraction**
   - Access the sitemap of the deployed Docusaurus site to collect all page URLs
   - Extract text content from each page while preserving semantic structure
   - Remove navigation, layout, and repeated UI elements
   - Preserve headings, paragraphs, and code blocks with context

2. **Text Processing**
   - Clean extracted text by removing HTML tags and special characters
   - Chunk content into consistent sizes suitable for embedding (max 512 tokens)
   - Maintain context between chunks (e.g., overlapping windows)
   - Preserve metadata (URL, headings, section context)

3. **Embedding Generation**
   - Use Cohere's embedding API to generate vector representations
   - Handle API rate limits and errors gracefully
   - Cache embeddings to avoid redundant API calls

4. **Vector Storage**
   - Store embeddings in Qdrant with relevant metadata
   - Include page URL, headings, and content in metadata
   - Configure appropriate vector dimensions and distance metrics

### Non-Functional Requirements
1. **Performance**
   - Process all pages within reasonable time limits
   - Handle API rate limits without failing
   - Support incremental updates for new content

2. **Reliability**
   - Handle network failures and retry appropriately
   - Log errors and progress for monitoring
   - Support resumable execution

3. **Security**
   - Secure API keys and credentials
   - Validate all inputs and URLs
   - Follow best practices for data handling

## Architecture

### Components
1. **Sitemap Reader**: Fetches and parses the Docusaurus sitemap to get all page URLs
2. **Content Extractor**: Downloads and extracts text content from each page
3. **Text Cleaner**: Removes HTML elements and cleans the text
4. **Chunker**: Splits content into appropriate chunks with context preservation
5. **Embedding Generator**: Calls Cohere API to generate embeddings
6. **Vector Store**: Stores embeddings in Qdrant with metadata
7. **Orchestrator**: Coordinates the entire pipeline flow

### Data Flow
1. Sitemap Reader → Get list of URLs
2. Content Extractor → Download and extract text from each URL
3. Text Cleaner → Clean and normalize text
4. Chunker → Split content into chunks
5. Embedding Generator → Generate vector embeddings
6. Vector Store → Store embeddings with metadata

## Implementation Details

### Sitemap Processing
- Fetch sitemap.xml from the deployed Docusaurus site
- Parse XML to extract all page URLs
- Filter out non-content pages (e.g., 404, API endpoints)

### Content Extraction
- Use web scraping techniques to extract main content
- Target specific HTML selectors (e.g., main content areas)
- Extract headings, paragraphs, and code blocks separately
- Preserve document structure in metadata

### Text Chunking
- Split content into chunks of approximately 500-800 tokens
- Use overlapping windows to maintain context
- Respect document boundaries (don't split between related sections)
- Include section headings in chunk context

### Embedding Configuration
- Use Cohere's embed-multilingual-v3.0 model
- Set appropriate input type (e.g., "search_document", "search_query")
- Handle different languages if needed

### Qdrant Configuration
- Create collection with appropriate vector dimensions (typically 1024 for Cohere)
- Set distance metric to Cosine
- Configure payload schema for metadata storage

## Error Handling
- Network timeouts and retries
- API rate limit handling
- Invalid URL handling
- Content extraction failures
- Embedding generation errors
- Database connection issues

## Testing Strategy
- Unit tests for each component
- Integration tests for end-to-end flow
- Performance tests for large document sets
- Error condition testing