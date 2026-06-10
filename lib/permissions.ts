export const hasPermission = (
  permission: string
) => {
  if (typeof window === "undefined")
    return false;

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  if (
    user.role === "SUPER_ADMIN"
  ) {
    return true;
  }

  return (
    user.permissions?.includes(
      permission
    ) || false
  );
};