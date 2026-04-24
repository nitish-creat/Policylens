export const mockPolicies = [
  {
    id: 1,
    name: "Affordable Care Act Amendment",
    country: "United States",
    region: "Federal",
    category: "Healthcare",
    status: "Passed",
    date: "2024-01-15",
    impactScore: 8.5,
    summary:
      "Amendment to expand coverage for mental health services across all insurance plans.",
    description:
      "This amendment mandates that all insurance providers covered under the ACA must include comprehensive mental health coverage at no additional cost to patients.",
    timeline: [
      { date: "2023-06-01", event: "Bill introduced in Congress" },
      { date: "2023-09-15", event: "Passed House Committee" },
      { date: "2023-11-20", event: "Passed Senate Floor" },
      { date: "2024-01-15", event: "Signed into law" },
    ],
    affectedSectors: ["Healthcare", "Insurance", "Mental Health Services"],
    relatedPolicies: [2, 5],
    sourceLinks: [
      { title: "Official Bill Text", url: "https://congress.gov/bill" },
      { title: "CMS Implementation Guide", url: "https://cms.gov/guide" },
    ],
  },
  {
    id: 2,
    name: "Corporate Tax Reform Act",
    country: "United States",
    region: "Federal",
    category: "Tax",
    status: "Proposed",
    date: "2024-02-01",
    impactScore: 7.8,
    summary: "Proposal to restructure corporate tax rates and close loopholes.",
    description:
      "Comprehensive tax reform targeting multinational corporations, increasing effective tax rate while providing incentives for domestic investment.",
    timeline: [
      { date: "2024-01-10", event: "Proposal announced" },
      { date: "2024-02-01", event: "Bill formally introduced" },
    ],
    affectedSectors: ["Corporate Finance", "Business", "Investment"],
    relatedPolicies: [1, 3],
    sourceLinks: [
      {
        title: "Treasury Department Analysis",
        url: "https://treasury.gov/analysis",
      },
    ],
  },
  {
    id: 3,
    name: "Climate Action Initiative 2024",
    country: "United States",
    region: "Federal",
    category: "Environment",
    status: "Passed",
    date: "2024-01-20",
    impactScore: 9.2,
    summary:
      "Comprehensive climate action plan with emissions reduction targets.",
    description:
      "Federal initiative establishing binding emissions reduction targets of 50% by 2035, with funding for green infrastructure and renewable energy transition.",
    timeline: [
      { date: "2023-03-01", event: "Climate summit agreement" },
      { date: "2023-08-15", event: "Congressional hearings" },
      { date: "2023-12-10", event: "Passed both chambers" },
      { date: "2024-01-20", event: "Executive order signed" },
    ],
    affectedSectors: [
      "Energy",
      "Transportation",
      "Manufacturing",
      "Agriculture",
    ],
    relatedPolicies: [],
    sourceLinks: [
      { title: "EPA Implementation Plan", url: "https://epa.gov/plan" },
      {
        title: "Carbon Pricing Framework",
        url: "https://climate.gov/framework",
      },
    ],
  },
  {
    id: 4,
    name: "Education Funding Modernization",
    country: "United States",
    region: "Federal",
    category: "Education",
    status: "Amended",
    date: "2024-01-10",
    impactScore: 7.2,
    summary: "Update to K-12 education funding formulas and STEM initiatives.",
    description:
      "Modernization of federal education funding with emphasis on STEM education, special education services, and rural school support.",
    timeline: [
      { date: "2023-05-01", event: "Funding review initiated" },
      { date: "2023-09-20", event: "First draft released" },
      { date: "2023-11-30", event: "Amendments proposed" },
      { date: "2024-01-10", event: "Final version passed" },
    ],
    affectedSectors: ["Education", "K-12 Schools", "Higher Education"],
    relatedPolicies: [5],
    sourceLinks: [
      { title: "Department of Education Notice", url: "https://ed.gov/notice" },
    ],
  },
  {
    id: 5,
    name: "Worker Protection Standards",
    country: "United States",
    region: "Federal",
    category: "Labor",
    status: "Passed",
    date: "2024-02-05",
    impactScore: 8.1,
    summary:
      "New federal standards for workplace safety and employee protections.",
    description:
      "Establishment of enhanced worker protections including remote work rights, occupational health standards, and union organizing protections.",
    timeline: [
      { date: "2023-04-01", event: "OSHA review completed" },
      { date: "2023-07-15", event: "Public comment period" },
      { date: "2023-10-30", event: "Standards finalized" },
      { date: "2024-02-05", event: "Implementation begins" },
    ],
    affectedSectors: [
      "Labor",
      "Manufacturing",
      "Technology",
      "Service Industry",
    ],
    relatedPolicies: [2, 4],
    sourceLinks: [
      { title: "OSHA Standards Document", url: "https://osha.gov/standards" },
    ],
  },
  {
    id: 6,
    name: "Defense Modernization Spending Bill",
    country: "United States",
    region: "Federal",
    category: "Defense",
    status: "Proposed",
    date: "2024-01-25",
    impactScore: 6.9,
    summary: "Budget allocation for military technology modernization.",
    description:
      "Defense spending authorization focusing on cybersecurity infrastructure, autonomous systems development, and space capabilities.",
    timeline: [
      { date: "2024-01-10", event: "Preliminary budget submitted" },
      { date: "2024-01-25", event: "Bill introduced" },
    ],
    affectedSectors: ["Defense", "Technology", "Aerospace"],
    relatedPolicies: [],
    sourceLinks: [
      { title: "DoD Budget Brief", url: "https://defense.gov/budget" },
    ],
  },
  {
    id: 7,
    name: "Digital Privacy Act",
    country: "United Kingdom",
    region: "National",
    category: "Healthcare",
    status: "Passed",
    date: "2024-01-05",
    impactScore: 8.3,
    summary: "Comprehensive digital privacy protections for health data.",
    description:
      "UK-wide legislation ensuring NHS and private healthcare providers implement standardized data protection measures.",
    timeline: [
      { date: "2023-02-01", event: "Consultation launched" },
      { date: "2023-06-15", event: "Parliament debate" },
      { date: "2023-11-20", event: "Royal Assent granted" },
      { date: "2024-01-05", event: "Implementation phase begins" },
    ],
    affectedSectors: ["Healthcare", "Technology", "Data Services"],
    relatedPolicies: [],
    sourceLinks: [
      { title: "UK Parliament Bill Text", url: "https://parliament.uk/bill" },
    ],
  },
  {
    id: 8,
    name: "European Green Taxonomy Update",
    country: "European Union",
    region: "Continental",
    category: "Environment",
    status: "Amended",
    date: "2024-02-10",
    impactScore: 7.6,
    summary:
      "Amendment to EU taxonomy for sustainable investment classification.",
    description:
      "Update to EU sustainable finance taxonomy clarifying green investment criteria and expanding coverage to agriculture and forestry.",
    timeline: [
      { date: "2023-03-01", event: "Technical expert review" },
      { date: "2023-07-20", event: "Commission proposal" },
      { date: "2023-10-30", event: "Parliament amendments" },
      { date: "2024-02-10", event: "Final regulation published" },
    ],
    affectedSectors: ["Finance", "Agriculture", "Energy", "Forestry"],
    relatedPolicies: [3],
    sourceLinks: [
      {
        title: "EU Commission Technical Report",
        url: "https://ec.europa.eu/report",
      },
    ],
  },
  {
    id: 9,
    name: "Minimum Wage Increase Directive",
    country: "Canada",
    region: "National",
    category: "Labor",
    status: "Passed",
    date: "2024-01-30",
    impactScore: 7.4,
    summary: "Federal minimum wage increase to $16.50 CAD per hour.",
    description:
      "Phased increase in federal minimum wage with regional adjustments for provinces with higher costs of living.",
    timeline: [
      { date: "2023-08-01", event: "Government announcement" },
      { date: "2023-10-15", event: "Parliamentary debate" },
      { date: "2023-12-20", event: "Bill passed" },
      { date: "2024-01-30", event: "Implementation begins" },
    ],
    affectedSectors: ["Labor", "Retail", "Food Service", "Hospitality"],
    relatedPolicies: [5],
    sourceLinks: [
      {
        title: "Employment and Social Development Canada",
        url: "https://esdc.gc.ca/wage",
      },
    ],
  },
  {
    id: 10,
    name: "AI Regulation Framework",
    country: "United States",
    region: "Federal",
    category: "Education",
    status: "Proposed",
    date: "2024-02-15",
    impactScore: 8.7,
    summary:
      "Comprehensive federal framework for artificial intelligence regulation.",
    description:
      "Proposed regulatory framework establishing guidelines for AI development, deployment, and accountability mechanisms.",
    timeline: [
      { date: "2024-01-20", event: "White House announcement" },
      { date: "2024-02-15", event: "Draft framework released" },
    ],
    affectedSectors: ["Technology", "Healthcare", "Finance", "Government"],
    relatedPolicies: [],
    sourceLinks: [
      { title: "White House AI Framework", url: "https://whitehouse.gov/ai" },
    ],
  },
];
