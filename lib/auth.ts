export function getUser() {
  if (
    typeof window === "undefined"
  )
    return null;

  const user =
    localStorage.getItem(
      "user"
    );

  if (!user) return null;

  return JSON.parse(user);
}

export function hasPermission(
  permission: string
) {
  const user = getUser();

  if (!user) return false;

  if (
    user.role ===
    "SUPER_ADMIN"
  )
    return true;

  return (
    user.permissions?.includes(
      permission
    ) || false
  );
}