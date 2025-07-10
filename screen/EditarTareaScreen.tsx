import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { get, getDatabase, ref, set } from 'firebase/database';
import { auth } from '../firebase/Config';

export default function EditarTareaScreen() {
  const [taskId, setTaskId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nota, setNota] = useState('');
  const [tipoTarea, setTipoTarea] = useState('Personal');
  const [completada, setCompletada] = useState(false);
  const [tareaCargada, setTareaCargada] = useState(false);
  const [prioridad, setPrioridad] = useState("");

  async function buscarTarea() {
    if (!taskId.trim()) {
      Alert.alert('Error', 'Por favor ingresa el ID de la tarea (ej: task1)');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    try {
      const db = getDatabase();
      const tareaRef = ref(db, `users/${user.uid}/tasks/${taskId}`);
      const snapshot = await get(tareaRef);

      if (!snapshot.exists()) {
        Alert.alert('No encontrado', 'No existe tarea con ese ID para este usuario');
        setTareaCargada(false);
        return;
      }

      const data = snapshot.val();

      setTitulo(data.title);
      setDescripcion(data.descripcion);
      setNota(data.nota);
      setTipoTarea(data.tipoTarea);
      setCompletada(data.completed);
      setPrioridad(data.prioridad)
      setTareaCargada(true);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al cargar la tarea');
      setTareaCargada(false);
    }
  }

  async function guardarCambios() {
    if (!taskId.trim()) {
      Alert.alert('Error', 'Por favor ingresa un ID para la tarea');
      return;
    }
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Campos incompletos', 'Título y descripción son obligatorios.');
      return;
    }
    if (!tareaCargada) {
      Alert.alert('Error', 'Primero busca una tarea válida.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    try {
      const db = getDatabase();
      const tareaRef = ref(db, `users/${user.uid}/tasks/${taskId}`);

      await set(tareaRef, {
        title: titulo,
        descripcion: descripcion,
        nota: nota,
        tipoTarea: tipoTarea,
        completed: completada,
        prioridad: prioridad,
        createdAt: new Date().toISOString(),
      });

      limpiar();
      Alert.alert('Éxito', 'Tarea actualizada correctamente');

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  }

  function limpiar() {
    setTaskId('');
    setTitulo('');
    setDescripcion('');
    setNota('');
    setTipoTarea('');
    setCompletada(false);
    setTareaCargada(false);
    setPrioridad('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar tarea de tu usuario</Text>

      <View style={styles.card}>
        <Text style={[styles.title1, { marginTop: 20 }]}>Ingresa el nombre de tu tarea</Text>
        <TextInput
          style={styles.input}
          placeholder="ID de la tarea"
          value={taskId}
          onChangeText={(texto) => setTaskId(texto)}
        />

        <TouchableOpacity style={styles.button} onPress={buscarTarea}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

        <Text style={[styles.title1, { marginTop: 20 }]}>Editar Tarea</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={(texto)=>setTitulo(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={(texto)=>setDescripcion(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Nota (opcional)"
          value={nota}
          onChangeText={(texto)=>setNota(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo de Tarea"
          value={tipoTarea}
          onChangeText={(texto)=>setTipoTarea(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Prioridad"
          value={prioridad}
          onChangeText={(texto)=>setPrioridad}
        />

        <Text style={styles.label}>¿Completada?</Text>
        <View style={styles.row}>
          {['Sí', 'No'].map((opcion) => {
            const value = opcion === 'Sí';
            return (
              <TouchableOpacity
                key={opcion}
                style={[
                  styles.radioButton,
                  completada === value && styles.radioButtonSelected,
                ]}
                onPress={() => setCompletada(value)}
              >
                <Text
                  style={[
                    styles.radioText,
                    completada === value && styles.radioTextSelected,
                  ]}
                >
                  {opcion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={guardarCambios}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  title1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
    color: '#003366',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  radioButtonSelected: {
    backgroundColor: '#0066cc',
  },
  radioText: {
    color: '#0066cc',
    fontWeight: '600',
  },
  radioTextSelected: {
    color: '#fff',
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
    fontSize: 18,
  },
});
