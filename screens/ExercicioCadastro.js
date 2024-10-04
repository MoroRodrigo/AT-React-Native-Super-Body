import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { useTheme } from '../ThemeContext';

const ExercicioCadastro = ({ navigation }) => {
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [carga, setCarga] = useState('');
  const { isDarkMode } = useTheme(); 
  const auth = getAuth(); 

  const handleCadastroExercicio = async () => {
    try {
      const usuarioId = auth.currentUser.uid; 
      await addDoc(collection(db, 'exercicios'), {
        data,
        nome,
        carga: parseInt(carga),
        usuarioId, 
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao cadastrar exercício:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
      <TextInput
        placeholder="Data"
        value={data}
        onChangeText={setData}
        style={[styles.input, { borderColor: isDarkMode ? '#666' : 'gray', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'} 
      />
      <TextInput
        placeholder="Nome do Exercício"
        value={nome}
        onChangeText={setNome}
        style={[styles.input, { borderColor: isDarkMode ? '#666' : 'gray', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
      />
      <TextInput
        placeholder="Carga (kg)"
        value={carga}
        onChangeText={setCarga}
        keyboardType="numeric"
        style={[styles.input, { borderColor: isDarkMode ? '#666' : 'gray', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
      />
      <Button mode="text" onPress={handleCadastroExercicio} color={isDarkMode ? '#bb86fc' : '#6200ee'}>
        Cadastrar Exercício
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default ExercicioCadastro;
