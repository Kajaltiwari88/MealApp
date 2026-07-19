import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Feather,
  Ionicons,
} from '@expo/vector-icons';

import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useThemeContext } from '@/context/ThemeContext';

type UserType = {
  fullName?: string;
  name?: string;
};

export default function Header() {
  const { theme } = useThemeContext();

  const {
    user,
    logout,
  }: {
    user: UserType | null;
    logout: () => void;
  } = useAuth();

  const userName: string =
    user?.fullName ||
    user?.name ||
    'User';

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <View style={styles.topRow}>
        <TouchableOpacity>
          <Feather
            name="menu"
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Hello, {userName} 👋
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.subText,
              },
            ]}
          >
            What shall we cook today?
          </Text>
        </View>

        <View style={styles.iconsWrapper}>
          <ThemeToggle />

          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            style={[
              styles.logoutButton,
              {
                backgroundColor:
                  theme.primary,
              },
            ]}
          >
            <Feather
              name="log-out"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },

  iconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  logoutButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});