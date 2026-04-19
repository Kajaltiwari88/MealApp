import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";


export default function LoginScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.top}>
        <ThemeToggle />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        Welcome Back 👋
      </Text>

      <Text style={[styles.subtitle, { color: theme.subText }]}>
        Login to continue
      </Text>

      <View style={[styles.inputBox, { backgroundColor: theme.card }]}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.subText}
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { color: theme.text }]}
        />
      </View>

      <View style={[styles.inputBox, { backgroundColor: theme.card }]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.subText}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { color: theme.text }]}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        // onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={[styles.link, { color: theme.subText }]}>
          Don't have an account?{" "}
          <Text style={{ color: theme.primary }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  top: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
  },
  inputBox: {
    marginTop: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
  },
});