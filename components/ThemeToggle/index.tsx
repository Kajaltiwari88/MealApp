import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme, mode, theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        // {
        //   backgroundColor: theme.primary,
        // },
      ]}
    >
      <Text
        style={[
          styles.icon,
          {
            color: theme.background,
          },
        ]}
      >
        {mode === 'light' ? '🌙' : '☀️'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 16,
    alignSelf: 'flex-end',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 20,
  },
});