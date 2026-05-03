import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupScreen() {
  const { theme } = useThemeContext();
  const { signup } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    if (!form.name.trim()) {
      Toast.show({
        type: "error",
        text1: "Full name is required",
      });
      return;
    }

    if (!form.email.trim()) {
      Toast.show({
        type: "error",
        text1: "Email is required",
      });
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      Toast.show({
        type: "error",
        text1: "Enter valid email",
      });
      return;
    }

    if (!form.password.trim()) {
      Toast.show({
        type: "error",
        text1: "Password is required",
      });
      return;
    }

    if (form.password.length < 6) {
      Toast.show({
        type: "error",
        text1:
          "Password must be at least 6 characters",
      });
      return;
    }

    try {
      setLoading(true);

      await signup(
        form.name,
        form.email,
        form.password
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.bg,
        },
      ]}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={
        Platform.OS === "ios" ? 20 : 80
      }
    >
      <View style={styles.top}>
        <ThemeToggle />
      </View>

      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Create Account 🚀
      </Text>

      {(Object.keys(form) as (keyof SignupForm)[]).map(
        (field) => (
          <View
            key={field}
            style={[
              styles.inputBox,
              {
                backgroundColor: theme.card,
              },
            ]}
          >
            <TextInput
              placeholder={field.toUpperCase()}
              placeholderTextColor={
                theme.subText
              }
              secureTextEntry={
                field === "password"
              }
              autoCapitalize={
                field === "email"
                  ? "none"
                  : "sentences"
              }
              keyboardType={
                field === "email"
                  ? "email-address"
                  : "default"
              }
              value={form[field]}
              onChangeText={(val) =>
                setForm({
                  ...form,
                  [field]: val,
                })
              }
              style={[
                styles.input,
                {
                  color: theme.text,
                },
              ]}
            />
          </View>
        )
      )}

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push("/(auth)/login")
        }
      >
        <Text
          style={[
            styles.link,
            {
              color: theme.subText,
            },
          ]}
        >
          Already have an account?{" "}
          <Text
            style={{
              color: theme.primary,
            }}
          >
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 170,
    paddingBottom: 20,
  },

  top: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
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