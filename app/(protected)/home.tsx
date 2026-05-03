import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";

export default function HomeScreen() {
  const { theme } =
    useThemeContext();

  const { logout } =
    useAuth();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.bg,
        },
      ]}
    >
      <View style={styles.top}>
        <ThemeToggle />
      </View>

      <Text
        style={[
          styles.title,
          {
            color:
              theme.text,
          },
        ]}
      >
        Welcome Home 🏠
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
        onPress={logout}
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      padding: 24,
    },

    top: {
      position:
        "absolute",
      top: 60,
      right: 20,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 30,
    },

    button: {
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 16,
    },

    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
  });