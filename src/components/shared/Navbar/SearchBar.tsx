"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchBarProps } from "./types";

export default function SearchBar({
  placeholder = "Search products...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch?.(query.trim());
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center w-full max-w-xl bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 gap-2 transition-all border ${
        focused
          ? "border-blue-500 bg-white dark:bg-gray-700 shadow-sm"
          : "border-transparent"
      }`}
    >
      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none min-w-0"
        aria-label="Search products"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}