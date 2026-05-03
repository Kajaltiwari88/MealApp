import {
  Stack,
} from "expo-router";

import {
  Provider,
} from "react-redux";

import Toast from "react-native-toast-message";

import {
  store,
} from "@/store/store";

import {
  ThemeProvider,
} from "@/context/ThemeContext";

import CustomToast from "@/components/CustomToast";
import {
  AuthProvider,
} from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <Provider
      store={store}
    >
      <ThemeProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown:
                false,
            }}
          />

          <Toast config={{
            success: (props) => (
              <CustomToast
                {...props}
                type="success"
              />
            ),
            error: (props) => (
              <CustomToast
                {...props}
                type="error"
              />
            ),
          }} />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}