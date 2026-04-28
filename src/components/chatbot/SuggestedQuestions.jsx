import React from "react";

const SUGGESTED_QUESTIONS = [
  {
    id: 1,
    text: "What is the new labor code?",
    icon: "⚙️",
  },
  {
    id: 2,
    text: "GST rules for small businesses?",
    icon: "📊",
  },
  {
    id: 3,
    text: "Environmental policy for manufacturing?",
    icon: "🌿",
  },
  {
    id: 4,
    text: "Tax incentives for startups 2024?",
    icon: "🚀",
  },
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="border-t border-blue-500/20 bg-gradient-to-r from-slate-900/60 to-slate-950/60 backdrop-blur-sm p-4">
      <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
        Quick Questions
      </p>

      <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto custom-scrollbar">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelect(question.text)}
            className="text-left px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 border border-blue-500/30 hover:border-blue-400/60 text-slate-200 text-sm transition-all duration-200 hover:translate-x-1 active:scale-95 group"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{question.icon}</span>
              <span className="group-hover:text-blue-300">{question.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
