import { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { instance, setAuthToken } from "../api/api";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const res = await instance.post("/auth/login", { email, password });

      const { accessToken, refreshToken } = res.data;

      await SecureStore.setItemAsync("refreshToken", refreshToken);

      setToken(accessToken);
      setAuthToken(accessToken);

      Toast.show({
        type: "success",
        text1: "Login Successful 🎉"
      });

      router.replace("/(protected)/home");

    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.msg || "Login failed"
      });
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const res = await instance.post("/auth/signup", {
        fullName,
        email,
        password
      });

      const { accessToken, refreshToken } = res.data;

      await SecureStore.setItemAsync("refreshToken", refreshToken);

      setToken(accessToken);
      setAuthToken(accessToken);

      Toast.show({
        type: "success",
        text1: "Signup Successful 🎉"
      });

      router.replace("/(protected)/home");

    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.msg || "Signup failed"
      });
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("refreshToken");
    setToken(null);
    setAuthToken(null);

    Toast.show({
      type: "success",
      text1: "Logged out"
    });

    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);