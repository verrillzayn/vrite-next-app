"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/spinner";

export default function AuthLayout({ children }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" /> Please Wait...
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <>
      <>{children}</>
    </>
  );
}
