import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';

import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LandingScreen() {
  const router = useRouter();

  const floatAnim1 =
    useRef(new Animated.Value(0))
      .current;

  const floatAnim2 =
    useRef(new Animated.Value(0))
      .current;

  const fadeAnim =
    useRef(new Animated.Value(0))
      .current;

  const fullText =
    'Smart Meals. Better Health. Every Day.';

  const [typedText, setTypedText] =
    useState('');

  useEffect(() => {
    let index = 0;

    const typingInterval =
      setInterval(() => {
        if (
          index <=
          fullText.length
        ) {
          setTypedText(
            fullText.slice(
              0,
              index
            )
          );
          index++;
        } else {
          clearInterval(
            typingInterval
          );
        }
      }, 60);

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          floatAnim1,
          {
            toValue: -20,
            duration: 2500,
            useNativeDriver:
              false,
          }
        ),
        Animated.timing(
          floatAnim1,
          {
            toValue: 0,
            duration: 2500,
            useNativeDriver:
              false,
          }
        ),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          floatAnim2,
          {
            toValue: 20,
            duration: 3000,
            useNativeDriver:
              false,
          }
        ),
        Animated.timing(
          floatAnim2,
          {
            toValue: 0,
            duration: 3000,
            useNativeDriver:
              false,
          }
        ),
      ])
    ).start();

    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1200,
        useNativeDriver:
          false,
      }
    ).start();

    return () =>
      clearInterval(
        typingInterval
      );
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        }}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.15)',
            'rgba(0,0,0,0.75)',
          ]}
          style={styles.overlay}
        >
          <View
            style={
              styles.particleOne
            }
          />
          <View
            style={
              styles.particleTwo
            }
          />
          <View
            style={
              styles.particleThree
            }
          />
          <View
            style={
              styles.particleFour
            }
          />

          <Animated.View
            style={[
              styles.floatingOne,
              {
                transform: [
                  {
                    translateY:
                      floatAnim1,
                  },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.floatingTwo,
              {
                transform: [
                  {
                    translateY:
                      floatAnim2,
                  },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.centerSection,
              {
                opacity:
                  fadeAnim,
              },
            ]}
          >
            <View
              style={
                styles.logoCircle
              }
            >
              <MaterialCommunityIcons
                name="food-apple"
                size={44}
                color="#FFFFFF"
              />
            </View>

            <Text
              style={
                styles.appName
              }
            >
              NutriChef
            </Text>

            <Text
              style={
                styles.tagline
              }
            >
              {typedText}
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.bottomSection,
              {
                opacity:
                  fadeAnim,
              },
            ]}
          >
            <Text
              style={
                styles.title
              }
            >
              Discover Healthy Recipes 🍽️
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Search meals,
              listen to recipes,
              explore videos,
              and cook smarter
              with your personal
              meal guide.
            </Text>

            <TouchableOpacity
              style={
                styles.button
              }
              onPress={() =>
                router.push(
                  '/(auth)/login'
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#000',
    },

    image: {
      flex: 1,
    },

    overlay: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent:
        'space-between',
    },

    particleOne: {
      position: 'absolute',
      top: 80,
      left: 40,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor:
        'rgba(255,255,255,0.45)',
      zIndex: 10,
      elevation: 10,
    },

    particleTwo: {
      position: 'absolute',
      top: 180,
      right: 60,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor:
        'rgba(34,197,94,0.55)',
      zIndex: 10,
      elevation: 10,
    },

    particleThree: {
      position: 'absolute',
      bottom: 220,
      left: 70,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor:
        'rgba(255,255,255,0.35)',
      zIndex: 10,
      elevation: 10,
    },

    particleFour: {
      position: 'absolute',
      top: 140,
      left: -20,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor:
        'rgba(34,197,94,0.08)',
      zIndex: 1,
    },

    floatingOne: {
      position: 'absolute',
      top: 120,
      right: 40,
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor:
        'rgba(255,255,255,0.08)',
    },

    floatingTwo: {
      position: 'absolute',
      top: 260,
      left: 30,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor:
        'rgba(255,255,255,0.08)',
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 5,
    },

    centerSection: {
      flex: 1,
      justifyContent:
        'center',
      alignItems: 'center',
    },

    logoCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor:
        'rgba(255,255,255,0.15)',
      justifyContent:
        'center',
      alignItems:
        'center',
      borderWidth: 1,
      borderColor:
        'rgba(255,255,255,0.25)',
    },

    appName: {
      marginTop: 20,
      fontSize: 36,
      fontWeight: '800',
      color: '#FFFFFF',
      letterSpacing: 1,
    },

    tagline: {
      marginTop: 10,
      fontSize: 15,
      color: '#E5E7EB',
      textAlign: 'center',
      minHeight: 24,
    },

    bottomSection: {
      marginBottom: 60,
    },

    title: {
      fontSize: 30,
      fontWeight: '800',
      color: '#FFFFFF',
      lineHeight: 40,
    },

    subtitle: {
      marginTop: 14,
      fontSize: 16,
      color: '#E5E7EB',
      lineHeight: 24,
    },

    button: {
      marginTop: 28,
      backgroundColor:
        '#22C55E',
      paddingVertical: 16,
      borderRadius: 18,
      alignItems:
        'center',
      elevation: 4,
    },

    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
  });