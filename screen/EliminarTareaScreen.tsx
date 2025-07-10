import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { getDatabase, ref, remove, get } from 'firebase/database';
import { auth, db } from '../firebase/Config';

export default function EliminarTareaScreen() {
  const [taskId, setTaskId] = useState('');

  const eliminarTarea = async () => {
    if (!taskId.trim()) {
      Alert.alert('Error', 'Por favor ingresa el ID de la tarea a eliminar');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    try {
      const tareaRef = ref(db, `users/${user.uid}/tasks/${taskId}`);
      const snapshot = await get(tareaRef);

      if (!snapshot.exists()) {
        Alert.alert('No encontrado', 'No existe tarea con ese ID para este usuario');
        return;
      }

      Alert.alert(
        'Confirmar eliminación',
        `¿Estás seguro que deseas eliminar la tarea "${taskId}"?`,
        [
          {
            text: 'Cancelar',
          },
          {
            text: 'Aceptar',


            onPress: async () => {
              try {

                await remove(tareaRef);
                Alert.alert('Éxito', `Tarea "${taskId}" eliminada correctamente`);
                setTaskId('');

              } catch (error) {

                console.error(error);
                Alert.alert('Error', 'No se pudo eliminar la tarea');

              }

            },
          },
        ]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al intentar eliminar la tarea');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Tarea por ID</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="ID de la tarea"
          value={taskId}
          onChangeText={setTaskId}
        />

        <TouchableOpacity style={styles.button} onPress={eliminarTarea}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color:"#003366",
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#cc3300',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});

