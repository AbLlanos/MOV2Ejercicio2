import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const login = () => {
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    signInWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;

        Alert.alert('Bienvenido', 'Inicio de sesión exitoso.');
        navigation.navigate('Perfil');
      })
      .catch((error) => {
        console.log(error.code);

        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('Error', 'No se encontró el usuario.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Error', 'Contraseña incorrecta.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Correo inválido', 'El formato del correo no es válido.');
            break;
          default:
            Alert.alert('Error', 'No se pudo iniciar sesión. Intenta nuevamente.');
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePrinicpal}>TaskHub</Text>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        onChangeText={setCorreo}
        value={correo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setContrasena}
        value={contrasena}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.loginLink}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginLink: {
    color: '#0066cc',
    textAlign: 'center',
    marginTop: 10,
  },
  titlePrinicpal: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
