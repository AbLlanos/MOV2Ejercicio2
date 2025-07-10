import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

        limpiar();
        navigation.navigate('Perfil', { uid: user.uid });
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
      })
  };
  function limpiar() {
    setCorreo(""),
      setContrasena("")
  }




  return (
    <View style={styles.container}>
      <Text style={styles.titlePrinicpal}>TaskHub</Text>
      <Text style={styles.title}>Iniciar sesión</Text>

      <Image
        source={{ uri: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg' }}
        style={styles.imagen}
      />
      <Text style={styles.title}>Ingrese sus datos</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
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
        <Text style={styles.buttonText}>Iniciar Sesion</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.loginLink}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FF',
    padding: 20,
    justifyContent: 'center',
  },
  titlePrinicpal: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    height: 50,
    borderColor: '#e1e0e0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginLink: {
    color: '#010404',
    textAlign: 'center',
    marginTop: 10,
  },
  imagen: {
    width: 160,
    height: 160,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
});