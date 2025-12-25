#!/usr/bin/env python3
"""
Simulate the exact flow in AskService to identify where the issue occurs
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from src.models.query import QueryRequest, QueryResponse
from src.services.ask_service import AskService
from src.utils.config import settings

def simulate_ask_service_flow():
    print("Simulating AskService flow...")

    # Create a query request
    query_request = QueryRequest(
        query_text="What is this book about?",
        top_k=3
    )

    print(f"Query request created: {query_request.query_text}")

    # Initialize the ask service
    ask_service = AskService()
    print("AskService initialized")

    # Try to run the get_answer method (this might fail due to Qdrant/Gemini connection)
    try:
        response = ask_service.get_answer(query_request)
        print(f"Response generated successfully: answer length = {len(response.answer)}")
        print(f"Source chunks count: {len(response.source_chunks)}")
        print(f"Confidence score: {response.confidence_score}")
        print(f"Accuracy score: {response.accuracy_score}")
        print("SUCCESS: AskService flow completed without validation error")
    except Exception as e:
        print(f"ERROR in AskService flow: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    simulate_ask_service_flow()