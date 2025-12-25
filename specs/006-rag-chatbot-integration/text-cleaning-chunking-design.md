# Text Cleaning and Chunking Mechanism Design

## Overview
This document outlines the design for cleaning and chunking text content extracted from Docusaurus pages. The mechanism will ensure that text is properly formatted for embedding generation while preserving semantic meaning and context.

## Text Cleaning Process

### 1. HTML Tag Removal
**Purpose**: Remove all HTML tags while preserving the text content

**Implementation**:
- Use regex or HTML parsing libraries to strip tags
- Preserve text content within tags
- Handle self-closing tags properly

**Example**:
```
Input:  <p>This is a <strong>paragraph</strong> with formatting.</p>
Output: This is a paragraph with formatting.
```

### 2. Special Character Handling
**Purpose**: Clean special characters and entities that may interfere with embeddings

**Operations**:
- Convert HTML entities to their character equivalents (e.g., &amp; → &)
- Remove or replace special symbols that don't add semantic value
- Normalize different types of quotes and hyphens
- Handle mathematical symbols and code-specific characters appropriately

### 3. Whitespace Normalization
**Purpose**: Standardize spacing for consistent text processing

**Operations**:
- Replace multiple consecutive spaces with single space
- Normalize line breaks (convert \r\n, \r to \n)
- Strip leading and trailing whitespace
- Preserve intentional paragraph breaks

### 4. Content Filtering
**Purpose**: Remove non-content elements that don't contribute to semantic meaning

**Filters**:
- Navigation elements
- Footer content
- Table of contents
- Sidebars and menus
- Code comments (in code blocks)

## Text Chunking Strategy

### 1. Chunk Size Guidelines
**Target Size**: 500-800 tokens (approximately 300-600 words)
- Balance between context retention and embedding quality
- Consider Cohere's token limits
- Optimize for semantic coherence

### 2. Chunking Methods

#### Method A: Fixed-Size Chunking
- Split text into fixed-length chunks
- Simple to implement but may break semantic boundaries

#### Method B: Semantic Chunking (Recommended)
- Split at natural boundaries (paragraphs, sections)
- Maintain semantic coherence within chunks
- Use document structure (headings, subheadings) as guidance

#### Method C: Overlapping Windows
- Create overlapping chunks to preserve context
- Each chunk includes some content from the previous chunk
- Helps with retrieval across chunk boundaries

### 3. Context Preservation
**Heading Inclusion**:
- Include relevant headings in each chunk
- Maintain heading hierarchy (H1, H2, H3, etc.)
- Add headings as context to the content they precede

**Section Boundaries**:
- Respect section boundaries when possible
- Don't split between related content
- Maintain logical flow within chunks

## Implementation Design

### Text Cleaner Class
```python
class TextCleaner:
    def __init__(self):
        self.html_pattern = re.compile(r'<[^>]+>')
        self.entity_map = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&apos;': "'",
            '&nbsp;': ' '
        }

    def clean_text(self, text):
        # Remove HTML tags
        text = self.remove_html_tags(text)
        # Handle entities
        text = self.handle_entities(text)
        # Normalize whitespace
        text = self.normalize_whitespace(text)
        # Additional cleaning operations
        return text

    def remove_html_tags(self, text):
        return self.html_pattern.sub('', text)

    def handle_entities(self, text):
        for entity, char in self.entity_map.items():
            text = text.replace(entity, char)
        return text

    def normalize_whitespace(self, text):
        # Replace multiple spaces with single space
        text = re.sub(r'\s+', ' ', text)
        # Strip leading/trailing whitespace
        return text.strip()
```

### Text Chunker Class
```python
class TextChunker:
    def __init__(self, max_chunk_size=600, overlap_size=100):
        self.max_chunk_size = max_chunk_size
        self.overlap_size = overlap_size

    def chunk_text(self, text, metadata=None):
        # Split text into sentences or paragraphs
        sentences = self.split_into_sentences(text)
        # Create chunks while respecting boundaries
        chunks = self.create_chunks(sentences)
        return chunks

    def split_into_sentences(self, text):
        # Use sentence boundary detection
        # Consider punctuation and context
        pass

    def create_chunks(self, sentences):
        # Implement semantic chunking logic
        # Consider headings and document structure
        pass
```

## Chunk Metadata Structure
Each chunk should include:
- `id`: Unique identifier for the chunk
- `content`: The actual text content
- `source_url`: Original page URL
- `headings`: Relevant headings for context
- `start_pos`: Starting position in original document
- `end_pos`: Ending position in original document
- `chunk_index`: Position in the sequence of chunks

## Quality Assurance

### Chunk Quality Metrics
1. **Semantic Coherence**: Each chunk should focus on a single topic
2. **Size Consistency**: Chunks should be within target size range
3. **Context Preservation**: Headings and context should be maintained
4. **Boundary Respect**: Chunks should respect document structure

### Validation Rules
- No chunk should exceed maximum token limit
- Chunks should not be too small (less than 50 tokens)
- Adjacent chunks should have appropriate overlap
- Metadata should be complete and accurate

## Error Handling
- Handle extremely long sentences that exceed chunk size
- Manage documents with no clear boundaries
- Handle malformed text content
- Ensure graceful degradation for edge cases

## Performance Considerations
- Efficient string operations to handle large documents
- Memory management for processing large texts
- Parallel processing for multiple documents
- Caching for repeated operations