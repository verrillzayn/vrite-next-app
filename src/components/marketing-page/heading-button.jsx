"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function HeadingButton() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      {isLoading && (
        <div className="flex w-full justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Vrite
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Vrite free
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </>
  );
}
