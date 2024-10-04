// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import EsqueciSenhaScreen from './screens/EsqueciSenhaScreen';
import HomeScreen from './screens/HomeScreen'; 
import ExercicioCadastro from './screens/ExercicioCadastro';
import ExercicioEditar from './screens/ExercicioEditar';
import PerfilScreen from './screens/PerfilScreen';
import ConfiguracaoScreen from './screens/ConfiguracaoScreen';
import NavegacaoHome from './components/NavegacaoHome';
import { ThemeProvider } from './ThemeContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenhaScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="NavegacaoHome" 
            component={NavegacaoHome} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="ExercicioCadastro" component={ExercicioCadastro} />
          <Stack.Screen name="ExercicioEditar" component={ExercicioEditar} />
          <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
          <Stack.Screen name="ConfiguracaoScreen" component={ConfiguracaoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
