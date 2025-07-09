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

      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.text}>{nombre}</Text>

      <Text style={styles.label}>Edad:</Text>
      <Text style={styles.text}>{edad}</Text>

      <Text style={styles.label}>Correo electrónico:</Text>
      <Text style={styles.text}>{email}</Text>

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    marginTop: 40,
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
});
