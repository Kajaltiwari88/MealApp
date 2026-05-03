import { useRouter } from "expo-router";
import {
  createContext,
  useContext,
  useState,
} from "react";
import Toast from "react-native-toast-message";

import {
  instance,
  setAuthToken,
} from "@/api/api";
import { removeItem, saveItem } from "@/utils/secureStorage";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {
  const [token, setToken] =
    useState<string | null>(null);

  const [pendingEmail, setPendingEmail] =
    useState<string>("");

  const router = useRouter();

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const res = await instance.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const accessToken =
        res?.data?.accessToken;

      const refreshToken =
        res?.data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error(
          "Tokens missing from response"
        );
      }

      await saveItem(
        "refreshToken",
        refreshToken
      );

      setToken(accessToken);
      setAuthToken(accessToken);

      Toast.show({
        type: "success",
        text1:res?.data?.message || "Login Successful 🎉",
      });

      router.replace(
        "/(protected)/home"
      );
    } catch (err: any) {
      console.log(
        "LOGIN ERROR:",
        err
      );

      Toast.show({
        type: "error",
        text1:
          err?.response?.data?.message ||
          err?.message ||
          "Login failed",
      });
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await instance.post(
        "/auth/signup",
        {
          fullName,
          email,
          password,
        }
      );

      Toast.show({
        type: "success",
        text1:
          res?.data?.message ||
          "OTP sent to your email 📩",
      });

      setPendingEmail(email);

      router.push(
        "/(auth)/verify-otp"
      );
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1:
          err?.response?.data?.message ||
          "Signup failed",
      });
    }
  };

  const logout = async () => {
    await removeItem(
      "refreshToken"
    );

    setToken(null);
    setAuthToken(null);
    setPendingEmail("");

    Toast.show({
      type: "success",
      text1: "Logged out",
    });

    router.replace(
      "/(auth)/login"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        signup,
        logout,
        pendingEmail,
        setPendingEmail,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);