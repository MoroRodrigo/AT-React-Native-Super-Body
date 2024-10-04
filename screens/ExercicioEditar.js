import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useTheme } from '../ThemeContext'; 

const ExercicioEditar = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [carga, setCarga] = useState('');
  const { isDarkMode } = useTheme(); // Obtendo o estado do tema

  useEffect(() => {
    const buscarExercicio = async () => {
      const docRef = doc(db, 'exercicios', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data().data);
        setNome(docSnap.data().nome);
        setCarga(docSnap.data().carga);
      }
    };
    buscarExercicio();
  }, [id]);

  const handleAtualizarExercicio = async () => {
    try {
      const docRef = doc(db, 'exercicios', id);
      await updateDoc(docRef, { data, nome, carga: parseInt(carga) });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao atualizar exercício:', error);
    }
  };

  const handleDeletarExercicio = async () => {
    try {
      const docRef = doc(db, 'exercicios', id);
      await deleteDoc(docRef);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao deletar exercício:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
      <TextInput
        placeholder="Data"
        value={data}
        onChangeText={setData}
        style={[styles.input, { borderColor: isDarkMode ? '#666' : 'gray', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'} // Cor do texto do placeholder
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
      <Button mode="contained" onPress={handleAtualizarExercicio} color={isDarkMode ? '#bb86fc' : '#6200ee'}>
        Atualizar Exercício
      </Button>
      <Button mode="text" onPress={handleDeletarExercicio} color={isDarkMode ? '#ff6666' : '#f00'}>
        Deletar Exercício
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

export default ExercicioEditar;
