import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Button } from 'react-native-paper';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Registra o usuário no Firestore, incluindo avatarUrl como string vazia
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email,
        nascimento,
        avatarUrl: '', // Adiciona campo avatarUrl como string vazia
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert("Erro", "Ocorreu um erro durante o cadastro.");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de Nascimento"
        value={nascimento}
        onChangeText={setNascimento}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="text" onPress={handleCadastro}>
        Cadastrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
});

export default CadastroScreen;
