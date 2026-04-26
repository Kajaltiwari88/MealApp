
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "../api/interceptor";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast/>
      </AuthProvider>
    </ThemeProvider>
  );
}