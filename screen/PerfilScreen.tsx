import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth, db } from '../firebase/Config';

export default function PerfilScreen({ navigation }: any) {

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

    const user = auth.currentUser;

    if (user) {

      const userRef = ref(db, 'users/' + user.uid);

      onValue(userRef, (snapshot) => {

        const data = snapshot.val();
        if (data) {
          setNombre(data.nombre);
          setEdad(data.edad);
          setEmail(data.email);
        }

      });
    }
  }, []);


  const cerrarSesion = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.text}>{nombre}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.text}>{edad}</Text>

        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.text}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#003366',

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#555',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#222',
  },
  button: {
    backgroundColor: '#cc0000',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});