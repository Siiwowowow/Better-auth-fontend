"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

interface WishlistIconProps {
  count?: number;
}

export default function WishlistIcon({ count = 0 }: WishlistIconProps) {
  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${count} saved item${count !== 1 ? "s" : ""}`}
      className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Heart className="w-5 h-5" />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-rose-500 text-white text-[10px] font-semibold rounded-full leading-none"
          aria-hidden="true"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}