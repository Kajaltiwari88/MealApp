import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function PrivateRoute({
  children,
}: any) {
  const { token } =
    useAuth();

  if (!token) {
    return (
      <Redirect
        href="/(auth)/login"
      />
    );
  }

  return children;
}