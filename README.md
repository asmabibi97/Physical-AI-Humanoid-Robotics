# RAG Chatbot for Docusaurus Book

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator, with an integrated Retrieval-Augmented Generation (RAG) chatbot. The chatbot enables interactive querying of book content using vector search and LLM-powered responses.

## Features

- **Interactive Chat Interface**: A seamlessly integrated chatbot that allows users to ask questions about the book content
- **RAG-Powered Responses**: Uses vector search in Qdrant to retrieve relevant content and generates context-aware answers
- **Real-time Querying**: Instant responses to user questions based on book content
- **Docusaurus Integration**: Native integration with Docusaurus design and structure
- **Secure & Scalable**: Includes rate limiting, input validation, and security best practices
- **Performance Optimized**: Caching mechanisms for fast response times

## Installation

### Frontend (Docusaurus)

```bash
yarn
```

### Backend (Python API)

```bash
cd backend
pip install -r requirements.txt
```

## Local Development

### Frontend

```bash
yarn start
```

This command starts a local development server for the Docusaurus site and opens up a browser window. Most changes are reflected live without having to restart the server.

### Backend API

```bash
cd backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### Running Both Together

Use the provided script to run both frontend and backend:

```bash
cd backend
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_API_KEY=your_qdrant_api_key_here  # if using cloud service
LLM_API_KEY=your_llm_api_key_here  # OpenAI or other LLM provider
LLM_BASE_URL=https://api.openai.com/v1  # or other LLM provider URL
LLM_MODEL=gpt-3.5-turbo  # or other model
MAX_REQUESTS_PER_MINUTE=60
WHITELIST_IPS=  # Optional: comma-separated list of allowed IPs
LOG_TO_FILE=false
```

## Building the RAG Index

Before using the chatbot, you need to run the embedding pipeline to index your Docusaurus content:

1. Start the backend API
2. Make a POST request to `/run-embedding-pipeline` endpoint with:
   ```json
   {
     "docusaurus_url": "https://your-docusaurus-site.com",
     "reindex": true
   }
   ```

Alternatively, run the pipeline directly:
```bash
cd backend
python run_pipeline.py
```

## API Documentation

For detailed API documentation, see [backend/API_DOCS.md](backend/API_DOCS.md).

## Chatbot Usage

The chatbot is integrated directly into the Docusaurus site. Look for the chatbot widget in the bottom-right corner of the screen. You can ask questions about the book content, and the chatbot will search the indexed content and provide relevant answers.

## Build

For the frontend:
```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

For the backend:
```bash
cd backend
npm run build  # if using TypeScript components
```

## Deployment

### Frontend Deployment

Using SSH:
```bash
USE_SSH=true yarn deploy
```

Not using SSH:
```bash
GIT_USER=<Your GitHub username> yarn deploy
```

### Connecting Frontend to Backend

The frontend uses environment variables to connect to the backend API. By default, it will connect to the backend URL specified in the Docusaurus configuration.

For local development, create a `.env` file in the root directory:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

For production deployment (like Vercel), set the environment variable in your hosting platform:
```env
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

**Important**: If you're deploying the backend to Railway or another platform, make sure the backend is using the correct entry point (`src.api.main:app`) to include all required API endpoints (`/chat`, `/stats`, `/ingest`). The Dockerfile has been updated to use the correct entry point.

### Backend Deployment

The backend API can be deployed as a separate service. Common options include:

#### Railway (Recommended)
This backend is optimized for deployment on Railway:
1. Push your backend code to a GitHub repository
2. Connect Railway to your GitHub repo
3. Set the required environment variables in Railway Settings
4. The backend will automatically deploy and be available at the Railway URL

#### Hugging Face Spaces
Alternative option for backend deployment:
1. Create a new Space on Hugging Face with Docker SDK
2. Set the required environment variables in Space Secrets
3. The backend will automatically start and be available at the Space URL

#### Other Deployment Options
- Deploy to cloud platforms (AWS, GCP, Azure) as a container or serverless function
- Use platforms like Render or Heroku
- Deploy to a VPS with process managers like PM2

### Vercel Deployment

To deploy the frontend to Vercel:

1. Push your code to a GitHub repository
2. Connect Vercel to your GitHub repository
3. In Vercel's environment variables settings, add:
   - `REACT_APP_BACKEND_URL` with your backend URL (e.g., your Railway backend URL)
4. Vercel will automatically build and deploy your Docusaurus site

For deployment details, see the backend deployment script in [backend/deploy.sh](backend/deploy.sh) (if available) or use the general deployment approach for FastAPI applications.

If you are using GitHub pages for hosting the frontend, this command is a convenient way to build the website and push to the `gh-pages` branch.
