import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeContext } from "@/context/ThemeContext";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/services/favoriteApi";

export default function FavoritesScreen() {
  const { theme } = useThemeContext();

  const { data, isLoading, isFetching, refetch } = useGetFavoritesQuery();

  const [removeFavorite] = useRemoveFavoriteMutation();

  const favorites = data?.data || [];

  const handleRemoveFavorite = (mealId: string) => {
    Alert.alert(
      "Remove Favorite",
      "Are you sure you want to remove this recipe from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await removeFavorite(mealId).unwrap();

              Alert.alert("Success", "Recipe removed successfully.");
            } catch (error) {
              Alert.alert("Error", "Unable to remove recipe.");
            }
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.centerContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={[
            styles.loadingText,
            {
              color: theme.text,
            },
          ]}
        >
          Loading Favorites...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item._id}
      refreshing={isFetching}
      onRefresh={refetch}
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      contentContainerStyle={[
        styles.content,
        favorites.length === 0 && {
          flex: 1,
        },
      ]}
      ListEmptyComponent={() => (
        <View style={styles.centerContainer}>
          <Ionicons name="heart-outline" size={90} color={theme.subText} />

          <Text
            style={[
              styles.emptyTitle,
              {
                color: theme.text,
              },
            ]}
          >
            No Saved Recipes
          </Text>

          <Text
            style={[
              styles.emptySubtitle,
              {
                color: theme.subText,
              },
            ]}
          >
            Save recipes by tapping the heart icon.
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Image
            source={{
              uri: item.mealImage,
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text
              numberOfLines={2}
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
            >
              {item.mealName}
            </Text>

            <Text
              style={[
                styles.category,
                {
                  color: theme.subText,
                },
              ]}
            >
              {item.category}
            </Text>

            <View style={styles.bottomRow}>
              <View style={styles.savedRow}>
                <Ionicons name="heart" size={18} color="#ff3b30" />

                <Text
                  style={[
                    styles.savedText,
                    {
                      color: theme.primary,
                    },
                  ]}
                >
                  Saved
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveFavorite(item.mealId)}
              >
                <Ionicons name="trash-outline" size={24} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "600",
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
  },

  card: {
    flexDirection: "row",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
  },

  image: {
    width: 120,
    height: 120,
  },

  info: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
  },

  category: {
    marginTop: 8,
    fontSize: 14,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  savedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  savedText: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});
