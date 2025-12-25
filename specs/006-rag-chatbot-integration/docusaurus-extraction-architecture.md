# Architecture for Docusaurus Text Extraction

## Overview
This document outlines the architecture for extracting text content from a deployed Docusaurus site. The system will fetch the sitemap, extract content from each page, and prepare it for the embedding pipeline.

## Architecture Components

### 1. Sitemap Reader
**Purpose**: Fetch and parse the sitemap.xml to get all available page URLs

**Implementation**:
- HTTP client to fetch sitemap.xml from the deployed site
- XML parser to extract URLs
- Filter to exclude non-content pages (e.g., images, scripts, admin pages)

**Configuration**:
- Base URL of the deployed Docusaurus site
- Sitemap path (typically /sitemap.xml)
- URL filtering patterns

### 2. Content Fetcher
**Purpose**: Download HTML content from each page URL

**Implementation**:
- Asynchronous HTTP client for efficient fetching
- Rate limiting to avoid overwhelming the server
- Retry mechanism for failed requests
- Request headers to mimic a legitimate browser

**Configuration**:
- Request timeout settings
- Retry attempts and backoff strategy
- User agent string
- Rate limiting parameters

### 3. Content Extractor
**Purpose**: Parse HTML and extract meaningful text content

**Implementation**:
- HTML parsing using libraries like BeautifulSoup (Python) or Cheerio (Node.js)
- CSS selectors to target main content areas
- Extraction of different content types (headings, paragraphs, code blocks)
- Preservation of document structure

**Target Selectors** (typical Docusaurus selectors):
- Main content: `article`, `.markdown`, `.theme-doc-markdown`
- Headings: `h1`, `h2`, `h3`, `h4`
- Paragraphs: `p`
- Code blocks: `pre`, `code`
- Lists: `ul`, `ol`

### 4. Content Cleaner
**Purpose**: Clean and normalize extracted text

**Implementation**:
- Removal of HTML tags and special characters
- Handling of HTML entities
- Normalization of whitespace
- Removal of navigation elements, headers, footers

**Cleaning Operations**:
- Strip leading/trailing whitespace
- Replace multiple spaces with single space
- Convert HTML entities to plain text
- Remove navigation links and UI elements

## System Design

### Data Flow
```
Sitemap.xml → [Sitemap Reader] → URL List
URL List → [Content Fetcher] → HTML Content
HTML Content → [Content Extractor] → Raw Text
Raw Text → [Content Cleaner] → Clean Text
Clean Text → [Output] → Processing Pipeline
```

### Error Handling
- Network errors during sitemap fetching
- Invalid sitemap format
- HTTP errors during content fetching
- Parsing errors during content extraction
- Rate limiting from the target server

### Performance Considerations
- Parallel fetching of multiple URLs
- Caching of previously fetched content
- Efficient parsing algorithms
- Memory management for large documents

## Technical Implementation

### Technology Stack
- Python with requests, BeautifulSoup, and xml libraries
- Or Node.js with axios, cheerio, and xml2js libraries
- Async/await for efficient concurrent operations

### Configuration Parameters
- `base_url`: The URL of the deployed Docusaurus site
- `sitemap_path`: Path to sitemap.xml (default: /sitemap.xml)
- `request_timeout`: Timeout for HTTP requests (default: 30 seconds)
- `max_concurrent_requests`: Maximum number of parallel requests (default: 5)
- `retry_attempts`: Number of retry attempts for failed requests (default: 3)
- `rate_limit_delay`: Delay between requests to avoid rate limiting (default: 100ms)

### Output Format
The extractor will output structured data containing:
- `url`: The source URL
- `title`: Page title
- `headings`: List of headings with hierarchy
- `content`: Clean text content
- `metadata`: Additional page metadata

## Security Considerations
- Respect robots.txt and rate limits
- Validate all URLs before processing
- Handle authentication if required
- Secure handling of any credentials

## Scalability
- Process large sitemaps in chunks
- Implement checkpointing to resume interrupted processes
- Support incremental updates
- Monitor memory usage for large documents