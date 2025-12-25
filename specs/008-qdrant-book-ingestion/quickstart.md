# Quickstart: Qdrant Book Content Ingestion with Gemini

## Prerequisites

1. Python 3.11+
2. Qdrant Cloud account with API key
3. Google Cloud account with Gemini API access and API key
4. Deployed Docusaurus book URL
5. Git

## Setup

1. **Clone the repository** (if needed)
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment and install dependencies**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Linux/Mac
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   QDRANT_API_KEY=your-qdrant-api-key
   QDRANT_HOST=https://f649a572-2cc1-4054-b389-81efd0eb9b91.europe-west3-0.gcp.cloud.qdrant.io
   GOOGLE_API_KEY=your-google-api-key-for-gemini
   BOOK_URL=https://your-deployed-docusaurus-book.com
   ```

## Running the Service

### Local Development
1. **Start the backend server**
   ```bash
   uvicorn src.api.main:app --host 127.0.0.1 --port 8001 --reload
   ```

### Hugging Face Spaces Deployment
1. **Prepare for deployment**
   - Ensure the `Dockerfile`, `requirements.txt`, and `space.yaml` are in the project root
   - The Qdrant Book Content Ingestion backend is already configured for Hugging Face Spaces

2. **Deploy to Hugging Face Spaces**
   - Create a new Space with Docker SDK at https://huggingface.co/spaces/asmabibi123/rag-chatbot
   - Point to this repository
   - Set the following environment variables in Space Settings → Secrets:
     ```
     QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.p8xTmxwW_FrSIiPxk6COjW-ms8-wdXA-W-UHoQTcS3Q
     GOOGLE_API_KEY=AIzaSyDhSqFvw8gaXlKmfw4xAgcn03OguPuTGyU
     QDRANT_URL=https://f649a572-2cc1-4054-b389-81efd0eb9b91.europe-west3-0.gcp.cloud.qdrant.io:6333
     BOOK_URL=https://physical-ai-humanoid-robotics-s9-git-7d9461-asma-bibis-projects.vercel.app/
     CHUNK_SIZE=400
     ```
   - The service will automatically build and deploy at: https://asmabibi123-rag-chatbot.hf.space

3. **After deployment, verify the backend is working**
   - Visit https://asmabibi123-rag-chatbot.hf.space/health to check system health
   - Use the `/ingest` endpoint to index your book content
   - Test the `/chat` endpoint to ensure it returns real answers

2. **In a separate terminal, ingest the book content**
   ```bash
   python scripts/ingest_book.py
   ```
   
   Or use the API endpoint:
   ```bash
   curl -X POST http://127.0.0.1:8001/ingest \
     -H "Content-Type: application/json" \
     -d '{"book_url": "https://your-book-url.com", "chunk_size": 400, "reindex": true}'
   ```

## Testing the API

### Local Testing
1. **Check health status**
   ```bash
   curl http://127.0.0.1:8001/health
   ```

2. **Ask a question about the book via chat endpoint**
   ```bash
   curl -X POST http://127.0.0.1:8001/chat \
     -H "Content-Type: application/json" \
     -d '{"question": "What is the main concept?", "top_k": 5}'
   ```

3. **Get system statistics**
   ```bash
   curl -X GET "http://127.0.0.1:8001/stats"
   ```

4. **Ask a question about selected text** (alternative endpoint)
   ```bash
   curl -X POST http://127.0.0.1:8001/ask-selected \
     -H "Content-Type: application/json" \
     -d '{"question": "Explain this concept", "selected_text": "The concept is..."}'
   ```

### Testing Deployed Service
1. **Check deployed health status**
   ```bash
   curl https://asmabibi123-rag-chatbot.hf.space/health
   ```

2. **Ask a question to the deployed service**
   ```bash
   curl -X POST https://asmabibi123-rag-chatbot.hf.space/chat \
     -H "Content-Type: application/json" \
     -d '{"question": "What is the main concept?", "top_k": 5}'
   ```

3. **Get statistics from deployed service**
   ```bash
   curl -X GET "https://asmabibi123-rag-chatbot.hf.space/stats"
   ```

## Verification

1. **Verify data exists in Qdrant collection**
   - Check that your Qdrant Cloud collection contains the ingested vectors
   - Verify metadata includes source_url, page_path, chunk_index, and text_content

2. **Test chatbot alignment**
   - Open the deployed book in your browser
   - Query the chatbot while viewing specific pages
   - Confirm responses match the visible book content with 95%+ accuracy

## Troubleshooting

- **Qdrant connection issues**: Verify QDRANT_API_KEY and host URL in environment variables
- **Gemini API issues**: Verify GOOGLE_API_KEY is valid and Gemini API is enabled in your Google Cloud project
- **Ingestion fails**: Ensure the book URL is accessible and contains parseable content
- **Empty responses**: Confirm that the ingestion completed successfully and data exists in Qdrant
- **Low accuracy**: Verify that the correct book content was ingested and that queries match the book content

## Performance Targets

- API responses should return in under 3 seconds (95th percentile)
- Chatbot responses should match book content with 95%+ accuracy
- System should handle 100+ concurrent users