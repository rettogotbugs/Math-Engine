import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { mathTools } from "../lib/mathTools";
import { cn } from "../lib/utils";

type TopbarProps = {
  onMenuClick: () => void;
  onSelectTool: (toolId: string) => void;
};

export function Topbar({ onMenuClick, onSelectTool }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = searchQuery
    ? mathTools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="relative w-full max-w-md">
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border bg-zinc-900/50 px-4 py-2 transition-all duration-200",
            isFocused
              ? "border-indigo-500/50 ring-2 ring-indigo-500/20"
              : "border-white/10",
          )}
        >
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tools, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
        </div>

        {isFocused && searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl backdrop-blur-xl">
            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    setSearchQuery("");
                  }}
                  className="flex w-full flex-col items-start rounded-xl p-3 text-left transition-colors hover:bg-white/5"
                >
                  <span className="text-sm font-medium text-white">
                    {tool.name}
                  </span>
                  <span className="text-xs text-zinc-500">{tool.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
