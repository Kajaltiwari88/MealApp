import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from "expo-linking";
import * as Speech from "expo-speech";

import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/services/favoriteApi";
import { getItem } from "@/utils/secureStorage";

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  [key: string]: any;
};

type Props = {
  meal: MealType;
  onBack: () => void;
};

export default function RecipeDetailsScreen({ meal, onBack }: Props) {
  const { theme } = useThemeContext();
  const { data } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [saved, setSaved] = useState(false);
  const { token } = useAuth();
  console.log("Context token:", token);

  useEffect(() => {
    const loadToken = async () => {
      console.log("Context token:", token);

      const storageToken = await getItem("accessToken");
      console.log("Storage token:", storageToken);
    };

    loadToken();
  }, [token]);

  useEffect(() => {
    if (data?.data) {
      const exists = data.data.some((item: any) => item.mealId === meal.idMeal);

      setSaved(exists);
    }
  }, [data, meal.idMeal]);

  const toggleFavorite = async () => {
    console.log("Token before API:", await getItem("accessToken"));
    try {
      if (saved) {
        await removeFavorite(meal.idMeal).unwrap();
        setSaved(false);
      } else {
        await addFavorite({
          mealId: meal.idMeal,
          mealName: meal.strMeal,
          mealImage: meal.strMealThumb,
          category: meal.strCategory,
        }).unwrap();

        setSaved(true);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to update favorites.");
    }
  };

  const getIngredientsWithMeasures = () => {
    const items: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        items.push(`${measure || ""} ${ingredient}`.trim());
      }
    }

    return items;
  };

  const handleListen = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    const ingredientsText = getIngredientsWithMeasures().join(", ");

    const fullRecipeText = `
      Recipe Name ${meal?.strMeal}.
      Category ${meal?.strCategory}.
      Cuisine ${meal?.strArea}.
      Ingredients ${ingredientsText}.
      Instructions ${meal?.strInstructions}
    `;

    setIsSpeaking(true);

    Speech.speak(fullRecipeText, {
      language: "en",
      pitch: 1,
      rate: 0.9,
      onDone: () => setIsSpeaking(false),
    });
  };

  const handleOpenVideo = async () => {
    if (!meal?.strYoutube) return;

    try {
      await Linking.openURL(meal?.strYoutube);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    Speech.stop();
    setIsSpeaking(false);
    onBack();
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text
            style={[
              styles.backText,
              {
                color: theme.primary,
              },
            ]}
          >
            ← Back to Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={30}
            color={saved ? "#ff3b30" : theme.text}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: meal?.strMealThumb,
        }}
        style={styles.image}
      />

      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        {meal?.strMeal}
      </Text>

      <Text
        style={[
          styles.meta,
          {
            color: theme.subText,
          },
        ]}
      >
        {meal?.strCategory} • {meal?.strArea}
      </Text>

      <TouchableOpacity
        onPress={handleListen}
        style={[
          styles.listenButton,
          {
            backgroundColor: theme.primary,
          },
        ]}
      >
        <Text style={styles.listenText}>
          {isSpeaking ? "|| Stop Listening" : "▶ Listen Full Recipe"}
        </Text>
      </TouchableOpacity>

      {meal?.strYoutube && (
        <TouchableOpacity
          onPress={handleOpenVideo}
          style={[
            styles.videoButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.videoText,
              {
                color: theme.text,
              },
            ]}
          >
            ▶ Watch Recipe Video
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.text,
          },
        ]}
      >
        Ingredients
      </Text>

      {getIngredientsWithMeasures().map((item, index) => (
        <Text
          key={index}
          style={[
            styles.detailText,
            {
              color: theme.text,
            },
          ]}
        >
          • {item}
        </Text>
      ))}

      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.text,
          },
        ]}
      >
        How To Cook
      </Text>

      <Text
        style={[
          styles.instructions,
          {
            color: theme.text,
          },
        ]}
      >
        {meal?.strInstructions}
      </Text>
    </ScrollView>
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

  header: {
    marginTop: 10,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: 280,
    borderRadius: 18,
  },

  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "700",
  },

  meta: {
    marginTop: 8,
    fontSize: 14,
  },

  listenButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  listenText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  videoButton: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
  },

  videoText: {
    fontWeight: "600",
    fontSize: 15,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
  },

  detailText: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 6,
  },

  instructions: {
    fontSize: 15,
    lineHeight: 26,
  },
});
