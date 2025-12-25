# Data Model: Interactive Book Platform with Embedded Chatbot

## Entity Definitions

### Book Content
**Description**: Represents the educational material organized in hierarchical structure
**Fields**:
- `id`: Unique identifier for the content piece
- `title`: Title of the content piece
- `content_type`: Type of content (Introduction, Module, Sub-Chapter, Section)
- `content`: The actual text content
- `parent_id`: Reference to parent content (null for root level)
- `position`: Order position within parent
- `metadata`: Additional metadata (author, date, tags)
- `path`: URL-friendly path for navigation

**Relationships**:
- Parent-child relationship with other Book Content entities
- One-to-many with Content Chunk entities

### Content Chunk
**Description**: Represents a processed chunk of book content used for AI queries
**Fields**:
- `id`: Unique identifier for the chunk
- `content_id`: Reference to the original Book Content
- `text`: The text content of the chunk
- `embedding_vector`: Vector representation for similarity search
- `metadata`: Additional metadata (page, section, source_url)
- `position_in_content`: Position within the original content

**Relationships**:
- Many-to-one with Book Content entity
- Used by Chat Session for context retrieval

### User Session
**Description**: Represents the user's current position and interaction state within the book
**Fields**:
- `session_id`: Unique identifier for the session
- `user_id`: Identifier for the user (anonymous if not logged in)
- `current_position`: Current location in the book (content_id and scroll position)
- `last_access_time`: Timestamp of last activity
- `preferences`: User preferences (theme, reading settings)

**Relationships**:
- One-to-many with Chat Session entities

### Chat Session
**Description**: Represents a conversation between user and chatbot
**Fields**:
- `session_id`: Unique identifier for the chat session
- `user_session_id`: Reference to the User Session
- `created_at`: Timestamp of session creation
- `last_message_at`: Timestamp of last message
- `context_content`: Reference to content being discussed

**Relationships**:
- Many-to-one with User Session entity
- One-to-many with Chat Message entities

### Chat Message
**Description**: Represents a single message in a chat conversation
**Fields**:
- `message_id`: Unique identifier for the message
- `chat_session_id`: Reference to the Chat Session
- `sender`: 'user' or 'bot'
- `content`: The message text
- `timestamp`: When the message was sent
- `sources`: List of content chunks used to generate the response

**Relationships**:
- Many-to-one with Chat Session entity

### Module
**Description**: Represents a major section of the book containing related content
**Fields**:
- `module_id`: Unique identifier for the module
- `title`: Title of the module
- `description`: Brief description of the module
- `position`: Order position in the book structure
- `status`: Published/draft status

**Relationships**:
- One-to-many with Book Content entities
- Contains multiple Sub-Chapter entities

## Validation Rules

### Book Content Validation
- Title must not be empty
- Content type must be one of: Introduction, Module, Sub-Chapter, Section
- Position must be a non-negative integer
- Path must be URL-friendly (alphanumeric, hyphens, underscores only)

### Content Chunk Validation
- Text must not be empty
- Embedding vector must have appropriate dimensions (1024 for Cohere)
- Content reference must point to existing Book Content

### User Session Validation
- Session ID must be unique
- Last access time must be recent (not older than 30 days for active sessions)

### Chat Message Validation
- Content must not exceed 1000 characters
- Sender must be either 'user' or 'bot'
- Timestamp must be within the chat session timeframe

## State Transitions

### Chat Session States
1. **Created**: Session initiated when user first interacts with chatbot
2. **Active**: Session has ongoing conversation
3. **Inactive**: No activity for more than 30 minutes
4. **Closed**: Session explicitly ended by user or system cleanup

### Content Processing States
1. **Queued**: Content submitted for chunking and embedding
2. **Processing**: Embeddings being generated
3. **Indexed**: Content available for search and retrieval
4. **Available**: Ready for chatbot queries

## API Data Contracts

### Request/Response Models

#### Chat Request Model
```json
{
  "question": "string (required)",
  "top_k": "integer (optional, default: 5)",
  "session_id": "string (optional)"
}
```

#### Chat Response Model
```json
{
  "answer": "string",
  "source_chunks": "array of chunk objects",
  "confidence_score": "float",
  "accuracy_score": "float"
}
```

#### Module List Response Model
```json
{
  "modules": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "position": "integer",
      "sub_chapters": [
        {
          "id": "string",
          "title": "string",
          "position": "integer"
        }
      ]
    }
  ]
}
```

#### Content Navigation Model
```json
{
  "current_content": {
    "id": "string",
    "title": "string",
    "content_type": "string",
    "path": "string"
  },
  "navigation_tree": "hierarchical structure of book content"
}
```