import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import chatService from "../../services/chatService";

export default function ChatWindow({ isWidget = false }) {
  const {
    messages,
    isTyping,
    setIsTyping,
    addMessage,
    setSources,
    incrementUnread,
    currentChatId,
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const welcomeMessageAdded = useRef(false);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initialize with welcome message (only once per chat)
  useEffect(() => {
    if (
      currentChatId &&
      messages.length === 0 &&
      !welcomeMessageAdded.current
    ) {
      welcomeMessageAdded.current = true;
      const welcomeMessage = {
        id: `welcome_${currentChatId}`,
        role: "ai",
        content:
          "👋 Welcome to PolicyBot! I'm here to help you understand Indian government policies. Ask me anything about labor laws, GST, environmental policies, tax incentives, and more. What would you like to know?",
        timestamp: new Date().toISOString(),
        source: null,
      };
      addMessage(welcomeMessage);
    }
  }, [currentChatId]);

  // Reset welcome message flag when switching chats
  useEffect(() => {
    welcomeMessageAdded.current = false;
  }, [currentChatId]);

  const handleSendMessage = async (questionText = inputValue) => {
    if (!questionText.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: questionText.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Prepare chat history (last 5 messages for context)
      const recentMessages = messages.slice(-5).map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

      // Call the API
      const response = await chatService.sendMessage(
        questionText,
        recentMessages,
      );

      // Add AI response
      const aiMessage = {
        id: `msg_${Date.now()}`,
        role: "ai",
        content: response.answer,
        timestamp: new Date().toISOString(),
        source: response.sources?.[0]?.ministry || null,
      };

      addMessage(aiMessage);
      setSources(response.sources || []);

      // Increment unread if widget is not open
      if (isWidget) {
        incrementUnread();
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      // Fallback message
      const fallbackMessage = {
        id: `msg_${Date.now()}`,
        role: "ai",
        content:
          "⚠️ AI is offline, showing cached response:\n\nI'm having trouble connecting to the policy database right now. This is a cached response. Please try again in a moment.\n\nFor now, you can:\n• Browse our policy documentation\n• Check the latest updates on our dashboard\n• Contact support if the issue persists",
        timestamp: new Date().toISOString(),
        source: "Cached",
      };

      addMessage(fallbackMessage);
      setSources([]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900/50 to-slate-950/50">
      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar"
      >
        {messages.length === 0 ? (
          // Empty state with suggested questions
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="text-4xl mb-2">🤖</div>
            <h3 className="text-slate-300 font-semibold mb-1">
              PolicyBot Ready
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Ask me about Indian government policies
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={message.id} className="group">
                <MessageBubble
                  message={message}
                  index={index}
                  isWidget={isWidget}
                />
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Questions (show only if no messages) */}
      {messages.length === 0 && (
        <SuggestedQuestions onSelect={handleSendMessage} />
      )}

      {/* Input Area */}
      <div className="border-t border-blue-500/20 bg-gradient-to-r from-slate-900/80 to-slate-950/80 backdrop-blur-sm p-4 space-y-3">
        {/* Send message input */}
        <div className="flex gap-2 items-end">
          {/* Microphone button (placeholder) */}
          <button
            className="p-2.5 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 text-slate-400 hover:text-blue-300 flex-shrink-0"
            title="Voice input (coming soon)"
            disabled
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
              />
            </svg>
          </button>

          {/* Input field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            placeholder="Ask about policies..."
            className="flex-1 bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 focus:border-blue-500 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />

          {/* Send button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-blue-400/30 hover:border-blue-300/50"
            title="Send message"
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.488 5.951 1.488a1 1 0 001.169-1.409l-7-14z" />
              </svg>
            )}
          </button>
        </div>

        {/* Character counter and status */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{inputValue.length} / 500</span>
          {isLoading && (
            <span className="text-blue-400">AI is thinking...</span>
          )}
        </div>
      </div>
    </div>
  );
}
