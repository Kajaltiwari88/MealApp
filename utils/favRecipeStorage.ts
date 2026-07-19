import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favoriteRecipes';

export const getFavorites = async () => {
  const data =
    await AsyncStorage.getItem(
      FAVORITES_KEY
    );

  return data
    ? JSON.parse(data)
    : [];
};

export const saveFavorite =
  async (recipe: any) => {
    const existing =
      await getFavorites();

    const alreadyExists =
      existing.find(
        (item: any) =>
          item.idMeal ===
          recipe.idMeal
      );

    if (alreadyExists) return;

    const updated = [
      ...existing,
      recipe,
    ];

    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updated)
    );
  };

export const removeFavorite =
  async (idMeal: string) => {
    const existing =
      await getFavorites();

    const updated =
      existing.filter(
        (item: any) =>
          item.idMeal !== idMeal
      );

    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updated)
    );
  };