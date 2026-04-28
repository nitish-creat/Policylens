"""
PolicyLens Flask Backend
RAG-powered chatbot for Indian government policies
"""
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_pipeline import RAGPipeline
from config import *

# Configure logging
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY

# Configure CORS
CORS(app, origins=CORS_ORIGINS)

# Initialize RAG pipeline
try:
    rag_pipeline = RAGPipeline(
        llm_base_url=LLM_BASE_URL,
        llm_model=LLM_MODEL
    )
    logger.info("✅ RAG Pipeline initialized successfully")
except Exception as e:
    logger.error(f"❌ Failed to initialize RAG Pipeline: {e}")
    rag_pipeline = None


# ============================================================================
# API ROUTES
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "online",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "model": LLM_MODEL,
        "rag_ready": rag_pipeline is not None
    }), 200


@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint for policy Q&A
    
    Request body:
    {
        "question": "What is GST?",
        "history": [
            {"role": "user", "content": "..."},
            {"role": "assistant", "content": "..."}
        ]
    }
    
    Response:
    {
        "answer": "GST is...",
        "sources": [...],
        "confidence": 0.87
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
        
        question = data.get('question', '').strip()
        history = data.get('history', [])
        
        if not question:
            return jsonify({"error": "Question is required"}), 400
        
        logger.info(f"📝 User question: {question}")
        
        # Check if RAG pipeline is available
        if not rag_pipeline:
            logger.warning("⚠️ RAG Pipeline not initialized")
            return jsonify({
                "answer": "Service temporarily unavailable. Please try again later.",
                "sources": [],
                "confidence": 0.0
            }), 503
        
        # Get answer from RAG pipeline
        result = rag_pipeline.answer_question(question, history)
        
        logger.info(f"✅ Generated response with {len(result['sources'])} sources")
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"❌ Error in chat endpoint: {e}", exc_info=True)
        return jsonify({
            "error": "Internal server error",
            "message": str(e) if DEBUG else "An error occurred"
        }), 500


@app.route('/api/policies/search', methods=['GET'])
def search_policies():
    """Search for policies by keyword
    
    Query parameters:
    - q: Search query
    
    Response:
    {
        "policies": [...]
    }
    """
    try:
        query = request.args.get('q', '').strip()
        
        if not query:
            return jsonify({"error": "Search query required"}), 400
        
        if not rag_pipeline:
            return jsonify({"policies": []}), 200
        
        # Search policies
        policies = rag_pipeline.policy_loader.search_policies(query)
        
        # Format response
        result = {
            "policies": [
                {
                    "id": p["id"],
                    "title": p["title"],
                    "ministry": p["ministry"],
                    "category": p["category"],
                    "date": p["date"]
                }
                for p in policies
            ],
            "total": len(policies)
        }
        
        logger.info(f"🔍 Search query '{query}' returned {len(policies)} results")
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"❌ Error in search endpoint: {e}", exc_info=True)
        return jsonify({"error": "Search failed"}), 500


@app.route('/api/policies', methods=['GET'])
def get_all_policies():
    """Get all available policies"""
    try:
        if not rag_pipeline:
            return jsonify({"policies": []}), 200
        
        policies = rag_pipeline.policy_loader.policies
        
        result = {
            "policies": [
                {
                    "id": p["id"],
                    "title": p["title"],
                    "ministry": p["ministry"],
                    "category": p["category"],
                    "description": p["description"],
                    "date": p["date"],
                    "status": p["status"]
                }
                for p in policies
            ],
            "total": len(policies)
        }
        
        logger.info(f"📚 Retrieved {len(policies)} policies")
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"❌ Error retrieving policies: {e}", exc_info=True)
        return jsonify({"error": "Failed to retrieve policies"}), 500


@app.route('/api/policies/<policy_id>', methods=['GET'])
def get_policy_detail(policy_id):
    """Get detailed information about a specific policy"""
    try:
        if not rag_pipeline:
            return jsonify({"error": "Service unavailable"}), 503
        
        # Find policy by ID
        policy = next(
            (p for p in rag_pipeline.policy_loader.policies if p["id"] == policy_id),
            None
        )
        
        if not policy:
            return jsonify({"error": "Policy not found"}), 404
        
        logger.info(f"📄 Retrieved details for policy: {policy_id}")
        
        return jsonify(policy), 200
        
    except Exception as e:
        logger.error(f"❌ Error retrieving policy details: {e}", exc_info=True)
        return jsonify({"error": "Failed to retrieve policy details"}), 500


@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """Submit feedback on response quality"""
    try:
        data = request.get_json()
        message_id = data.get('messageId')
        feedback = data.get('feedback')  # 'positive' or 'negative'
        
        if not message_id or feedback not in ['positive', 'negative']:
            return jsonify({"error": "Invalid feedback data"}), 400
        
        logger.info(f"👍 Feedback received: {feedback} for message {message_id}")
        
        # TODO: Store feedback in database for model improvement
        
        return jsonify({
            "status": "success",
            "message": "Thank you for your feedback!"
        }), 200
        
    except Exception as e:
        logger.error(f"❌ Error processing feedback: {e}")
        return jsonify({"error": "Failed to process feedback"}), 500


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500


@app.before_request
def log_request():
    """Log incoming requests"""
    logger.debug(f"📨 {request.method} {request.path}")


# ============================================================================
# STARTUP
# ============================================================================

if __name__ == '__main__':
    logger.info("=" * 60)
    logger.info("🚀 PolicyLens Flask Backend Starting...")
    logger.info("=" * 60)
    logger.info(f"🌐 Server: {HOST}:{PORT}")
    logger.info(f"🤖 LLM Model: {LLM_MODEL}")
    logger.info(f"📍 LLM Server: {LLM_BASE_URL}")
    logger.info(f"🔒 CORS Origins: {CORS_ORIGINS}")
    logger.info("=" * 60)
    
    # Run Flask app
    app.run(
        host=HOST,
        port=PORT,
        debug=DEBUG,
        use_reloader=False  # Disable reloader to avoid duplicate initialization
    )
