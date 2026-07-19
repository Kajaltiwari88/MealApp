import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/context/ThemeContext";

const tips = [
  "Drink water before meals 🍋",
  "Avoid overcooking vegetables 🥦",
  "Use olive oil for healthier meals 🫒",
  "Fresh herbs improve flavor 🌿",
  "Eat protein-rich breakfast 🍳",
];

export default function TipCard() {
  const { theme } = useThemeContext();

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Daily Health Tip
      </Text>

      <Text
        style={[
          styles.tip,
          {
            color: theme.subText,
          },
        ]}
      >
        {randomTip}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  tip: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 24,
  },
});
