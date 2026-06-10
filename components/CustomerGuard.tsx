"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user =
      localStorage.getItem("user");

    if (!user) {
      router.push("/");
      return;
    }

    const parsed =
      JSON.parse(user);

    if (
      parsed.role !== "CUSTOMER"
    ) {
      router.push("/");
    }
  }, [router]);

  return children;
}