import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeContext } from "@/context/ThemeContext";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import RecipeDetailsScreen from "../RecipeDetails";

export default function SearchScreen() {
  const { theme } = useThemeContext();

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {!selectedRecipe ? (
          <>
            <SearchInput
              setSearchResults={setSearchResults}
              setLoading={setLoading}
            />

            <SearchResults
              results={searchResults}
              loading={loading}
              setSelectedRecipe={setSelectedRecipe}
            />
          </>
        ) : (
          <RecipeDetailsScreen
            meal={selectedRecipe}
            onBack={() => {
              setSelectedRecipe(null);
              setSearchResults([]);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
