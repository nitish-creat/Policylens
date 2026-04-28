# PolicyLens Flask Backend

RAG-powered chatbot backend for answering questions about Indian government policies.

## 📋 Features

✅ **RAG Pipeline** - Retrieval Augmented Generation using ChromaDB & Ollama LLM  
✅ **Policy Database** - Sample of 10+ Indian government policies  
✅ **API Endpoints** - RESTful API for chat, search, and policy retrieval  
✅ **Error Handling** - Graceful fallbacks when LLM is unavailable  
✅ **CORS Support** - Ready for cross-origin requests from React frontend  
✅ **Logging** - Comprehensive request and error logging

---

## 🚀 Quick Start

### 1. Prerequisites

**Install Ollama** (LLM Server):

- Download from: https://ollama.ai
- Run: `ollama serve`
- Pull model: `ollama pull llama2` (or other models like `mistral`, `neural-chat`)

### 2. Setup Backend

```bash
cd backend

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

The server will start on **http://localhost:5000**

---

## 🔌 API Endpoints

### 1. Health Check

```bash
GET /api/health

Response:
{
  "status": "online",
  "version": "1.0.0",
  "model": "llama2",
  "rag_ready": true
}
```

### 2. Chat Endpoint (Main)

```bash
POST /api/chat
Content-Type: application/json

Request:
{
  "question": "What is GST?",
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ]
}

Response:
{
  "answer": "GST (Goods and Services Tax) is...",
  "sources": [
    {
      "id": "policy_001",
      "ministry": "Ministry of Finance",
      "title": "GST Implementation Guide",
      "relevance": 95
    }
  ],
  "confidence": 0.87
}
```

### 3. Search Policies

```bash
GET /api/policies/search?q=labor

Response:
{
  "policies": [
    {
      "id": "policy_002",
      "title": "Labor Code on Wages 2020",
      "ministry": "Ministry of Labour",
      "category": "Labor"
    }
  ],
  "total": 5
}
```

### 4. Get All Policies

```bash
GET /api/policies

Response:
{
  "policies": [...],
  "total": 10
}
```

### 5. Get Policy Details

```bash
GET /api/policies/policy_001

Response:
{
  "id": "policy_001",
  "title": "Goods and Services Tax",
  "ministry": "Ministry of Finance",
  "description": "...",
  "key_points": [...]
}
```

### 6. Submit Feedback

```bash
POST /api/feedback

Request:
{
  "messageId": "msg_123",
  "feedback": "positive"
}

Response:
{
  "status": "success",
  "message": "Thank you for your feedback!"
}
```

---

## 📁 Project Structure

```
backend/
├── app.py                 # Main Flask application
├── config.py              # Configuration settings
├── rag_pipeline.py        # RAG logic (retrieve + generate)
├── policy_loader.py       # Load and manage policies
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

---

## ⚙️ Configuration

Edit `.env` to customize:

```env
# Flask
DEBUG=True
PORT=5000

# LLM (Ollama)
LLM_MODEL=llama2
LLM_BASE_URL=http://localhost:11434

# Chat
TEMPERATURE=0.7          # 0 = deterministic, 1 = creative
TOP_P=0.9                # Nucleus sampling
MAX_RESPONSE_LENGTH=1000

# Logging
LOG_LEVEL=INFO
```

---

## 🤖 Supported LLM Models (via Ollama)

Download and use any of these:

```bash
ollama pull llama2          # 7B, 13B, 70B variants
ollama pull mistral         # Fast and efficient
ollama pull neural-chat     # Good for chat
ollama pull zephyr          # Latest & fastest
```

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to LLM server"

- Make sure Ollama is running: `ollama serve`
- Check `LLM_BASE_URL` in `.env`

### ❌ "LLM request timeout"

- Larger models take longer to respond
- Reduce `MAX_RESPONSE_LENGTH` in `.env`
- Try a smaller model: `ollama pull mistral`

### ❌ Port 5000 already in use

- Change `PORT` in `.env` to another port (e.g., 5001)
- Or kill existing process: `lsof -i :5000` (Linux/Mac)

### ❌ CORS errors from frontend

- Make sure `CORS_ORIGINS=*` in `.env`
- Or add specific frontend URL: `CORS_ORIGINS=http://localhost:5173`

---

## 📊 Adding More Policies

Edit `policy_loader.py` and add to `get_sample_policies()`:

```python
{
    "id": "policy_011",
    "title": "Your Policy Title",
    "ministry": "Ministry Name",
    "category": "Category",
    "description": "Description...",
    "date": "2024-01-01",
    "status": "Active",
    "key_points": ["Point 1", "Point 2"]
}
```

Or load from JSON file by setting `POLICY_DATA_FILE` in `.env`.

---

## 🔄 Integration with Frontend

The React frontend (`http://localhost:5173/Policylens/`) automatically connects to this backend.

Frontend will:

- Send messages to `POST /api/chat`
- Show bot responses in the UI
- Display policy sources in right sidebar
- Handle fallback when backend is offline

---

## 📝 Logging Output

```
2024-04-28 10:30:45,123 - __main__ - INFO - ✅ Connected to Ollama LLM server
2024-04-28 10:30:46,456 - __main__ - INFO - 📝 User question: What is GST?
2024-04-28 10:30:48,789 - __main__ - INFO - ✅ Generated response with 3 sources
```

---

## 🚀 Production Deployment

For production:

1. Set `DEBUG=False` in `.env`
2. Use a production WSGI server:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```
3. Use proper LLM server (not local Ollama)
4. Add authentication/API keys
5. Set up database for chat history
6. Configure proper CORS origins

---

## 📄 License

Part of PolicyLens project

---

## 💡 Support

For issues or questions, check:

- Backend logs (console output)
- Frontend console (browser DevTools)
- Ollama status: `curl http://localhost:11434/api/tags`
