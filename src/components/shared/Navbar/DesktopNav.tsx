// components/shared/Navbar/DesktopNav.tsx

"use client";

import { useUser } from "@/hooks/useUser";
import { LayoutDashboard } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
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

export default function DesktopNav({
  publicLinks,
  categories,
  cartCount = 0,
  wishlistCount = 0,
}: Props) {
  const { user } = useUser();
  const dashboardRoute = getDashboardRoute(user?.role);

  const navLinks: NavLink[] = [
    ...publicLinks,
    ...(user
      ? [{ label: "Dashboard", href: dashboardRoute, icon: LayoutDashboard }]
      : []),
  ];

  return (
    <div className="hidden md:flex flex-col w-full">
      {/* Top row: Logo + Search + Icons */}
      <div className="flex items-center justify-between gap-6 h-16 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1">
          <WishlistIcon count={wishlistCount} />
          <CartIcon count={cartCount} />
          {user ? (
            <div className="ml-1">
              <UserAvatar />
            </div>
          ) : (
            <div className="ml-2">
              <AuthButtons />
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: Category menu + nav links */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-11">
          {categories.length > 0 && <CategoryMenu categories={categories} />}
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
          <NavLinks links={navLinks} orientation="horizontal" />
        </div>
      </div>
    </div>
  );
}