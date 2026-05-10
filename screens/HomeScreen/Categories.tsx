import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';

type Props = {
  selectedCategory: string;
  setSelectedCategory: (
    value: string
  ) => void;
};

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
];

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      {categories.map((item) => {
        const isActive =
          selectedCategory === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setSelectedCategory(item)
            }
            style={[
              styles.button,
              {
                backgroundColor: isActive
                  ? theme.primary
                  : theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: isActive
                  ? '#fff'
                  : theme.text,
                fontWeight: '600',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
});