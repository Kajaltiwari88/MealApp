import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import Toast from "react-native-toast-message";

import { instance, setAuthToken } from "@/api/api";

import { getItem, removeItem, saveItem } from "@/utils/secureStorage";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedToken = await getItem("accessToken");

      const savedUser = await getItem("user");

      if (savedToken) {
        setToken(savedToken);
        setAuthToken(savedToken);
      }

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await instance.post("/auth/login", {
        email,
        password,
      });

      const accessToken = res?.data?.accessToken || "";

      const refreshToken = res?.data?.refreshToken || "";

      const userData = res?.data?.user || {};

      await saveItem("accessToken", accessToken);
      await saveItem("refreshToken", refreshToken);
      await saveItem("user", JSON.stringify(userData));

      setToken(accessToken);
      setUser(userData);
      setAuthToken(accessToken);

      Toast.show({
        type: "success",
        text1: "Login Successful 🎉",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1:
          error?.message || error?.response?.data?.message || "Login failed",
      });
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const res = await instance.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      Toast.show({
        type: "success",
        text1: res?.data?.message || "OTP sent to your email 📩",
      });

      setPendingEmail(email);

      router.push("/(auth)/verify-otp");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Signup failed",
      });
    }
  };

  const loginWithToken = async (
    accessToken: string,
    refreshToken: string,
    userData: any,
  ) => {
    await saveItem("accessToken", accessToken);

    await saveItem("refreshToken", refreshToken);

    await saveItem("user", JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
    setAuthToken(accessToken);
  };
  const logout = async () => {
    await removeItem("accessToken");
    await removeItem("refreshToken");
    await removeItem("user");

    setToken(null);
    setUser(null);
    setAuthToken(null);

    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        signup,
        pendingEmail,
        setPendingEmail,
        loginWithToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
