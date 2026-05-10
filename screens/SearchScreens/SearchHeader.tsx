import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';

export default function SearchHeader() {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Find Your Recipe 🔍
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.subText,
          },
        ]}
      >
        Search by recipe name or voice
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
});