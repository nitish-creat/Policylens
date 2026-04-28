import React, { useState, useEffect } from "react";

export default function MessageBubble({ message, index, isWidget = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger fade-in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    // TODO: Send feedback to backend
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isUserMessage = message.role === "user";

  return (
    <div
      className={`flex gap-3 mb-4 animate-in fade-in duration-500 ${
        isUserMessage ? "flex-row-reverse" : "flex-row"
      } ${!isVisible ? "opacity-0" : "opacity-100"}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isUserMessage
            ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900"
            : "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
        }`}
      >
        {isUserMessage ? "👤" : "🤖"}
      </div>

      {/* Message Content */}
      <div
        className={`flex flex-col gap-1 max-w-xs ${isUserMessage ? "items-end" : "items-start"}`}
      >
        {/* Main message bubble */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUserMessage
              ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-br-none shadow-lg"
              : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 rounded-bl-none border border-blue-500/30 shadow-lg"
          }`}
        >
          {/* Message text with line breaks */}
          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          {/* Source tag for AI messages */}
          {!isUserMessage && message.source && (
            <div className="mt-2 pt-2 border-t border-blue-400/30 text-xs text-blue-200 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>Source: {message.source}</span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-slate-500 px-1">
          {formatTime(message.timestamp)}
        </span>

        {/* Action buttons for AI messages */}
        {!isUserMessage && !isWidget && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-slate-600/50 transition-colors duration-200 text-slate-400 hover:text-slate-200"
              title="Copy message"
            >
              {isCopied ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>

            {/* Thumbs up button */}
            <button
              onClick={() => handleFeedback("positive")}
              className={`p-1.5 rounded-lg transition-colors duration-200 ${
                feedback === "positive"
                  ? "bg-green-500/30 text-green-400"
                  : "hover:bg-slate-600/50 text-slate-400 hover:text-slate-200"
              }`}
              title="Helpful"
            >
              <svg
                className="w-4 h-4"
                fill={feedback === "positive" ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H9m-3-4h3.333m9-1a9 9 0 00-5-8.979m5 8.979L5 20.5m12-10a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </button>

            {/* Thumbs down button */}
            <button
              onClick={() => handleFeedback("negative")}
              className={`p-1.5 rounded-lg transition-colors duration-200 ${
                feedback === "negative"
                  ? "bg-red-500/30 text-red-400"
                  : "hover:bg-slate-600/50 text-slate-400 hover:text-slate-200"
              }`}
              title="Not helpful"
            >
              <svg
                className="w-4 h-4"
                fill={feedback === "negative" ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.646-7.23a2 2 0 011.789-1.106H15m3 4h-3.333m-9 1a9 9 0 005-8.979m-5 8.979L19 3.5m-12 10a9 9 0 1-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
