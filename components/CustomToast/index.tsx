import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function CustomToast({
  text1,
  type,
}: any) {
  return (
    <View
      style={[
        styles.container,
        type === "error"
          ? styles.error
          : styles.success,
      ]}
    >
      <Text style={styles.text}>
        {text1}
      </Text>

      <TouchableOpacity
        onPress={() => Toast.hide()}
      >
        <Ionicons
          name="close"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  success: {
    backgroundColor: "#16a34a",
  },

  error: {
    backgroundColor: "#dc2626",
  },

  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
});