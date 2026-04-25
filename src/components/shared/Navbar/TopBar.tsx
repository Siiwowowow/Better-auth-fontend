"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TopBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gray-900 dark:bg-gray-950 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
      <p className="text-center">
        🎉 Free shipping on orders over $50!{" "}
        <a
          href="/deals"
          className="underline font-medium hover:text-gray-300 transition-colors ml-1"
        >
          Shop deals
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}