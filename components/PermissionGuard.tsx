"use client";

import {
  useRouter
} from "next/navigation";

import {
  useEffect
} from "react";

import {
  hasPermission
} from "@/lib/permissions";

export default function PermissionGuard({
  permission,
  children,
}: any) {

  const router =
    useRouter();

  useEffect(() => {

    if (
      !hasPermission(
        permission
      )
    ) {
      router.push(
        "/admin"
      );
    }

  }, []);

  return children;
} 