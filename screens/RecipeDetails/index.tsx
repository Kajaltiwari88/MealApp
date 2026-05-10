import React, {
  useEffect,
  useState,
} from 'react';

import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import * as Speech from 'expo-speech';
import * as Linking from 'expo-linking';

import { useThemeContext } from '@/context/ThemeContext';

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

export default function RecipeDetailsScreen({
  meal,
  onBack,
}: Props) {
  const { theme } = useThemeContext();

  const [isSpeaking, setIsSpeaking] =
    useState<boolean>(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const getIngredientsWithMeasures =
    () => {
      const items: string[] = [];

      for (
        let i = 1;
        i <= 20;
        i++
      ) {
        const ingredient =
          meal[
            `strIngredient${i}`
          ];

        const measure =
          meal[
            `strMeasure${i}`
          ];

        if (
          ingredient &&
          ingredient.trim()
        ) {
          items.push(
            `${measure || ''} ${ingredient}`.trim()
          );
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

    const ingredientsText =
      getIngredientsWithMeasures().join(
        ', '
      );

    const fullRecipeText = `
      Recipe Name ${meal.strMeal}.
      Category ${meal.strCategory}.
      Cuisine ${meal.strArea}.
      Ingredients ${ingredientsText}.
      Instructions ${meal.strInstructions}
    `;

    setIsSpeaking(true);

    Speech.speak(
      fullRecipeText,
      {
        language: 'en',
        pitch: 1,
        rate: 0.9,
        onDone: () =>
          setIsSpeaking(false),
      }
    );
  };

  const handleOpenVideo =
    async () => {
      if (!meal?.strYoutube)
        return;

      try {
        await Linking.openURL(
          meal.strYoutube
        );
      } catch (error) {
        
        console.log(
          'VIDEO OPEN ERROR:',
          error
        );
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
          backgroundColor:
            theme.background,
        },
      ]}
      showsVerticalScrollIndicator={
        false
      }
      contentContainerStyle={
        styles.content
      }
    >
      <TouchableOpacity
        onPress={handleBack}
        style={styles.backButton}
      >
        <Text
          style={[
            styles.backText,
            {
              color:
                theme.primary,
            },
          ]}
        >
          ← Back to Search
        </Text>
      </TouchableOpacity>

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
            color:
              theme.subText,
          },
        ]}
      >
        {meal?.strCategory} •{' '}
        {meal?.strArea}
      </Text>

      <TouchableOpacity
        onPress={handleListen}
        style={[
          styles.listenButton,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
      >
        <Text
          style={styles.listenText}
        >
          {isSpeaking
            ? '|| Stop Listening'
            : '▶ Listen Full Recipe'}
        </Text>
      </TouchableOpacity>

      {meal?.strYoutube ? (
        <TouchableOpacity
          onPress={
            handleOpenVideo
          }
          style={[
            styles.videoButton,
            {
              backgroundColor:
                theme.card,
              borderColor:
                theme.border,
            },
          ]}
        >
          <Text
            style={[
              styles.videoText,
              {
                color:
                  theme.text,
              },
            ]}
          >
            ▶ Watch Recipe Video
          </Text>
        </TouchableOpacity>
      ) : null}

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

      {getIngredientsWithMeasures().map(
        (
          item,
          index
        ) => (
          <Text
            key={index}
            style={[
              styles.detailText,
              {
                color:
                  theme.text,
              },
            ]}
          >
            • {item}
          </Text>
        )
      )}

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

  backButton: {
    marginTop: 10,
    marginBottom: 16,
  },

  backText: {
    fontSize: 15,
    fontWeight: '600',
  },

  image: {
    width: '100%',
    height: 280,
    borderRadius: 18,
  },

  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: '700',
  },

  meta: {
    marginTop: 8,
    fontSize: 14,
  },

  listenButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  listenText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  videoButton: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },

  videoText: {
    fontWeight: '600',
    fontSize: 15,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
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