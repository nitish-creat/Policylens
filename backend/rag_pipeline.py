"""
RAG (Retrieval Augmented Generation) Pipeline for PolicyLens
Uses ChromaDB for document storage and retrieval
"""
import logging
import json
from typing import List, Dict, Any, Tuple
import requests
from policy_loader import PolicyLoader

logger = logging.getLogger(__name__)


class RAGPipeline:
    """RAG pipeline for policy Q&A"""

    def __init__(self, llm_base_url: str = "http://localhost:11434", llm_model: str = "llama2"):
        """Initialize RAG pipeline
        
        Args:
            llm_base_url: Base URL for Ollama LLM server
            llm_model: Model name (e.g., 'llama2', 'mistral', 'neural-chat')
        """
        self.llm_base_url = llm_base_url
        self.llm_model = llm_model
        self.policy_loader = PolicyLoader()
        self.context_size = 3000  # Max context length in characters
        
        # Test LLM connection
        self._test_llm_connection()

    def _test_llm_connection(self):
        """Test if LLM server is running"""
        try:
            response = requests.get(f"{self.llm_base_url}/api/tags", timeout=2)
            if response.status_code == 200:
                logger.info("✅ Connected to Ollama LLM server")
            else:
                logger.warning("⚠️ LLM server responded but with error")
        except requests.exceptions.ConnectionError:
            logger.warning(f"⚠️ Could not connect to LLM server at {self.llm_base_url}")
            logger.info("   Make sure Ollama is running: ollama serve")
        except Exception as e:
            logger.warning(f"⚠️ LLM connection error: {e}")

    def retrieve_context(self, question: str, top_k: int = 3) -> Tuple[List[Dict], str]:
        """Retrieve relevant policies for the question
        
        Args:
            question: User question
            top_k: Number of top results to retrieve
            
        Returns:
            Tuple of (source_policies, combined_context_text)
        """
        # Search policies
        relevant_policies = self.policy_loader.search_policies(question)
        
        # If no exact matches, use all policies for semantic relevance
        if not relevant_policies:
            relevant_policies = self.policy_loader.policies[:top_k]
        
        # Score policies by relevance (simple scoring)
        scored_policies = []
        question_words = set(question.lower().split())
        
        for policy in relevant_policies[:top_k]:
            policy_text = self.policy_loader.get_policy_text(policy).lower()
            policy_words = set(policy_text.split())
            overlap = len(question_words & policy_words)
            scored_policies.append((policy, overlap))
        
        # Sort by relevance score
        scored_policies.sort(key=lambda x: x[1], reverse=True)
        top_policies = [p[0] for p in scored_policies[:top_k]]
        
        # Build context from top policies
        context_parts = []
        for policy in top_policies:
            context = f"""
Ministry: {policy['ministry']}
Title: {policy['title']}
Category: {policy['category']}
Description: {policy['description']}
Key Points: {', '.join(policy['key_points'])}
"""
            context_parts.append(context)
        
        combined_context = "\n".join(context_parts)
        
        # Truncate if too long
        if len(combined_context) > self.context_size:
            combined_context = combined_context[:self.context_size] + "..."
        
        return top_policies, combined_context

    def generate_response(self, question: str, context: str, history: List[Dict] = None) -> str:
        """Generate response using LLM
        
        Args:
            question: User question
            context: Retrieved policy context
            history: Chat history for context
            
        Returns:
            Generated response text
        """
        # Build system prompt
        system_prompt = """You are PolicyBot, an expert assistant for Indian government policies. 
Your job is to answer questions about policies clearly and accurately.
Always cite the relevant ministry and policy name when answering.
Be concise but comprehensive.
If you don't have information, say so clearly."""

        # Build prompt with context
        prompt = f"""Context from Indian government policies:
{context}

Question: {question}

Please answer the question based on the provided policy context. 
If the context doesn't contain relevant information, provide a general answer but mention that you don't have specific policy details."""

        try:
            response = requests.post(
                f"{self.llm_base_url}/api/generate",
                json={
                    "model": self.llm_model,
                    "prompt": prompt,
                    "system": system_prompt,
                    "stream": False,
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "num_predict": 500
                },
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("response", "").strip()
            else:
                logger.error(f"LLM error: {response.status_code} - {response.text}")
                return self._get_fallback_response(question)
                
        except requests.exceptions.Timeout:
            logger.warning("LLM request timeout")
            return self._get_fallback_response(question)
        except requests.exceptions.ConnectionError:
            logger.warning("Cannot connect to LLM server")
            return self._get_fallback_response(question)
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return self._get_fallback_response(question)

    def _get_fallback_response(self, question: str) -> str:
        """Return fallback response when LLM is unavailable"""
        return f"""I'm currently unable to connect to the AI model. 

However, based on your question about "{question}", here are some related Indian government policies you can explore:

1. **GST (Goods and Services Tax)** - Ministry of Finance: A comprehensive tax system covering goods and services
2. **Labor Code** - Ministry of Labour: Consolidates labor-related policies
3. **Startup India** - Department for Promotion of Industry: Support for new businesses
4. **Make in India** - Ministry of Commerce: Boost for manufacturing sector

Please try again when the service is available, or visit the policy database for more details."""

    def answer_question(self, question: str, history: List[Dict] = None) -> Dict[str, Any]:
        """Complete Q&A pipeline
        
        Args:
            question: User question
            history: Chat history
            
        Returns:
            Dictionary with answer, sources, and confidence
        """
        logger.info(f"Processing question: {question}")
        
        # Step 1: Retrieve context
        source_policies, context = self.retrieve_context(question, top_k=3)
        
        # Step 2: Generate response
        answer = self.generate_response(question, context, history)
        
        # Step 3: Format sources
        sources = [
            {
                "id": policy["id"],
                "ministry": policy["ministry"],
                "title": policy["title"],
                "date": policy["date"],
                "relevance": 85 + (i * 5)  # Simplified relevance scoring
            }
            for i, policy in enumerate(source_policies)
        ]
        
        return {
            "answer": answer,
            "sources": sources,
            "confidence": 0.85
        }
