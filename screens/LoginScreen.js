import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ImagemLogo from '../components/ImagemLogo';
import BotaoHomeButton from '../components/BotaoHome';
import { Button } from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImagemLogo />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <BotaoHomeButton mode="text" onPress={handleLogin} />
      <Button onPress={() => navigation.navigate('Cadastro')}>Cadastrar</Button>
      <Button onPress={() => navigation.navigate('EsqueciSenha')}>Esqueci Senha</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
});

export default LoginScreen;
