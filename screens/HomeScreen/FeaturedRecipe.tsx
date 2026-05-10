import React, {
    useEffect,
    useState,
} from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import axios from 'axios';

import { useThemeContext } from '@/context/ThemeContext';
import ShimmerLoader from '@/components/ReusableShimmer';

type Props = {
  selectedCategory: string;
  setSelectedRecipe: (meal: any) => void;
};

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const BASE_URL =
  process.env.EXPO_PUBLIC_BASE_URL;

const categoryMap: Record<
  string,
  string
> = {
  Breakfast: 'Breakfast',
  Lunch: 'Chicken',
  Dinner: 'Beef',
  Snack: 'Dessert',
};

export default function FeaturedRecipes({
  selectedCategory,
  setSelectedRecipe,
}: Props) {
  const { theme } = useThemeContext();

  const [recipes, setRecipes] =
    useState<MealType[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [loadMoreLoading, setLoadMoreLoading] =
    useState<boolean>(false);

  const [visibleCount, setVisibleCount] =
    useState<number>(4);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setVisibleCount(4);

      const apiCategory =
        categoryMap[
          selectedCategory
        ] || 'Breakfast';

      const url =
        selectedCategory ===
        'Popular'
          ? `${BASE_URL}/search.php?s=chicken`
          : `${BASE_URL}/filter.php?c=${apiCategory}`;

      const res =
        await axios.get(url);

      setRecipes(
        res?.data?.meals || []
      );
    } catch (error) {
      console.log(
        'FETCH RECIPES ERROR:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRecipe =
    async (id: string) => {
      try {
        const res =
          await axios.get(
            `${BASE_URL}/lookup.php?i=${id}`
          );

        const fullRecipe =
          res?.data?.meals?.[0];

        if (fullRecipe) {
          setSelectedRecipe(
            fullRecipe
          );
        }
      } catch (error) {
        console.log(
          'FETCH RECIPE DETAILS ERROR:',
          error
        );
      }
    };

  const handleLoadMore = () => {
    setLoadMoreLoading(true);

    setTimeout(() => {
      setVisibleCount(
        (prev) => prev + 4
      );

      setLoadMoreLoading(false);
    }, 1000);
  };

  if (loading) {
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
          {selectedCategory} Recipes
        </Text>

        {[1, 2, 3].map((item) => (
          <View
            key={item}
            style={styles.shimmerCard}
          >
            <ShimmerLoader
              height={180}
              width="100%"
              borderRadius={14}
            />

            <ShimmerLoader
              height={18}
              width="70%"
              style={{
                marginTop: 12,
              }}
            />
          </View>
        ))}
      </View>
    );
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
        {selectedCategory} Recipes
      </Text>

      {recipes
        .slice(0, visibleCount)
        .map((item) => (
          <TouchableOpacity
            key={item.idMeal}
            onPress={() =>
              handleOpenRecipe(
                item.idMeal
              )
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

            <Text
              style={[
                styles.title,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              {item.strMeal}
            </Text>
          </TouchableOpacity>
        ))}

      {loadMoreLoading ? (
        <View
          style={styles.shimmerCard}
        >
          <ShimmerLoader
            height={180}
            width="100%"
            borderRadius={14}
          />

          <ShimmerLoader
            height={18}
            width="70%"
            style={{
              marginTop: 12,
            }}
          />
        </View>
      ) : (
        visibleCount <
          recipes.length && (
          <TouchableOpacity
            onPress={
              handleLoadMore
            }
            style={[
              styles.loadMoreButton,
              {
                backgroundColor:
                  theme.primary,
              },
            ]}
          >
            <Text
              style={
                styles.loadMoreText
              }
            >
              Load More
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },

  shimmerCard: {
    marginBottom: 18,
  },

  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 14,
  },

  title: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },

  loadMoreButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 30,
  },

  loadMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});