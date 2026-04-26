import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack />;
}