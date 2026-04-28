"""
Policy data loader - Loads Indian government policies from JSON
"""
import json
import logging
from typing import List, Dict, Any
import os

logger = logging.getLogger(__name__)


class PolicyLoader:
    """Load and manage policy documents"""

    def __init__(self, policy_file: str = None):
        """Initialize policy loader
        
        Args:
            policy_file: Path to policy JSON file
        """
        self.policy_file = policy_file or "./data/india_policies.json"
        self.policies = []
        self.load_policies()

    def load_policies(self) -> List[Dict[str, Any]]:
        """Load policies from JSON file or use sample data"""
        try:
            if os.path.exists(self.policy_file):
                with open(self.policy_file, "r", encoding="utf-8") as f:
                    self.policies = json.load(f)
                logger.info(f"Loaded {len(self.policies)} policies from {self.policy_file}")
            else:
                logger.warning(f"Policy file not found at {self.policy_file}, using sample data")
                self.policies = self.get_sample_policies()
        except Exception as e:
            logger.error(f"Error loading policies: {e}")
            self.policies = self.get_sample_policies()
        
        return self.policies

    @staticmethod
    def get_sample_policies() -> List[Dict[str, Any]]:
        """Return sample Indian government policies for demo"""
        return [
            {
                "id": "policy_001",
                "title": "Goods and Services Tax (GST)",
                "ministry": "Ministry of Finance",
                "category": "Tax",
                "description": "GST is a comprehensive, multi-stage, destination-based tax that is levied on every addition of value. It is an indirect tax applicable throughout India which replaced many indirect taxes.",
                "date": "2017-07-01",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Unified tax system across India",
                    "Applicable on goods and services",
                    "Multiple tax slabs: 5%, 12%, 18%, 28%",
                    "Digital compliance and filing"
                ]
            },
            {
                "id": "policy_002",
                "title": "Labor Code on Wages 2020",
                "ministry": "Ministry of Labour and Employment",
                "category": "Labor",
                "description": "The Code on Wages, 2019 consolidates four labour laws related to wages. It defines the structure of wages, sets minimum wage requirements, and regulates wage payment.",
                "date": "2020-08-28",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Consolidates 4 labor laws into one",
                    "Defines minimum wages",
                    "Protection against wage deductions",
                    "Applies to all workers earning up to Rs. 18,000/month"
                ]
            },
            {
                "id": "policy_003",
                "title": "National Environment Policy 2006",
                "ministry": "Ministry of Environment, Forest and Climate Change",
                "category": "Environment",
                "description": "NEP 2006 provides a policy framework for addressing environmental issues in India with focus on conservation of natural resources.",
                "date": "2006-05-18",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Conservation of natural resources",
                    "Prevention of pollution",
                    "Biodiversity protection",
                    "Climate change mitigation"
                ]
            },
            {
                "id": "policy_004",
                "title": "Startup India Initiative",
                "ministry": "Department for Promotion of Industry and Internal Trade",
                "category": "Business",
                "description": "Startup India is a flagship initiative to build a strong ecosystem for nurturing innovation and startup ventures in India.",
                "date": "2015-01-16",
                "status": "Active",
                "impact": "Medium",
                "key_points": [
                    "Tax incentives for startups",
                    "Simplified compliance",
                    "Funding support",
                    "Incubation support"
                ]
            },
            {
                "id": "policy_005",
                "title": "Make in India Initiative",
                "ministry": "Ministry of Commerce & Industry",
                "category": "Business",
                "description": "Make in India aims to facilitate investment, foster innovation, protect intellectual property, and build best-in-class manufacturing infrastructure.",
                "date": "2014-09-25",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Boost manufacturing in India",
                    "Foreign direct investment",
                    "Job creation",
                    "Infrastructure development"
                ]
            },
            {
                "id": "policy_006",
                "title": "National Health Policy 2017",
                "ministry": "Ministry of Health and Family Welfare",
                "category": "Healthcare",
                "description": "NHP 2017 aims to provide equitable, affordable and reliable primary, secondary and tertiary healthcare services.",
                "date": "2017-03-15",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Universal health coverage",
                    "Disease prevention and control",
                    "Healthcare infrastructure",
                    "Affordable medicines"
                ]
            },
            {
                "id": "policy_007",
                "title": "National Education Policy 2020",
                "ministry": "Ministry of Education",
                "category": "Education",
                "description": "NEP 2020 aims to transform the Indian education system to make it holistic, flexible, multidisciplinary and contemporary.",
                "date": "2020-07-29",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "4+1 academic structure",
                    "Flexible curriculum",
                    "Holistic development",
                    "Technology integration"
                ]
            },
            {
                "id": "policy_008",
                "title": "Production Linked Incentive (PLI) Scheme",
                "ministry": "Department for Promotion of Industry and Internal Trade",
                "category": "Business",
                "description": "PLI scheme is designed to make Indian manufacturers globally competitive and attract manufacturing investments.",
                "date": "2021-04-01",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Manufacturing incentives",
                    "Export promotion",
                    "Job creation",
                    "Sector-specific support"
                ]
            },
            {
                "id": "policy_009",
                "title": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
                "ministry": "Ministry of Finance",
                "category": "Finance",
                "description": "PMJDY is a national mission for financial inclusion to ensure access to financial services for all citizens.",
                "date": "2014-08-28",
                "status": "Active",
                "impact": "Medium",
                "key_points": [
                    "Universal banking access",
                    "Zero balance accounts",
                    "Life insurance coverage",
                    "Financial literacy"
                ]
            },
            {
                "id": "policy_010",
                "title": "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
                "ministry": "Ministry of Health and Family Welfare",
                "category": "Healthcare",
                "description": "AB-PMJAY is the world's largest government-sponsored health insurance scheme covering vulnerable population.",
                "date": "2018-09-23",
                "status": "Active",
                "impact": "High",
                "key_points": [
                    "Health insurance coverage",
                    "Free hospitalization",
                    "Cashless treatment",
                    "Coverage up to Rs. 5 lakh per family"
                ]
            }
        ]

    def get_policy_text(self, policy: Dict[str, Any]) -> str:
        """Convert policy dict to searchable text"""
        text_parts = [
            policy.get("title", ""),
            policy.get("description", ""),
            " ".join(policy.get("key_points", [])),
            policy.get("ministry", "")
        ]
        return " ".join(filter(None, text_parts))

    def get_all_policies_text(self) -> List[str]:
        """Get all policies as text for embedding"""
        return [self.get_policy_text(policy) for policy in self.policies]

    def search_policies(self, query: str) -> List[Dict[str, Any]]:
        """Simple keyword search in policies"""
        query_lower = query.lower()
        results = []
        
        for policy in self.policies:
            text = self.get_policy_text(policy).lower()
            if query_lower in text:
                results.append(policy)
        
        return results
