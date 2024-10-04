import React, { useEffect } from 'react';
import { View, Text, Switch, TextInput, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../ThemeContext';

const ConfiguracaoScreen = () => {
  const {
    isDarkMode,
    toggleTheme,
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
  } = useTheme();

  useEffect(() => {
    // Exibe alerta quando as cores são alteradas
    if (primaryColor || secondaryColor) {
      Alert.alert('Cores atualizadas!', 'As cores do tema foram alteradas.');
    }
  }, [primaryColor, secondaryColor]);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Configurações</Text>

      <View style={styles.switchContainer}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Modo Escuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Cor Primária:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
        value={primaryColor}
        onChangeText={setPrimaryColor}
        placeholder="Digite uma cor hexadecimal (ex: #6200ee)"
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
      />

      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Cor Secundária:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
        value={secondaryColor}
        onChangeText={setSecondaryColor}
        placeholder="Digite uma cor hexadecimal (ex: #03dac4)"
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default ConfiguracaoScreen;
