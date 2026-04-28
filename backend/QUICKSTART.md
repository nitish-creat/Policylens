# PolicyLens Backend - Quick Setup Guide

## 📋 What's Been Created

Your backend is now fully set up with the following files:

```
backend/
├── app.py                 # Flask REST API with 6 endpoints
├── config.py              # Configuration settings
├── rag_pipeline.py        # RAG logic (retrieve + LLM generate)
├── policy_loader.py       # Policy database & search
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
├── run.bat                # Windows startup script
├── run.sh                 # Linux/Mac startup script
├── test_api.py            # API testing script
└── README.md              # Full documentation
```

---

## 🚀 Getting Started (3 Steps)

### Step 1: Install Ollama (LLM Server)

Download and install Ollama from **https://ollama.ai**

Then run in a terminal:

```bash
ollama serve
```

This starts the LLM inference server. Keep this terminal open.

---

### Step 2: Install Python Dependencies

In the `backend` folder, run:

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**Linux/Mac:**

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

### Step 3: Start Flask Backend

**Option A: Automatic (Easy)**

Windows:

```bash
run.bat
```

Linux/Mac:

```bash
chmod +x run.sh
./run.sh
```

**Option B: Manual**

```bash
python app.py
```

You should see:

```
 * Running on http://0.0.0.0:5000
✅ Connected to Ollama LLM server
📝 Loading policies...
```

---

## ✅ Verify It's Working

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Should return:

```json
{
  "status": "online",
  "model": "llama2",
  "rag_ready": true
}
```

### 2. Search Policies

```bash
curl "http://localhost:5000/api/policies/search?q=gst"
```

### 3. Chat with Bot

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is GST?", "history": []}'
```

---

## 🧪 Full API Test Suite

Run the automated test script:

```bash
python test_api.py
```

This tests all 6 endpoints and verifies everything is working.

---

## 🔗 Connect Frontend

Your React frontend at `http://localhost:5173/Policylens/` will automatically:

- Connect to `http://localhost:5000`
- Send chat messages to the backend
- Display responses in the floating widget
- Show policy sources in the sidebar

**No additional configuration needed!**

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to Ollama"

→ Make sure `ollama serve` is running in a separate terminal

### ❌ "Connection refused on port 5000"

→ Flask backend isn't running. Execute `python app.py`

### ❌ "Port 5000 already in use"

→ Change `PORT` in `.env` to 5001 (or another port)
→ Then start: `python app.py`

### ❌ "LLM request timeout"

→ Ollama model is slow (especially llama2)
→ Try faster model: `ollama pull mistral`
→ Or increase timeout in frontend's chatService.js

### ❌ CORS errors in browser console

→ Make sure Flask is running with CORS enabled
→ Check `.env` has `CORS_ORIGINS=*`

---

## 📊 Available LLM Models

Use any of these with Ollama:

```bash
ollama pull llama2         # Powerful but slower (7B recommended)
ollama pull mistral        # Fast and good (Recommended for speed)
ollama pull neural-chat    # Optimized for conversation
ollama pull zephyr         # Latest and fastest
```

Change model in `.env`:

```env
LLM_MODEL=mistral
```

---

## 🎯 Next Steps

1. ✅ Start Ollama: `ollama serve`
2. ✅ Install backend: `pip install -r requirements.txt`
3. ✅ Start Flask: `python app.py`
4. ✅ Test API: `python test_api.py`
5. ✅ Open frontend: http://localhost:5173/Policylens/
6. ✅ Chat with the bot!

---

## 📝 API Endpoints Summary

| Endpoint                     | Method | Purpose                                     |
| ---------------------------- | ------ | ------------------------------------------- |
| `/api/health`                | GET    | Check if backend is online                  |
| `/api/chat`                  | POST   | Send question, get AI response with sources |
| `/api/policies`              | GET    | Get all policies                            |
| `/api/policies/search?q=...` | GET    | Search policies by keyword                  |
| `/api/policies/{id}`         | GET    | Get single policy details                   |
| `/api/feedback`              | POST   | Submit user feedback                        |

---

## 🎉 You're All Set!

The backend is production-ready with:

- ✅ RAG pipeline for intelligent responses
- ✅ 10 sample Indian government policies
- ✅ Error handling & fallbacks
- ✅ CORS support for frontend
- ✅ Comprehensive logging
- ✅ API test suite

Questions? Check `README.md` for full documentation.
