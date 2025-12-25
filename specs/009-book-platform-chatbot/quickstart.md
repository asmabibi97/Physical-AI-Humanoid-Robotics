# Quickstart Guide: Interactive Book Platform with Embedded Chatbot

## Overview
This guide provides instructions for setting up and running the Interactive Book Platform with Embedded Chatbot. The platform consists of a Docusaurus-based frontend with a FastAPI backend that connects to Qdrant for content storage and Cohere for AI responses.

## Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- Qdrant Cloud account with API key
- Cohere API key
- Git

## Setup Instructions

### 1. Clone and Navigate to Repository
```bash
git clone [repository-url]
cd my-website
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

### 3. Environment Variables
Create `.env` file in the backend directory:
```env
QDRANT_URL=https://your-qdrant-cluster-url
QDRANT_API_KEY=your-qdrant-api-key
COHERE_API_KEY=your-cohere-api-key
GOOGLE_API_KEY=your-google-api-key (optional, for fallback)
CHUNK_SIZE=400
```

### 4. Frontend Setup
```bash
cd ../
npm install
```

### 5. Configure Docusaurus
The chatbot backend URL is configured in `docusaurus.config.ts`:
```typescript
// In docusaurus.config.ts
plugins: [
  function() {
    return {
      name: 'inject-backend-url',
      injectHtmlTags() {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        return {
          headTags: [
            {
              tagName: 'script',
              innerHTML: `window.CHATBOT_BACKEND_URL = "${backendUrl}";`,
            },
          ],
        };
      },
    };
  },
],
```

## Running the Application

### 1. Start Backend Server
```bash
cd backend
python -m uvicorn src.api.main:app --host 0.0.0.0 --port 8000
```

### 2. Start Frontend (in new terminal)
```bash
cd my-website  # root directory
npm run start
```

## Ingesting Book Content

### 1. Prepare Your Content
Ensure your book content is available via a URL or local files that can be processed.

### 2. Ingest via API
```bash
curl -X POST http://localhost:8000/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "book_url": "https://your-book-url.com",
    "chunk_size": 400,
    "reindex": false
  }'
```

### 3. Verify Ingestion
Check stats to confirm content was ingested:
```bash
curl http://localhost:8000/stats
```

## Using the Platform

### 1. Access the Platform
Open your browser to `http://localhost:3000` (or your deployed URL)

### 2. Navigate Content
- Use the header navigation to access different modules
- Browse the home page to see all available modules
- Click on module widgets to access specific content

### 3. Interact with Chatbot
- The chatbot widget appears on the right side of the screen
- Type questions about the book content
- Responses will include source references to the original content

## API Endpoints

### Backend Endpoints
- `GET /health` - Check system health
- `POST /chat` - Get AI response to questions
- `POST /ingest` - Ingest new book content
- `GET /stats` - Get system statistics

### Frontend Components
- `/chatbot` - Dedicated chatbot page
- Chatbot widget - Available on all pages as a floating element

## Troubleshooting

### Common Issues

1. **Chatbot not responding**:
   - Verify backend is running
   - Check environment variables are set correctly
   - Confirm Qdrant and Cohere API keys are valid

2. **Content not displaying**:
   - Ensure content has been properly ingested
   - Check that the correct URLs are configured

3. **Frontend build errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Verify Node.js version is compatible

### Environment Variables
Make sure all required environment variables are set:
- `REACT_APP_BACKEND_URL` - Points to your backend API
- Backend .env file with Qdrant and API keys

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages).
Set the `REACT_APP_BACKEND_URL` environment variable to point to your deployed backend.

### Backend Deployment
The backend can be deployed to cloud platforms (Railway, Heroku, AWS, etc.).
Ensure environment variables are configured in the deployment environment.

## Next Steps

1. Ingest your book content using the `/ingest` endpoint
2. Test the chat functionality with sample questions
3. Customize the UI to match your branding
4. Add additional modules and content as needed