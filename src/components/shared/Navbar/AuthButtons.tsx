// components/shared/Navbar/AuthButtons.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  onLinkClick?: () => void;
  orientation?: "horizontal" | "vertical";
}

export default function AuthButtons({
  onLinkClick,
  orientation = "horizontal",
}: Props) {
  return (
    <div
      className={`flex gap-3 ${
        orientation === "vertical" ? "flex-col" : "items-center"
      }`}
    >
      <Button variant="outline" size="sm" asChild>
        <Link href="/login" onClick={onLinkClick}>
          Login
        </Link>
      </Button>

      <Button size="sm" asChild>
        <Link href="/register" onClick={onLinkClick}>
          Sign Up
        </Link>
      </Button>
    </div>
  );
}