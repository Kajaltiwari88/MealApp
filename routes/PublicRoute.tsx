import { useAuth } from "@/context/AuthContext";
import { Redirect, usePathname } from "expo-router";

export default function PublicRoute({
  children,
}: any) {
  const {
    token,
    pendingEmail,
  } = useAuth();

  const pathname = usePathname();

  if (token) {
    return (
      <Redirect
        href="/(protected)/home"
      />
    );
  }

  // ONLY protect verify-otp route
  if (
    pathname.includes(
      "verify-otp"
    ) &&
    !pendingEmail
  ) {
    return (
      <Redirect
        href="/(auth)/login"
      />
    );
  }

  return children;
}