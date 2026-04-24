import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PolicyProvider } from "./context/PolicyContext";
import { AlertProvider } from "./context/AlertContext";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { Dashboard } from "./pages/Dashboard";
import { PolicyDetail } from "./pages/PolicyDetail";
import { TrackedPolicies } from "./pages/TrackedPolicies";
import { Timeline } from "./pages/Timeline";
import { Search } from "./pages/Search";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PolicyProvider>
      <AlertProvider>
        <Router>
          <div className="bg-navy-900 text-navy-100 min-h-screen font-plex-sans">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex">
              <Sidebar isOpen={sidebarOpen} />
              <main className="flex-1 lg:ml-64">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/policy/:id" element={<PolicyDetail />} />
                  <Route path="/tracked" element={<TrackedPolicies />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </PolicyProvider>
  );
}

export default App;
