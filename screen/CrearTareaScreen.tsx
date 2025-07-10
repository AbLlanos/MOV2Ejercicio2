import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../firebase/Config';
import { ref, get, set } from 'firebase/database';

export default function CrearTareaScreen() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nota, setNota] = useState('');
  const [tipoTarea, setTipoTarea] = useState('');
  const [completada, setCompletada] = useState(false);
  const [prioridad, setPrioridad] = useState("");

  async function guardarTarea() {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado");
      return;
    }

    if (
      titulo.trim() === '' ||
      descripcion.trim() === '' ||
      tipoTarea.trim() === '' || 
      nota.trim() === ""||
      prioridad.trim() === ""
    ) {
      Alert.alert("Campos obligatorios", "Por favor completa todos los campos");
      return;
    }

    try {
      const userCounterRef = ref(db, `users/${user.uid}/taskCounter`);
      const counterSnap = await get(userCounterRef);
      const contadorActual = counterSnap.exists() ? counterSnap.val() : 0;
      const nuevoContador = contadorActual + 1;
      const nuevoId = `task${nuevoContador}`;

      const nuevaTareaRef = ref(db, `users/${user.uid}/tasks/${nuevoId}`);

      await set(nuevaTareaRef, {
        title: titulo,
        descripcion: descripcion,
        nota: nota,
        tipoTarea: tipoTarea,
        completed: false,
        prioridad: prioridad,
        createdAt: new Date().toISOString(),
      });

      await set(userCounterRef, nuevoContador);

      Alert.alert(`Tarea creada con ID: ${nuevoId}`, "La tarea ha sido creada");

      limpiarCampos();
    } catch (error) {
      console.error(error);
      Alert.alert("Error al guardar tarea");
    }
  }

  function limpiarCampos() {
    setTitulo('');
    setDescripcion('');
    setNota('');
    setTipoTarea('');
    setCompletada(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Tarea</Text>

      <View style={styles.card}>
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
          placeholder="Nota"
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
          onChangeText={(texto)=>setPrioridad(texto)}
        />

        <TouchableOpacity style={styles.button} onPress={guardarTarea}>
          <Text style={styles.buttonText}>Guardar Tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#003366',
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
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
