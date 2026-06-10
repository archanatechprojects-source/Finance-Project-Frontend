"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  useEffect(() => {
    const user =
      localStorage.getItem(
        "user"
      );

    if (!user) {
      router.push("/");
      return;
    }

    const parsed =
      JSON.parse(user);

    if (
      parsed.role !==
        "ADMIN" &&
      parsed.role !==
        "SUPER_ADMIN"
    ) {
      router.push("/");
    }
  }, [router]);

  return children;
} 