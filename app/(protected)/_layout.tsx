import React from 'react';
import { Tabs } from 'expo-router';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Header from '@/components/Header';
import { useThemeContext } from '@/context/ThemeContext';


export default function ProtectedLayout() {
    const { theme } = useThemeContext();
  
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor:theme.background ,
          borderTopWidth: 0,
          elevation: 8,
        },

        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

\      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="search"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Saved',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="heart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}