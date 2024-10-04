// src/ThemeContext.js

import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [primaryColor, setPrimaryColor] = useState('#6200ee'); // cor padrão
  const [secondaryColor, setSecondaryColor] = useState('#03dac4'); // cor padrão

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const value = {
    isDarkMode,
    primaryColor,
    secondaryColor,
    toggleTheme,
    setPrimaryColor,
    setSecondaryColor,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
