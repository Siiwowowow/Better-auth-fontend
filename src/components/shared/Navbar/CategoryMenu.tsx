// components/shared/Navbar/CategoryMenu.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Grid3x3, Sparkles } from "lucide-react";
import type { CategoryMenuProps } from "./types";

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // বাইরে click করলে menu বন্ধ হবে
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* 🔥 Main Button */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (open) setActiveCategory(null);
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          open
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-muted-foreground hover:text-primary hover:bg-muted"
        }`}
      >
        <Grid3x3 className="w-4 h-4" />
        <span>All Categories</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 🔥 Dropdown */}
      {open && (
        <div className="absolute left-0 top-12 w-80 bg-white dark:bg-gray-900 border border-border rounded-2xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95">

          <div className="max-h-[70vh] overflow-y-auto">

            {categories.map((cat) => (
              <div key={cat.href}>

                {/* 🔥 Category Item */}
                <Link
                  href={cat.href}
                  onClick={(e) => {
                    if (cat.subcategories && cat.subcategories.length > 0) {
                      e.preventDefault(); // prevent redirect
                      setActiveCategory((prev) =>
                        prev === cat.label ? null : cat.label
                      );
                    } else {
                      setOpen(false);
                      setActiveCategory(null);
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-3 transition ${
                    activeCategory === cat.label
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">
                    {cat.label}
                  </span>

                  {cat.subcategories && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeCategory === cat.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* 🔥 Subcategories */}
                {cat.subcategories &&
                  activeCategory === cat.label && (
                    <div className="pl-10 pb-2 space-y-1 animate-in slide-in-from-top-1">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => {
                            setOpen(false);
                            setActiveCategory(null);
                          }}
                          className="block text-xs text-muted-foreground hover:text-primary py-1 transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* 🔥 Footer */}
          <div className="border-t border-border mt-2 pt-2 px-4">
            <Link
              href="/shop"
              onClick={() => {
                setOpen(false);
                setActiveCategory(null);
              }}
              className="flex items-center justify-between text-sm text-primary font-medium py-2 hover:opacity-80 transition"
            >
              <span>View All Categories</span>
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}