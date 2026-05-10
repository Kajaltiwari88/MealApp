import {
  Platform,
} from "react-native";

import * as SecureStore from "expo-secure-store";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveItem = async (
  key: string,
  value: string
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return;
  }

  const finalValue =
    String(value);

  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(
      key,
      finalValue
    );
  } else {
    await SecureStore.setItemAsync(
      key,
      finalValue
    );
  }
};

export const getItem =
  async (
    key: string
  ) => {
    if (
      Platform.OS ===
      "web"
    ) {
      return await AsyncStorage.getItem(
        key
      );
    } else {
      return await SecureStore.getItemAsync(
        key
      );
    }
  };

export const removeItem =
  async (
    key: string
  ) => {
    if (
      Platform.OS ===
      "web"
    ) {
      await AsyncStorage.removeItem(
        key
      );
    } else {
      await SecureStore.deleteItemAsync(
        key
      );
    }
  };