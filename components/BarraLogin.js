import React from 'react';
import { Appbar } from 'react-native-paper';

const BarraLogin = ({ title, goBack }) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default BarraLogin;
