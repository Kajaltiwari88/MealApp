import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!form?.email?.trim()) {
      Toast.show({
        type: "error",
        text1: "Email is required",
      });
      return;
    }

    if (!form?.password?.trim()) {
      Toast.show({
        type: "error",
        text1: "Password is required",
      });
      return;
    }

    try {
      setIsLoading(true);

      await login(form.email, form.password);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.message || "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.85)"]}
        style={styles.overlay}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === "ios" ? 20 : 80}
        >
          <View style={styles.card}>
            <Text style={styles.logo}>NutriChef 🍽️</Text>

            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>
              Login and continue your healthy journey
            </Text>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={form.email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(value) =>
                  setForm({
                    ...form,
                    email: value,
                  })
                }
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={form.password}
                onChangeText={(value) =>
                  setForm({
                    ...form,
                    password: value,
                  })
                }
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.link}>
                Don't have an account?{" "}
                <Text style={styles.linkBold}>Signup</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 8,
    marginBottom: 24,
  },

  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    height: 56,
    justifyContent: "center",

    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  input: {
    fontSize: 16,
    color: "#111",
  },

  button: {
    marginTop: 28,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  link: {
    marginTop: 22,
    textAlign: "center",
    color: "#ddd",
  },

  linkBold: {
    color: "#22C55E",
    fontWeight: "700",
  },
});
