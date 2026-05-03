import { instance } from "@/api/api";
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

export default function VerifyOtpScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();
  const { pendingEmail } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Toast.show({
        type: "error",
        text1: "OTP is required",
      });
      return;
    }

    if (otp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "OTP must be 6 digits",
      });
      return;
    }

    try {
      setLoading(true);

      await instance.post(
        "/auth/verify-otp",
        {
          email: pendingEmail,
          otp,
        }
      );

      Toast.show({
        type: "success",
        text1:
          "Email verified successfully 🎉",
      });

      router.replace("/(auth)/login");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1:
          err?.response?.data?.message ||
          "OTP verification failed",
      });
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
        Verify OTP 🔐
      </Text>

      <View
        style={[
          styles.inputBox,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <TextInput
          placeholder="Enter OTP"
          placeholderTextColor={
            theme.subText
          }
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
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
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Verify OTP
          </Text>
        )}
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
    justifyContent: "center",
    padding: 24,
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
    marginBottom: 20,
  },

  inputBox: {
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
});