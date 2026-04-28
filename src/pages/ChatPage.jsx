import React, { useState } from "react";
import { useChat } from "../context/ChatContext";
import ChatWindow from "../components/chatbot/ChatWindow";
import SourcePanel from "../components/chatbot/SourcePanel";

export default function ChatPage() {
  const {
    chatHistory,
    currentChatId,
    startNewChat,
    loadChat,
    deleteChat,
    clearMessages,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteChat = (chatId) => {
    if (confirmDelete === chatId) {
      deleteChat(chatId);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(chatId);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col text-slate-100 overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-md border-b border-blue-400/20 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            🤖
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">PolicyBot</h1>
            <p className="text-xs text-blue-100">
              Powered by llama3.1 + ChromaDB
            </p>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Left Sidebar - Chat History */}
        <div
          className={`bg-gradient-to-b from-slate-900 to-slate-950 border-r border-blue-500/20 flex flex-col transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          {/* Sidebar header */}
          <div className="p-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm flex-shrink-0">
            <button
              onClick={startNewChat}
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 border border-blue-400/30"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
          </div>

          {/* Chat history list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {chatHistory.length === 0 ? (
              <div className="text-center text-slate-500 text-sm py-8">
                <p>No chats yet</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group rounded-lg transition-all duration-200 ${
                    currentChatId === chat.id
                      ? "bg-gradient-to-r from-blue-600/40 to-purple-600/30 border border-blue-500/50"
                      : "bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/30 hover:border-blue-500/30"
                  }`}
                >
                  {/* Chat item */}
                  <button
                    onClick={() => loadChat(chat.id)}
                    className="w-full text-left px-3 py-2.5 flex-1 flex items-start justify-between gap-2 min-w-0"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Chat title */}
                      <h4 className="text-sm font-semibold text-slate-100 truncate group-hover:text-blue-300 transition-colors">
                        {chat.title || "Untitled Chat"}
                      </h4>

                      {/* Chat preview */}
                      {chat.messages && chat.messages.length > 0 && (
                        <p className="text-xs text-slate-400 truncate mt-1">
                          {chat.messages[chat.messages.length - 1].content}
                        </p>
                      )}

                      {/* Chat date */}
                      <p className="text-xs text-slate-600 mt-1">
                        {new Date(chat.updatedAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    {/* Message count badge */}
                    <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-1 rounded whitespace-nowrap">
                      {chat.messages?.length || 0}
                    </span>
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="absolute right-2 top-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/30 text-red-300 hover:text-red-200"
                    title={
                      confirmDelete === chat.id
                        ? "Click again to confirm delete"
                        : "Delete chat"
                    }
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Sidebar footer */}
          {chatHistory.length > 0 && (
            <div className="p-3 border-t border-blue-500/20 flex-shrink-0">
              <button
                onClick={() => {
                  if (
                    confirm("Clear all chat history? This cannot be undone.")
                  ) {
                    clearMessages();
                  }
                }}
                className="w-full px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200 border border-slate-700/30 hover:border-red-500/30"
              >
                Clear history
              </button>
            </div>
          )}
        </div>

        {/* Center - Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow isWidget={false} />
        </div>

        {/* Right Sidebar - Sources */}
        <div className="w-80 bg-gradient-to-b from-slate-900 to-slate-950 border-l border-blue-500/20 overflow-hidden">
          <SourcePanel />
        </div>
      </div>

      {/* Sidebar Toggle Button (mobile) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 md:hidden"
        aria-label="Toggle sidebar"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
