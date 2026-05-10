import React from 'react';
import { Redirect } from 'expo-router';

import LandingScreen from '@/screens/landingpage';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const {
    token,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (token) {
    return (
      <Redirect
        href="/(protected)/home"
      />
    );
  }

  return <LandingScreen />;
}