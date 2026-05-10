import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';

type Props = {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  style?: any;
};

export default function ShimmerLoader({
  height = 20,
  width = '100%',
  borderRadius = 10,
  style,
}: Props) {
  const shimmerAnim =
    useRef(new Animated.Value(0))
      .current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        shimmerAnim,
        {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  const translateX =
    shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 300],
    });

  return (
    <View
      style={[
        styles.container,
        {
          height,
          width,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },

  shimmer: {
    width: '40%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
  },
});