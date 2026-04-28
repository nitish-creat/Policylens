import React from "react";
import { useChat } from "../../context/ChatContext";

export default function SourcePanel() {
  const { sources } = useChat();

  if (!sources || sources.length === 0) {
    return (
      <div className="h-full bg-gradient-to-b from-slate-900/30 to-slate-950/30 border-l border-blue-500/20 p-4 flex items-center justify-center text-center">
        <div>
          <div className="text-3xl mb-2">📚</div>
          <p className="text-slate-500 text-sm">
            Ask a question to see relevant policy sources
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-slate-900/30 to-slate-950/30 border-l border-blue-500/20 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.38 4.5 1.053V4.804z" />
            <path d="M15.5 1.75a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM10.5 10h4.75a2.75 2.75 0 100-5.5h-4.75a1 1 0 100 2h4.75a.75.75 0 010 1.5h-4.75a1 1 0 100 2z" />
          </svg>
          Sources Used
        </h3>
      </div>

      {/* Sources list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {sources.map((source, index) => {
          const relevance = source.relevance || 100 - index * 10;
          const isTopSource = index === 0;

          return (
            <div
              key={source.id || index}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                isTopSource
                  ? "bg-gradient-to-br from-blue-600/30 to-purple-600/20 border-blue-500/60 shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/40 border-blue-500/20 hover:border-blue-500/40"
              } group hover:shadow-lg hover:shadow-blue-500/10 transform hover:scale-105`}
            >
              {/* Top source badge */}
              {isTopSource && (
                <div className="inline-block mb-2 px-2 py-1 rounded text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  ⭐ Most Relevant
                </div>
              )}

              {/* Ministry/Source name */}
              <h4 className="font-semibold text-sm text-slate-100 mb-1 group-hover:text-blue-300 transition-colors duration-200">
                {source.ministry || source.source || "Government Policy"}
              </h4>

              {/* Policy title */}
              <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                {source.title || source.policy}
              </p>

              {/* Relevance bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">Relevance</span>
                  <span className="text-xs font-semibold text-blue-400">
                    {relevance}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                      relevance > 80
                        ? "from-green-500 to-emerald-500"
                        : relevance > 60
                          ? "from-blue-500 to-cyan-500"
                          : "from-amber-500 to-orange-500"
                    }`}
                    style={{ width: `${relevance}%` }}
                  />
                </div>
              </div>

              {/* Date */}
              {source.date && (
                <p className="text-xs text-slate-600">
                  📅 {new Date(source.date).toLocaleDateString("en-IN")}
                </p>
              )}

              {/* View source button */}
              <button className="mt-2 w-full px-2 py-1.5 text-xs rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 hover:text-blue-100 transition-colors duration-200 border border-blue-500/30 hover:border-blue-500/60">
                View Policy →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
