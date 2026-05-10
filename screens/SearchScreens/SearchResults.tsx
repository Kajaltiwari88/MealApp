import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useThemeContext } from '@/context/ThemeContext';
import ShimmerLoader from '@/components/ReusableShimmer';

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
};

type Props = {
  results: MealType[];
  loading?: boolean;
  setSelectedRecipe: (
    item: MealType
  ) => void;
};

export default function SearchResults({
  results,
  loading = false,
  setSelectedRecipe,
}: Props) {
  const { theme } = useThemeContext();

  if (loading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            style={styles.shimmerCard}
          >
            <ShimmerLoader
              height={80}
              width={80}
              borderRadius={14}
            />

            <View style={{ flex: 1 }}>
              <ShimmerLoader
                height={18}
                width="70%"
                style={{
                  marginBottom: 10,
                }}
              />

              <ShimmerLoader
                height={14}
                width="50%"
                style={{
                  marginBottom: 8,
                }}
              />

              <ShimmerLoader
                height={14}
                width="40%"
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (!results?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.heading,
          {
            color: theme.text,
          },
        ]}
      >
        Search Results
      </Text>

      {results.map((item) => (
        <TouchableOpacity
          key={item.idMeal}
          onPress={() =>
            setSelectedRecipe(item)
          }
          style={[
            styles.card,
            {
              backgroundColor:
                theme.card,
              borderColor:
                theme.border,
            },
          ]}
        >
          <Image
            source={{
              uri: item.strMealThumb,
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
            >
              {item.strMeal}
            </Text>

            <Text
              style={{
                color:
                  theme.subText,
              }}
            >
              {item.strCategory}
            </Text>

            <Text
              style={{
                color:
                  theme.subText,
              }}
            >
              {item.strArea}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  shimmerCard: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
    alignItems: 'center',
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },

  info: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
});