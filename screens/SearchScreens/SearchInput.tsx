import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

import { useThemeContext } from '@/context/ThemeContext';
import { searchMeals } from '@/api/mealApi';

type MealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any;
};

type Props = {
  setSearchResults: (
    data: MealType[]
  ) => void;

  setLoading: (
    value: boolean
  ) => void;
};

export default function SearchInput({
  setSearchResults,
  setLoading,
}: Props) {
  const { theme } = useThemeContext();

  const [search, setSearch] =
    useState<string>('');

  useEffect(() => {
    const subscription =
      ExpoSpeechRecognitionModule.addListener(
        'result',
        (event: any) => {
          const spokenText =
            event?.results?.[0]?.transcript ||
            '';

          setSearch(spokenText);

          handleSearch(spokenText);
        }
      );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSearch = async (
    value?: string
  ) => {
    const finalSearch =
      value || search;

    if (!finalSearch.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);

      const result =
        await searchMeals(
          finalSearch
        );

      setSearchResults(
        result || []
      );
    } catch (error) {
      console.log(
        'SEARCH ERROR:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSearch =
    async () => {
      try {
        const permission =
          await ExpoSpeechRecognitionModule.requestPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            'Permission Denied',
            'Microphone permission is required'
          );
          return;
        }

        await ExpoSpeechRecognitionModule.start({
          lang: 'en-US',
          interimResults: false,
          maxAlternatives: 1,
          continuous: false,
        });
      } catch (error) {
        console.log(
          'VOICE SEARCH ERROR:',
          error
        );
      }
    };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.searchBg,
          borderColor:
            theme.border,
        },
      ]}
    >
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search recipes..."
        placeholderTextColor={
          theme.subText
        }
        style={[
          styles.input,
          {
            color: theme.text,
          },
        ]}
        onSubmitEditing={() =>
          handleSearch()
        }
        underlineColorAndroid="transparent"
        selectionColor={theme.primary}
      />

      <TouchableOpacity
        onPress={
          handleVoiceSearch
        }
        style={[
          styles.iconButton,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
      >
        <Ionicons
          name="mic"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          handleSearch()
        }
        style={[
          styles.iconButton,
          {
            backgroundColor:
              theme.primary,
            marginLeft: 10,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    paddingVertical: 0,
    outlineStyle: 'none' as any,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});