import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';

import { instance } from '@/api/api';
import { useAuth } from '@/context/AuthContext';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { pendingEmail } = useAuth();

  const [otp, setOtp] =
    useState<string>('');

  const [loading, setLoading] =
    useState<boolean>(false);

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Toast.show({
        type: 'error',
        text1: 'OTP is required',
      });
      return;
    }

    if (otp.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'OTP must be 6 digits',
      });
      return;
    }

    try {
      setLoading(true);

      await instance.post(
        '/auth/verify-otp',
        {
          email: pendingEmail,
          otp,
        }
      );

      Toast.show({
        type: 'success',
        text1:
          'Email verified successfully 🎉',
      });

      router.replace('/(auth)/login');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ||
          'OTP verification failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.85)',
        ]}
        style={styles.overlay}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={
            styles.container
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={
            Platform.OS === 'ios'
              ? 20
              : 80
          }
        >
          <View style={styles.card}>
            <Text style={styles.logo}>
              NutriChef 🍽️
            </Text>

            <Text style={styles.title}>
              Verify OTP 🔐
            </Text>

            <Text style={styles.subtitle}>
              Enter the 6-digit OTP sent
              to your email
            </Text>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor="#999"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  Verify OTP
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.replace('/(auth)/login')
              }
            >
              <Text style={styles.link}>
                Back to{' '}
                <Text style={styles.linkBold}>
                  Login
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor:
      'rgba(255,255,255,0.12)',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.18)',
  },

  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },

  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  input: {
    fontSize: 16,
    color: '#111',
  },

  button: {
    marginTop: 28,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  link: {
    marginTop: 22,
    textAlign: 'center',
    color: '#ddd',
  },

  linkBold: {
    color: '#22C55E',
    fontWeight: '700',
  },
});

