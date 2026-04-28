import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 animate-in fade-in duration-500">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        🤖
      </div>

      {/* Typing indicator bubble */}
      <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-gradient-to-br from-slate-700 to-slate-800 border border-blue-500/30 shadow-lg">
        <div className="flex items-center gap-2">
          {/* Bouncing dots */}
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          {/* Optional text */}
          <span className="text-xs text-slate-400 ml-1">
            PolicyBot is thinking...
          </span>
        </div>
      </div>
    </div>
  );
}
