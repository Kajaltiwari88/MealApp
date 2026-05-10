import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

export default function PrivateRoute({
  children,
}: any) {
  const {
    token,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!token) {
    return (
      <Redirect
        href="/(auth)/login"
      />
    );
  }

  return children;
}