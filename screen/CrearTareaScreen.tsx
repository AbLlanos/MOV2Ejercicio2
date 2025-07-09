import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth, db } from '../firebase/Config';

export default function CrearTareaScreen() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nota, setNota] = useState('');
  const [tipoTarea, setTipoTarea] = useState('');
  const [completada, setCompletada] = useState(false);

  async function guardarTarea() {

    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado");
      return;
    }

    if (
      titulo.trim() === '' ||
      descripcion.trim() === '' ||
      tipoTarea.trim() === ''
    ) {
      Alert.alert("Campos obligatorios", "Por favor completa todos los campos");
      return;
    }

    const userCounterRef = ref(db, `users/${user.uid}/taskCounter`);

    try {

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
        completed: completada,
        createdAt: new Date().toISOString(),
      });

      await set(userCounterRef, nuevoContador);

      Alert.alert(`Tarea creada con ID: ${nuevoId}`, "La tarea ha sido cread");

      limpiarCampos()

    } catch (error) {
      console.error(error);
      Alert.alert("Error al guardar tarea");
    }

  }

  function limpiarCampos() {
    setTitulo('');
    setDescripcion('');
    setNota('');
    setTipoTarea('Personal');
    setCompletada(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Tarea</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Nota (opcional)"
        value={nota}
        onChangeText={setNota}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo de Tarea"
        value={tipoTarea}
        onChangeText={setTipoTarea}
      />

      <Text style={styles.label}>¿Completada?</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.radioButton, completada && styles.radioButtonSelected]}
          onPress={() => setCompletada(true)}
        >
          <Text style={styles.radioText}>Sí</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioButton, !completada && styles.radioButtonSelected]}
          onPress={() => setCompletada(false)}
        >
          <Text style={styles.radioText}>No</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={guardarTarea}>
        <Text style={styles.buttonText}>Guardar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  radioButton: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  radioButtonSelected: {
    backgroundColor: '#53a3e4'
  },
  radioText: {
    color: '#0066cc',
    fontWeight: '600'
  },
  radioTextSelected: {
    color: '#fff'
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 18 },
});
