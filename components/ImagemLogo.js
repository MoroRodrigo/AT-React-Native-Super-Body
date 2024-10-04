import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImagemLogo = () => {
  return <Image source={require('../assets/logo.png')} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
});

export default ImagemLogo;
