import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeContext } from '@/context/ThemeContext';
import Categories from './Categories';
import FeaturedRecipes from './FeaturedRecipe';
import TipCard from './TipCard';
import RecipeDetailsScreen from '../RecipeDetails';

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any;
};

export default function HomeScreen() {
  const { theme } = useThemeContext();

  const [selectedCategory, setSelectedCategory] =
    useState<string>('Breakfast');

  const [selectedRecipe, setSelectedRecipe] =
    useState<MealType | null>(null);

  if (selectedRecipe) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              theme.background,
          },
        ]}
      >
        <RecipeDetailsScreen
          meal={selectedRecipe}
          onBack={() =>
            setSelectedRecipe(null)
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >

        <Categories
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
        />

        <FeaturedRecipes
          selectedCategory={
            selectedCategory
          }

          /*
            IMPORTANT FIX
          */
          setSelectedRecipe={
            setSelectedRecipe
          }
        />

        <TipCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  content: {
    paddingBottom: 100,
  },
});