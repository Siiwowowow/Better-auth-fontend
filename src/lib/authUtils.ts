// src/lib/authUtils.ts

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";
export type UserStatus = "PENDING_VERIFICATION" | "ACTIVE" | "BLOCKED" | "DELETED";

export interface ICurrentUser {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  isDeleted: boolean;
  emailVerified: boolean;
  needPasswordChange: boolean;
  image?: string;
  iat?: number;
  exp?: number;
}

// Auth routes (accessible without authentication)
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// Public routes (accessible to everyone, including non-authenticated users)
export const publicRoutes = [
  "/",
  "/products",
  "/categories",
  "/deals",
  "/flash-sales",
  "/new-arrivals",
  "/best-sellers",
  "/about",
  "/contact",
  "/faq",
  "/terms",
  "/privacy",
  "/shipping",
  "/returns",
  "/size-guide",
  "/blog",
  "/search",
];

export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route: string) => 
    pathname === route || pathname.startsWith(`${route}?`)
  );
};

export const isPublicRoute = (pathname: string): boolean => {
  // Check exact matches
  if (publicRoutes.includes(pathname)) {
    return true;
  }
  
  // Check dynamic product/category routes
  if (pathname.startsWith("/products/") || pathname.startsWith("/categories/")) {
    return true;
  }
  
  // Check blog posts
  if (pathname.startsWith("/blog/")) {
    return true;
  }
  
  return false;
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

// Routes accessible to ALL authenticated users (regardless of role)
export const commonProtectedRoutes: RouteConfig = {
  exact: [
    "/my-profile",
    "/change-password",
    "/orders",
    "/wishlist",
    "/addresses",
    "/payment-methods",
    "/notifications",
    "/reviews",
    "/settings",
  ],
  pattern: [
    /^\/orders\//,           // Individual order details
    /^\/checkout/,           // Checkout process
    /^\/cart/,               // Shopping cart
    /^\/api\/user\//,        // User API routes
  ],
};

// Admin routes (ADMIN and SUPER_ADMIN)
export const adminProtectedRoutes: RouteConfig = {
  pattern: [
    /^\/admin/,              // All admin pages
    /^\/api\/admin\//,       // Admin API routes
  ],
  exact: [
    "/dashboard/admin",      // Admin dashboard
    "/users/manage",
    "/products/manage",
    "/orders/manage",
    "/categories/manage",
    "/inventory",
    "/analytics",
    "/reports",
    "/discounts",
    "/coupons",
    "/settings/admin",
  ],
};

// User/Customer routes (USER role only)
export const userProtectedRoutes: RouteConfig = {
  pattern: [
    /^\/user\/dashboard/,    // User dashboard
    /^\/api\/user\//,        // User API routes
  ],
  exact: [
    "/dashboard/user",
    "/my-orders",
    "/track-order",
    "/returns",
    "/refunds",
  ],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  // Check exact matches
  if (routes.exact.includes(pathname)) {
    return true;
  }
  
  // Check pattern matches
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "SUPER_ADMIN" | "ADMIN" | "USER" | "COMMON" | null => {
  
  // Check admin routes (accessible to both ADMIN and SUPER_ADMIN)
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN"; // SUPER_ADMIN will be handled as ADMIN
  }
  
  // Check user routes
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER";
  }

  // Check common protected routes (accessible to all authenticated users)
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  return null; // Public route or auth route
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return "/admin/dashboard";
    case "USER":
      return "/";
    default:
      return "/";
  }
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  // Unify SUPER_ADMIN and ADMIN (they have same access)
  const normalizedRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

  // Remove query parameters
  const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
  
  const routeOwner = getRouteOwner(sanitizedRedirectPath);

  // Public routes, auth routes, and common protected routes are valid for all authenticated users
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  // Check if route owner matches user's role
  return routeOwner === normalizedRole;
};

export const getAccessibleRoutes = (role: UserRole): string[] => {
  const routes: string[] = [
    ...publicRoutes,
    ...commonProtectedRoutes.exact,
  ];

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      routes.push(...adminProtectedRoutes.exact);
      break;
    case "USER":
      routes.push(...userProtectedRoutes.exact);
      break;
  }

  return routes;
};

export const canAccessRoute = (pathname: string, role: UserRole): boolean => {
  // Public routes are always accessible
  if (isPublicRoute(pathname)) {
    return true;
  }

  // Auth routes are only for non-authenticated users
  if (isAuthRoute(pathname)) {
    return false; // Authenticated users shouldn't access auth routes
  }

  // Check role-based access
  return isValidRedirectForRole(pathname, role);
};

export const getRedirectAfterLogin = (
  userRole: UserRole,
  intendedPath?: string
): string => {
  // If there's an intended path and it's valid for the user's role
  if (intendedPath && isValidRedirectForRole(intendedPath, userRole)) {
    // Don't redirect to auth pages after login
    if (!isAuthRoute(intendedPath)) {
      return intendedPath;
    }
  }

  // Default to role-specific dashboard
  return getDefaultDashboardRoute(userRole);
};

export const requiresEmailVerification = (pathname: string): boolean => {
  // Routes that require email verification
  const verificationRequiredRoutes: RouteConfig = {
    exact: [
      "/checkout",
      "/payment",
      "/orders/create",
      "/reviews/write",
    ],
    pattern: [
      /^\/checkout\//,
      /^\/payment\//,
    ],
  };

  return isRouteMatches(pathname, verificationRequiredRoutes);
};

export const isAdminRoute = (pathname: string): boolean => {
  return isRouteMatches(pathname, adminProtectedRoutes);
};

export const isUserRoute = (pathname: string): boolean => {
  return isRouteMatches(pathname, userProtectedRoutes);
};

export const isProtectedRoute = (pathname: string): boolean => {
  return (
    isAdminRoute(pathname) ||
    isUserRoute(pathname) ||
    isRouteMatches(pathname, commonProtectedRoutes)
  );
};