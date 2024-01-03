"use client";

import { useUser } from "@clerk/clerk-react";

export default function Username() {
  const { user } = useUser();

  return <span>{user?.firstName}</span>;
}

export const useAvatar = () => {
  const { user } = useUser();
  return { user };
};
