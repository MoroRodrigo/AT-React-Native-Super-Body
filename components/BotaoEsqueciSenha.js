import React from 'react';
import { Button } from 'react-native-paper';

const BotaoEsqueciSenha = ({ onPress }) => {
  return <Button mode="text" onPress={onPress}>Recuperar Senha</Button>;
};

export default BotaoEsqueciSenha;
