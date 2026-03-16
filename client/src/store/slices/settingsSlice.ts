import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  theme: 'light' | 'dark';
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    screenReader: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
}

const initialState: SettingsState = {
  language: 'en',
  theme: 'light',
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    screenReader: false,
  },
  notifications: {
    email: true,
    push: true,
    sound: false,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<SettingsState['theme']>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<SettingsState['accessibility']['fontSize']>) => {
      state.accessibility.fontSize = action.payload;
    },
    toggleHighContrast: (state) => {
      state.accessibility.highContrast = !state.accessibility.highContrast;
    },
    toggleScreenReader: (state) => {
      state.accessibility.screenReader = !state.accessibility.screenReader;
    },
    setNotificationSettings: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
  },
});

export const {
  setLanguage,
  setTheme,
  setFontSize,
  toggleHighContrast,
  toggleScreenReader,
  setNotificationSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 