import { Platform } from 'react-native';

const tintColorLight = '#2E9E44';
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    // base
    text: '#111111',
    subText: '#666666',
    background: '#FFFFFF',

    // tabs
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // borders + cards
    border: '#E5E5E5',
    card: '#FFFFFF',

    // primary theme
    primary: '#2E9E44',
    secondary: '#FF9D2E',

    // search + categories
    searchBg: '#FFFFFF',
    categoryBg: '#FFFFFF',

    // home cards
    ingredientCard: '#F3FAEE',
    surpriseCard: '#FFF4E8',
    tipCard: '#F4EDFF',

    // extra
    notification: '#111111',
    white: '#FFFFFF',
  },

  dark: {
    // base
    text: '#FFFFFF',
    subText: '#BDBDBD',
    background: '#121212',

    // tabs
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // borders + cards
    border: '#2A2A2A',
    card: '#1E1E1E',

    // primary theme
    primary: '#2E9E44',
    secondary: '#FF9D2E',

    // search + categories
    searchBg: '#1E1E1E',
    categoryBg: '#1E1E1E',

    // home cards
    ingredientCard: '#1F2A1F',
    surpriseCard: '#33271A',
    tipCard: '#2A213D',

    // extra
    notification: '#FFFFFF',
    white: '#FFFFFF',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

    serif:
      "Georgia, 'Times New Roman', serif",

    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",

    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});