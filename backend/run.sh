#!/bin/bash

# PolicyLens Backend Startup Script for Linux/Mac

echo ""
echo "========================================================="
echo "  PolicyLens Flask Backend Startup"
echo "========================================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "Please install Python from https://www.python.org/"
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d venv ]; then
    echo ""
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo ""
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Check if Ollama is running
echo ""
echo "🤖 Checking Ollama LLM server..."
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo ""
    echo "⚠️  Ollama is not running!"
    echo "Please start Ollama by running: ollama serve"
    echo ""
    echo "Available models:"
    echo "  - llama2 (default)"
    echo "  - mistral (faster)"
    echo "  - neural-chat"
    echo ""
    echo "After starting Ollama, run this script again."
    exit 1
fi
echo "✅ Ollama is running!"

# Start Flask backend
echo ""
echo "========================================================="
echo "  🚀 Starting PolicyLens Backend on http://localhost:5000"
echo "========================================================="
echo ""
echo "📄 API Documentation:"
echo "   - Health Check: GET http://localhost:5000/api/health"
echo "   - Chat: POST http://localhost:5000/api/chat"
echo "   - Search: GET http://localhost:5000/api/policies/search?q=..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python app.py

# Cleanup
deactivate
