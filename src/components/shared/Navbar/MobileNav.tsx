"use client";

import { useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import AuthButtons from "./AuthButtons";
import UserAvatar from "./UserAvatar";
import { getDashboardRoute } from "./utils";
import type { NavLink, Category } from "./types";
import NavLinks from "./Navlinks ";

interface Props {
  publicLinks: NavLink[];
  categories: Category[];
  cartCount?: number;
  wishlistCount?: number;
}

export default function MobileNav({
  publicLinks,
  categories,
  cartCount = 0,
  wishlistCount = 0,
}: Props) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const dashboardRoute = getDashboardRoute(user?.role);

  const allLinks: NavLink[] = [
    ...publicLinks,
    ...(user
      ? [{ label: "Dashboard", href: dashboardRoute, icon: LayoutDashboard }]
      : []),
  ];

  const close = () => setOpen(false);

  return (
    <div className="md:hidden w-full">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between h-14 px-4">
        <Logo />
        <div className="flex items-center gap-1">
          <WishlistIcon count={wishlistCount} />
          <CartIcon count={cartCount} />
          {user && <UserAvatar />}
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3">
        <SearchBar />
      </div>

      {/* Slide-down drawer */}
      {open && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
          <NavLinks links={allLinks} onLinkClick={close} orientation="vertical" />

          {/* Categories list */}
          {categories.length > 0 && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                Categories
              </p>
              {categories.map((cat) => (
                <a
                  key={cat.href}
                  href={cat.href}
                  onClick={close}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
                  {cat.label}
                </a>
              ))}
            </div>
          )}

          {/* Auth */}
          {!user && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 mt-2">
              <AuthButtons onLinkClick={close} orientation="vertical" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}