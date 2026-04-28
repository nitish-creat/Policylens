@echo off
REM PolicyLens Backend Startup Script for Windows

echo.
echo =========================================================
echo   PolicyLens Flask Backend Startup
echo =========================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo ✅ Python found

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo.
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo.
echo 🔄 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo.
echo 📥 Installing dependencies...
pip install -q -r requirements.txt

REM Check if Ollama is running
echo.
echo 🤖 Checking Ollama LLM server...
curl -s http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Ollama is not running!
    echo Please start Ollama by running: ollama serve
    echo.
    echo Available models:
    echo   - llama2 (default)
    echo   - mistral (faster)
    echo   - neural-chat
    echo.
    echo After starting Ollama, run this script again.
    pause
    exit /b 1
)
echo ✅ Ollama is running!

REM Start Flask backend
echo.
echo =========================================================
echo   🚀 Starting PolicyLens Backend on http://localhost:5000
echo =========================================================
echo.
echo 📄 API Documentation:
echo   - Health Check: GET http://localhost:5000/api/health
echo   - Chat: POST http://localhost:5000/api/chat
echo   - Search: GET http://localhost:5000/api/policies/search?q=...
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

REM Cleanup
deactivate
pause
