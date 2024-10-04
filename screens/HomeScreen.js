import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import BotaoAdicionar from '../components/BotaoAdicionar';
import NavegacaoHome from '../components/NavegacaoHome';
import ListaExercicios from '../components/ListaExercicios';
import { useTheme } from '../ThemeContext'; 
import * as Network from 'expo-network'; 

const HomeScreen = ({ navigation }) => {
  const [exercicios, setExercicios] = useState([]);
  const [dataHoje, setDataHoje] = useState('');
  const [isConnected, setIsConnected] = useState(true); 
  
  const { isDarkMode } = useTheme(); // Obtendo o estado do tema

  useEffect(() => {
    const checkConnection = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected);
      if (!isConnected) {
        Alert.alert("Sem conexão", "Verifique sua conexão com a Internet.");
      }
    };

    const dataAtual = new Date().toLocaleDateString('pt-BR'); 
    setDataHoje(dataAtual);

    const auth = getAuth();
    const userAuth = auth.currentUser;

    if (userAuth && isConnected) {
      const exercicioRef = collection(db, 'exercicios');
      const q = query(
        exercicioRef, 
        where('data', '==', dataAtual), 
        where('usuarioId', '==', userAuth.uid) // Filtrando pelos exercícios do usuário
      );

      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const listaExercicios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExercicios(listaExercicios);
      });

      // Limpeza do listener quando o componente desmontar
      return () => unsubscribe();
    }
  }, [isConnected]); 

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <NavegacaoHome navigation={navigation} />
      <Text style={[styles.dataHoje, { color: isDarkMode ? '#fff' : '#000' }]}>{dataHoje}</Text>
      {exercicios.length === 0 ? (
        <Text style={[styles.mensagem, { color: isDarkMode ? '#aaa' : 'gray' }]}>
          Nenhum exercício cadastrado para hoje.
        </Text>
      ) : (
        <FlatList
          data={exercicios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListaExercicios 
              item={item} 
              onPress={() => navigation.navigate('ExercicioEditar', { id: item.id })}
            />
          )}
        />
      )}
      <BotaoAdicionar onPress={() => navigation.navigate('ExercicioCadastro')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center' 
  },
  darkContainer: {
    backgroundColor: '#121212', // Cor de fundo para modo escuro
  },
  lightContainer: {
    backgroundColor: '#f5f5f5', // Cor de fundo para modo claro
  },
  dataHoje: { 
    fontSize: 24, 
    marginVertical: 20 
  },
  mensagem: { 
    fontSize: 18, 
    marginTop: 20 
  },
});

export default HomeScreen;
