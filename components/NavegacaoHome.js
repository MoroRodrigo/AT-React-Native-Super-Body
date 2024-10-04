// NavegacaoHome.js
import React from 'react';
import { Appbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const NavegacaoHome = () => {
  const navigation = useNavigation(); 

  const irParaPerfil = () => {
    navigation.navigate('PerfilScreen'); 
  };

  const irParaConfiguracoes = () => {
    navigation.navigate('ConfiguracaoScreen'); 
  };

  return (
    <View style={styles.container}>
      <Appbar style={styles.bottom}>
        <Appbar.Action 
          icon="account" 
          onPress={irParaPerfil} 
        />
        <Appbar.Action 
          icon="cog" 
          onPress={irParaConfiguracoes} 
        />
      </Appbar>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '110%',
      },
      top: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', 
        elevation: 4, 
  },
});

export default NavegacaoHome;
