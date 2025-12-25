#!/usr/bin/env python3
"""
Debug script to test the QueryResponse creation logic
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from src.models.query import QueryResponse

def test_query_response_creation():
    print("Testing QueryResponse creation scenarios...")

    # Test 1: Normal case with answer and chunks
    try:
        response = QueryResponse(
            answer="This is a test answer based on the provided information.",
            source_chunks=[
                {
                    "text": "This is a sample text from the source.",
                    "source_url": "https://example.com/page",
                    "page_path": "/page",
                    "confidence": 0.85
                }
            ],
            confidence_score=0.85,
            accuracy_score=0.92,
            processing_time=0.2
        )
        print("PASS Test 1: Normal response with chunks")
    except Exception as e:
        print(f"FAIL Test 1: {e}")

    # Test 2: Empty answer with empty chunks (should fail on answer validation)
    try:
        response = QueryResponse(
            answer="",
            source_chunks=[],
            confidence_score=0.0,
            accuracy_score=0.0,
            processing_time=0.0
        )
        print("FAIL Test 2: Empty answer should have failed validation")
    except ValueError as e:
        if "answer must not be empty" in str(e):
            print("PASS Test 2: Empty answer properly rejected")
        else:
            print(f"FAIL Test 2: Unexpected error - {e}")
    except Exception as e:
        print(f"FAIL Test 2: Unexpected exception - {e}")

    # Test 3: Answer with no chunks (should fail on source_chunks validation)
    try:
        response = QueryResponse(
            answer="This is an answer without source chunks.",
            source_chunks=[],
            confidence_score=0.5,
            accuracy_score=0.7,
            processing_time=0.1
        )
        print("FAIL Test 3: Answer without chunks should have failed validation")
    except ValueError as e:
        if "source_chunks should not be empty" in str(e):
            print("PASS Test 3: Answer without chunks properly rejected")
        else:
            print(f"FAIL Test 3: Unexpected error - {e}")
    except Exception as e:
        print(f"FAIL Test 3: Unexpected exception - {e}")

    # Test 4: Error message with chunks (should pass)
    try:
        response = QueryResponse(
            answer="I couldn't find any relevant information in the book to answer your question.",
            source_chunks=[{
                "text": "No relevant content found in the indexed book to answer this question.",
                "source_url": "",
                "page_path": "",
                "confidence": 0.0
            }],
            confidence_score=0.0,
            accuracy_score=0.0,
            processing_time=0.1
        )
        print("PASS Test 4: Error response with chunks")
    except Exception as e:
        print(f"FAIL Test 4: {e}")

if __name__ == "__main__":
    test_query_response_creation()