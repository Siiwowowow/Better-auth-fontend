"use client";

import { Button } from "@/components/ui/button";

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      console.error("API base URL missing");
      return;
    }

    const redirect = encodeURIComponent("/");

    window.location.href = `${baseUrl}/auth/login/google?redirect=${redirect}`;
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGoogleLogin}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78..." />
        <path fill="currentColor" d="M12 23c2.97 0..." />
        <path fill="currentColor" d="M5.84 14.09c-.22..." />
        <path fill="currentColor" d="M12 5.38c1.62..." />
      </svg>
      Sign in with Google
    </Button>
  );
};

export default SocialLogin;