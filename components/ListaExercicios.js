import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext'; 

const ListaExercicios = ({ item, onPress }) => {
  const { isDarkMode } = useTheme(); 

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.itemContainer, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.itemText, { color: isDarkMode ? '#fff' : '#000' }]}>{item.nome}</Text>
        <Text style={[styles.itemText, { color: isDarkMode ? '#fff' : '#000' }]}>
          {item.carga} kg
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 400,
    padding: 15,
    borderBottomWidth: 1,
  },
  lightContainer: {
    borderBottomColor: '#ccc',
  },
  darkContainer: {
    borderBottomColor: '#444', // Cor do limite para o modo escuro
  },
  itemText: {
    fontSize: 16,
  },
});

export default ListaExercicios;
