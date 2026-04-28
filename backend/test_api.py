"""
PolicyLens Backend API Test Script

Tests all endpoints to verify backend is working correctly.
Usage: python test_api.py
"""

import requests
import json
import time
from datetime import datetime

BASE_URL = "http://localhost:5000/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    YELLOW = '\033[93m'
    END = '\033[0m'

def print_header(text):
    print(f"\n{Colors.BLUE}{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}{Colors.END}\n")

def print_success(text):
    print(f"{Colors.GREEN}✅ {text}{Colors.END}")

def print_error(text):
    print(f"{Colors.RED}❌ {text}{Colors.END}")

def print_info(text):
    print(f"{Colors.YELLOW}ℹ️  {text}{Colors.END}")

def test_health():
    """Test health check endpoint"""
    print_header("1. Testing Health Check")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print_success("Health check passed")
            print(json.dumps(data, indent=2))
            return True
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print_error("Cannot connect to backend. Make sure Flask is running!")
        return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def test_search_policies():
    """Test policy search endpoint"""
    print_header("2. Testing Policy Search")
    try:
        response = requests.get(f"{BASE_URL}/policies/search?q=gst", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print_success(f"Found {data.get('total', 0)} policies")
            if data.get('policies'):
                print(f"\nFirst result:")
                print(json.dumps(data['policies'][0], indent=2))
            return True
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def test_get_all_policies():
    """Test get all policies endpoint"""
    print_header("3. Testing Get All Policies")
    try:
        response = requests.get(f"{BASE_URL}/policies", timeout=5)
        if response.status_code == 200:
            data = response.json()
            total = data.get('total', 0)
            print_success(f"Retrieved {total} policies")
            if data.get('policies'):
                print(f"\nSample policy:")
                print(json.dumps(data['policies'][0], indent=2))
            return True
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def test_get_policy_detail():
    """Test get policy detail endpoint"""
    print_header("4. Testing Get Policy Detail")
    try:
        # First get a policy ID
        response = requests.get(f"{BASE_URL}/policies", timeout=5)
        if response.status_code == 200:
            policies = response.json().get('policies', [])
            if policies:
                policy_id = policies[0]['id']
                response = requests.get(f"{BASE_URL}/policies/{policy_id}", timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    print_success(f"Retrieved policy: {data.get('title')}")
                    print(json.dumps(data, indent=2))
                    return True
                else:
                    print_error(f"Unexpected status code: {response.status_code}")
                    return False
            else:
                print_error("No policies found to retrieve details")
                return False
        else:
            print_error("Failed to get policies list")
            return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def test_chat():
    """Test chat endpoint"""
    print_header("5. Testing Chat Endpoint")
    try:
        payload = {
            "question": "What is GST?",
            "history": []
        }
        response = requests.post(
            f"{BASE_URL}/chat",
            json=payload,
            timeout=30  # Longer timeout for LLM response
        )
        if response.status_code == 200:
            data = response.json()
            print_success("Chat endpoint responded successfully")
            print(f"\nQuestion: {payload['question']}")
            print(f"Answer: {data.get('answer', 'No answer')[:200]}...")
            print(f"Sources: {len(data.get('sources', []))} policy references")
            print(f"Confidence: {data.get('confidence', 'N/A')}")
            return True
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except requests.exceptions.Timeout:
        print_error("Chat request timed out (LLM might be slow or unavailable)")
        return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def test_feedback():
    """Test feedback endpoint"""
    print_header("6. Testing Feedback Endpoint")
    try:
        payload = {
            "messageId": "test_msg_123",
            "feedback": "positive"
        }
        response = requests.post(
            f"{BASE_URL}/feedback",
            json=payload,
            timeout=5
        )
        if response.status_code == 200:
            data = response.json()
            print_success("Feedback submitted successfully")
            print(json.dumps(data, indent=2))
            return True
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False

def main():
    print_info("PolicyLens Backend API Test Suite")
    print_info(f"Testing: {BASE_URL}")
    print_info(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    print("\n⚠️  Make sure the backend is running:")
    print("   - Flask backend: python backend/app.py")
    print("   - Ollama LLM: ollama serve")
    
    input("\nPress Enter to start tests...")
    
    results = {
        "Health Check": test_health(),
        "Search Policies": test_search_policies(),
        "Get All Policies": test_get_all_policies(),
        "Get Policy Detail": test_get_policy_detail(),
        "Chat": test_chat(),
        "Feedback": test_feedback(),
    }
    
    print_header("Test Summary")
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
    
    print(f"\n{Colors.BLUE}Total: {passed}/{total} tests passed{Colors.END}")
    
    if passed == total:
        print_success("All tests passed! Backend is working correctly.")
    else:
        print_error(f"{total - passed} test(s) failed. Check errors above.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Tests interrupted by user{Colors.END}")
    except Exception as e:
        print_error(f"Unexpected error: {e}")
