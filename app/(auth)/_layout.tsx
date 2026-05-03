import { Stack } from "expo-router";
import PublicRoute from "@/routes/PublicRoute";

export default function AuthLayout() {
  return (
    <PublicRoute>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PublicRoute>
  );
}