import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase-config'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import BotaoEsqueciSenha from '../components/BotaoEsqueciSenha';
import { useTheme } from '../ThemeContext'; 

const auth = getAuth();
const firestore = getFirestore();

const PerfilScreen = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userAuth = auth.currentUser;
      if (userAuth) {
        const userDocRef = doc(firestore, 'usuarios', userAuth.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          setNome(userData.nome);
          setEmail(userAuth.email);
          const url = userData.avatarUrl || null;
          setAvatarUrl(url);
        }
      }
    };

    fetchUserData();
  }, []);

  const handlePickImage = async (source) => {
    let result;

    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const userAuth = auth.currentUser;

      // Carregar a imagem no Firebase Storage
      const imageRef = ref(storage, `avatars/${userAuth.uid}.jpg`); // Incluindo extensão do arquivo
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Verifique se o blob está correto
        if (!blob) {
          Alert.alert("Erro ao transformar a imagem em blob.");
          return;
        }

        console.log("Iniciando o upload para:", imageRef);
        console.log("Blob:", blob);

        
        await uploadBytes(imageRef, blob);

        // Obter URL da imagem e atualizar no Firestore
        const downloadUrl = await getDownloadURL(imageRef);
        const userDocRef = doc(firestore, 'usuarios', userAuth.uid);
        await updateDoc(userDocRef, { avatarUrl: downloadUrl });

        setAvatarUrl(downloadUrl); 
        Alert.alert("Imagem atualizada com sucesso!");
      } catch (error) {
        console.error("Erro no upload:", error); 
        Alert.alert("Erro ao fazer upload da imagem:", error.message);
      }
    } else {
      Alert.alert("A operação foi cancelada.");
    }
  };

  const handleEsqueciSenha = () => {
    const userAuth = auth.currentUser;
    if (userAuth) {
      sendPasswordResetEmail(auth, userAuth.email)
        .then(() => Alert.alert("Email de redefinição enviado!"))
        .catch((error) => Alert.alert("Erro ao enviar email:", error.message));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => handlePickImage('gallery')}>
          <Text style={[styles.button, { color: isDarkMode ? '#bb86fc' : '#1e90ff' }]}>Galeria</Text>
        </TouchableOpacity>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>Avatar</Text>
        )}
        <TouchableOpacity onPress={() => handlePickImage('camera')}>
          <Text style={[styles.button, { color: isDarkMode ? '#bb86fc' : '#1e90ff' }]}>Câmera</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>Nome: {nome}</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>E-mail: {email}</Text>
      <BotaoEsqueciSenha onPress={handleEsqueciSenha} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  avatarText: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 18,
    color: '#666',
  },
  button: {
    fontSize: 16,
    marginTop: 70,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default PerfilScreen;
