import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const {
    isOpen,
    toggleWidget,
    closeWidget,
    unreadCount,
    messages,
    currentChatId,
    startNewChat,
  } = useChat();
  const [isMinimized, setIsMinimized] = useState(false);
  const widgetRef = useRef(null);

  // Start a new chat if no current chat
  useEffect(() => {
    if (!currentChatId && !isOpen) {
      startNewChat();
    }
  }, [currentChatId, isOpen, startNewChat]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 font-sans"
      style={{ zIndex: 9999 }}
    >
      {/* Floating Button */}
      <div className="relative">
        {/* Pulse animation ring */}
        <div
          className={`absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-pulse transition-all duration-300 ${
            isOpen ? "scale-0" : "scale-100"
          }`}
        />

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-30 animate-pulse transition-all duration-300 ${
            isOpen ? "scale-0" : "scale-100"
          }`}
        />

        {/* Main button */}
        <button
          onClick={toggleWidget}
          className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border border-blue-400/30 hover:border-blue-300/50 ${
            isOpen ? "shadow-2xl scale-95" : "hover:scale-110"
          }`}
          aria-label="Open chat"
        >
          {/* Robot icon */}
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.5 1.5H9.5V0h1v1.5zM14 3l.707-.707.707.707-.707.707L14 3zM6 3l-.707-.707-.707.707.707.707L6 3zm8.5 2.5v-1h1.5v1h-1.5zM1.5 5.5H0v1h1.5v-1zm17 0v1h1.5v-1h-1.5zm-3 3.5v-2h-2v2h2zm-10 0v-2h-2v2h2zM4 8.5H2.5v1H4v-1zm12 0v1h1.5v-1h-1.5zm-7 7.5v2h2v-2h-2zm0 4.5v1.5H9v-1.5h1zm6-4.5h2v2h-2v-2zm-8 0H4v2h2v-2z" />
          </svg>

          {/* Unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

          {/* Hover glow text */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-blue-300/40 animate-pulse" />
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-full max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(10, 15, 30, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
          }}
        >
          {/* Glass morphism container */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/80 to-blue-700/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-blue-400/20">
              <div className="flex items-center gap-3">
                {/* Online indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-white font-semibold text-sm">
                    PolicyBot
                  </span>
                </div>
              </div>

              {/* Header buttons */}
              <div className="flex items-center gap-2">
                {/* Minimize button */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-blue-500/30 rounded-lg transition-colors duration-200 text-blue-100 hover:text-white"
                  aria-label="Minimize chat"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>

                {/* Close button */}
                <button
                  onClick={closeWidget}
                  className="p-1.5 hover:bg-red-500/30 rounded-lg transition-colors duration-200 text-blue-100 hover:text-red-300"
                  aria-label="Close chat"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Window */}
            {!isMinimized && (
              <div className="h-96 flex flex-col">
                <ChatWindow isWidget={true} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile-optimized floating button fallback */}
    </div>
  );
}
