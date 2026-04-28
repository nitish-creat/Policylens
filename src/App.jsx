import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PolicyProvider } from "./context/PolicyContext";
import { AlertProvider } from "./context/AlertContext";
import { ChatProvider } from "./context/ChatContext";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import ChatWidget from "./components/chatbot/ChatWidget";
import ChatPage from "./pages/ChatPage";
import { Dashboard } from "./pages/Dashboard";
import { PolicyDetail } from "./pages/PolicyDetail";
import { TrackedPolicies } from "./pages/TrackedPolicies";
import { Timeline } from "./pages/Timeline";
import { Search } from "./pages/Search";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ChatProvider>
      <PolicyProvider>
        <AlertProvider>
          <Router basename="/Policylens">
            <div className="bg-navy-900 text-navy-100 min-h-screen font-plex-sans">
              <Routes>
                {/* Full page chatbot route */}
                <Route path="/chatbot" element={<ChatPage />} />

                {/* Standard layout routes */}
                <Route
                  path="*"
                  element={
                    <>
                      <Navbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                      <div className="flex">
                        <Sidebar isOpen={sidebarOpen} />
                        <main className="flex-1 lg:ml-64">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route
                              path="/policy/:id"
                              element={<PolicyDetail />}
                            />
                            <Route
                              path="/tracked"
                              element={<TrackedPolicies />}
                            />
                            <Route path="/timeline" element={<Timeline />} />
                            <Route path="/search" element={<Search />} />
                          </Routes>
                        </main>
                      </div>
                      <Footer />
                      {/* Floating chatbot widget */}
                      <ChatWidget />
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>
        </AlertProvider>
      </PolicyProvider>
    </ChatProvider>
  );
}

export default App;
