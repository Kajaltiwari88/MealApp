import { useThemeContext } from "@/context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

export default function ThemeToggle() {
  const { toggleTheme, mode, theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
    >
      <Text style={{ color: theme.text }}>
        {mode === "light" ? "🌙" : "☀️"}
      </Text>
    </TouchableOpacity>
  );
}