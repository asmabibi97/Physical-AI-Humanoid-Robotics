#!/usr/bin/env python3
"""
Test script to check if Cohere API key works
"""
import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'src'))

from src.utils.config import settings

print("Testing Cohere API configuration...")
print(f"Cohere API Key: {settings.cohere_api_key[:10]}..." if settings.cohere_api_key else "No Cohere API key found")

try:
    import cohere
    client = cohere.Client(settings.cohere_api_key)
    print("Cohere client initialized successfully!")

    # Try a simple chat
    response = client.chat(
        model="command-r-plus",
        message="Hello, how are you?",
        temperature=0.3
    )

    print(f"Test response: {response.text[:100]}...")
    print("✅ Cohere API is working correctly!")

except Exception as e:
    print(f"❌ Cohere API test failed: {e}")

print("\nTesting Google API configuration...")
print(f"Google API Key: {settings.google_api_key[:10]}..." if settings.google_api_key else "No Google API key found")

try:
    import google.generativeai as genai
    genai.configure(api_key=settings.google_api_key)
    model = genai.GenerativeModel('gemini-pro')
    print("Google Gemini client configured successfully!")

    # Try a simple generation
    response = model.generate_content("Hello, how are you?")
    print(f"Test response: {response.text[:100]}...")
    print("✅ Google API is working correctly!")

except Exception as e:
    print(f"❌ Google API test failed: {e}")