"""
Configuration settings for PolicyLens Flask backend
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Flask Configuration
DEBUG = os.getenv("DEBUG", "True") == "True"
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 5000))
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")

# CORS Configuration
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# LLM Configuration
LLM_MODEL = os.getenv("LLM_MODEL", "llama2")
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "http://localhost:11434")

# ChromaDB Configuration
CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH", "./chroma_db")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

# Chat Configuration
MAX_HISTORY_LENGTH = int(os.getenv("MAX_HISTORY_LENGTH", 5))
MAX_RESPONSE_LENGTH = int(os.getenv("MAX_RESPONSE_LENGTH", 1000))
TEMPERATURE = float(os.getenv("TEMPERATURE", 0.7))
TOP_P = float(os.getenv("TOP_P", 0.9))

# Policy Data Configuration
POLICY_DATA_FILE = os.getenv("POLICY_DATA_FILE", "./data/india_policies.json")

# Logging Configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
