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

import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useLoginMutation } from "@/store/services/authApi";
import { saveItem } from "@/utils/secureStorage";

export default function LoginScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  const { theme } = useThemeContext();

  const [login, { isLoading }] =
    useLoginMutation();

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
    const res = await login({
      email: form?.email,
      password: form?.password,
    }).unwrap();

    await saveItem(
      "accessToken",
      res?.accessToken
    );

    await saveItem(
      "refreshToken",
      res?.refreshToken
    );

    setToken(res?.accessToken);

    Toast.show({
      type: "success",
      text1: res?.data?.message || "Login Successful 🎉",
    });

    router.replace(
      "/(protected)/home"
    );
  } catch (err: any) {
    Toast.show({
      type: "error",
      text1:
        err?.data?.message ||
        "Login failed",
    });
  }
};

  return (
    <KeyboardAwareScrollView
      style={[
        styles.wrapper,
        {
          backgroundColor:
            theme.bg,
        },
      ]}
      contentContainerStyle={
        styles.container
      }
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={
        Platform.OS === "ios"
          ? 20
          : 80
      }
    >
      <View style={styles.top}>
        <ThemeToggle />
      </View>

      {/* Title */}
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Welcome Back 👋
      </Text>

      <View
        style={[
          styles.inputBox,
          {
            backgroundColor:
              theme.card,
          },
        ]}
      >
        <TextInput
          placeholder="EMAIL"
          placeholderTextColor={
            theme.subText
          }
          value={form.email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(value) =>
            setForm({
              ...form,
              email: value,
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

      <View
        style={[
          styles.inputBox,
          {
            backgroundColor:
              theme.card,
          },
        ]}
      >
        <TextInput
          placeholder="PASSWORD"
          placeholderTextColor={
            theme.subText
          }
          secureTextEntry
          value={form.password}
          onChangeText={(value) =>
            setForm({
              ...form,
              password: value,
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

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator
            color="#fff"
          />
        ) : (
          <Text
            style={styles.buttonText}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(
            "/(auth)/signup"
          )
        }
      >
        <Text
          style={[
            styles.link,
            {
              color:
                theme.subText,
            },
          ]}
        >
          Don’t have an account?{" "}
          <Text
            style={{
              color:
                theme.primary,
            }}
          >
            Signup
          </Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },

    container: {
      flexGrow: 1,
      justifyContent:
        "center",
      padding: 24,
    },

    top: {
      position:
        "absolute",
      top: 60,
      right: 20,
      zIndex: 10,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 20,
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
      alignItems:
        "center",
    },

    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },

    link: {
      marginTop: 20,
      textAlign:
        "center",
    },
  });