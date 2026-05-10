import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const getFeaturedMeals = async () => {
  const response = await axios.get(
    `${BASE_URL}/search.php?s=`
  );

  return response?.data?.meals || [];
};

export const searchMeals = async (query: string) => {
  const response = await axios.get(
    `${BASE_URL}/search.php?s=${query}`
  );

  return response?.data?.meals || [];
};

export const getMealById = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/lookup.php?i=${id}`
  );

  return response.data.meals?.[0] || null;
};