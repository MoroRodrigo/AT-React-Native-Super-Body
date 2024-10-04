import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';
import BarraLogin from '../components/BarraLogin';
import BotaoEsqueciSenha from '../components/BotaoEsqueciSenha';

const EsqueciSenhaScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleEsqueciSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Email de recuperação enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <BotaoEsqueciSenha onPress={handleEsqueciSenha} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
});

export default EsqueciSenhaScreen;
