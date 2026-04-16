"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export function GoogleLoginSuccess() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show success toast if redirected back from Google login (backend sends ?login=success)
    const loginStatus = searchParams.get("login");
    
    if (loginStatus === "success") {
      // Small delay to ensure toast renders properly
      setTimeout(() => {
        toast.success("Logged in successfully! 🎉", {
          duration: 2500,  // Short duration - 2.5 seconds
        });
      }, 100);
      
      // Clean up URL (remove the login parameter)
      window.history.replaceState({}, "", "/");
    }

    // Show error toast if login failed
    if (loginStatus === "error") {
      setTimeout(() => {
        toast.error("Login failed. Please try again.", {
          duration: 2500,
        });
      }, 100);
      
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams]);

  return null;
}

