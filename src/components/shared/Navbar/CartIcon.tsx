// components/shared/Navbar/CartIcon.tsx

"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface Props {
  count?: number;
}

export default function CartIcon({ count = 0 }: Props) {
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count !== 1 ? "s" : ""}`}
      className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-blue-600 text-white text-[10px] font-semibold rounded-full leading-none"
          aria-hidden="true"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}