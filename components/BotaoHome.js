import React from 'react';
import { Button } from 'react-native-paper';

const BotaoHome = ({ onPress }) => {
  return <Button mode="text" onPress={onPress}>Entrar</Button>;
};

export default BotaoHome;
