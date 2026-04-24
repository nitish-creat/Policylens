# PolicyPulse - Public Policy Change Tracker

A modern, professional React-based web application for tracking government policy changes in real-time. Built with a dark navy + electric blue + amber aesthetic inspired by Bloomberg Terminal and modern civic tech dashboards.

## Features

- **Dashboard** - Live feed of recent policy changes with category filters
- **Policy Search & Filter** - Advanced search by keyword, country, category, date range, and status
- **Policy Details** - Comprehensive breakdowns including timelines, affected sectors, and source links
- **Watch & Alert System** - Track specific policies with local state persistence
- **Timeline View** - Chronological visualization of all policy changes
- **Statistics Strip** - Real-time metrics on tracked policies, countries covered, and active proposals
- **Category-based Organization** - Healthcare, Tax, Environment, Education, Labor, Defense

## Design System

- **Color Palette**: Dark Navy (#1a365d) + Electric Blue (#0ea5e9) + Amber (#f59e0b)
- **Typography**: IBM Plex Sans (body) + Syne (headings)
- **Aesthetic**: Bloomberg Terminal meets modern civic tech — dense, informative, authoritative

## Tech Stack

- **Frontend**: React 18.2
- **Routing**: React Router 6.20
- **State Management**: Context API
- **Styling**: Tailwind CSS 3.3
- **Data Visualization**: Recharts 2.10
- **Icons**: Lucide React 0.294
- **HTTP Client**: Axios 1.6
- **Date Handling**: date-fns 2.30
- **Build Tool**: Vite 5.0

## Project Structure

```
policylens/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── assets/                 # Logos and icons
│   ├── components/
│   │   ├── layout/             # Navbar, Sidebar, Footer
│   │   ├── ui/                 # Reusable UI components
│   │   └── charts/             # Data visualization components
│   ├── context/                # React Context (Policy, Alerts)
│   ├── data/
│   │   └── mockPolicies.js     # Mock data for development
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components
│   ├── services/               # API service layer
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React DOM entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Pages & Routes

- `/` - Dashboard (main feed)
- `/policy/:id` - Policy detail page
- `/search` - Advanced search interface
- `/timeline` - Chronological timeline view
- `/tracked` - Watched policies list

## Components

### Layout

- **Navbar** - Top navigation with logo, search, and alerts bell
- **Sidebar** - Left navigation menu with category shortcuts
- **Footer** - Page footer with branding

### UI Components

- **PolicyCard** - Reusable card displaying policy information
- **StatusBadge** - Status indicator (Proposed, Passed, Repealed, Amended)
- **SearchBar** - Search input with clear functionality
- **FilterPanel** - Advanced filtering by category, status, country
- **StatsStrip** - Displays key metrics
- **AlertToggle** - Watch/unwatch button

### Charts

- **TimelineChart** - Vertical timeline visualization
- **ImpactChart** - Impact distribution bar chart

## State Management

### PolicyContext

- Global policy data
- Search and filter logic
- Policy retrieval methods

### AlertContext

- Watched policies list
- LocalStorage persistence
- Toggle watch/unwatch functionality

## Mock Data

The application comes with 10 sample policies covering various categories and countries. Mock data is located in `src/data/mockPolicies.js` and can be replaced with real API calls by updating the service layer in `src/services/policyService.js`.

## Customization

### Updating Colors

Edit the color palette in `tailwind.config.js` under the `colors` section.

### Changing Fonts

Update font imports in `public/index.html` and font family in `tailwind.config.js`.

### Connecting to a Real API

Update `src/services/policyService.js` to replace mock API calls with real endpoints.

### Adding New Categories

Update the categories array in `src/utils/categoryColors.js` and add corresponding colors.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

---

**PolicyPulse** - Making government policy changes transparent and accessible.
