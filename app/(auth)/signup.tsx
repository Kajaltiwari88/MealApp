import ThemeToggle from "@/components/ThemeToggle";
import { useThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type SignupForm = {
  name: string;
  email: string;
  // phone: string;
  password: string;
};

export default function SignupScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    // phone: "",
    password: "",
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.top}>
        <ThemeToggle />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        Create Account 🚀
      </Text>

      {(Object.keys(form) as (keyof SignupForm)[]).map((field) => (
        <View
          key={field}
          style={[styles.inputBox, { backgroundColor: theme.card }]}
        >
          <TextInput
            placeholder={field.toUpperCase()}
            placeholderTextColor={theme.subText}
            secureTextEntry={field === "password"}
            onChangeText={(val) =>
              setForm({ ...form, [field]: val })
            }
            style={[styles.input, { color: theme.text }]}
          />
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={[styles.link, { color: theme.subText }]}>
          Already have an account?{" "}
          <Text style={{ color: theme.primary }}>Login</Text>
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
    marginBottom: 10,
  },
  inputBox: {
    marginTop: 16,
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