import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/Config';
import { ref, onValue } from 'firebase/database';


type Tarea = {
    id: string;
    title: string;
    descripcion: string;
    nota: string;
    tipoTarea: string;
    completed: boolean;
    createdAt: string;
    prioridad: string;
};

export default function ObservarTareasScreen() {
    const [tareas, setTareas] = useState<Tarea[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const tareasRef = ref(db, `users/${user.uid}/tasks`);
        const unsubscribe = onValue(tareasRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const listaTareas = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                listaTareas.sort((a, b) => {
                    const fechaA = new Date(a.createdAt ?? 0).getTime();
                    const fechaB = new Date(b.createdAt ?? 0).getTime();
                    return fechaB - fechaA;
                });
                setTareas(listaTareas);
            } else {
                setTareas([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.titlePrinicpal}>Mis Tareas</Text>

            {tareas.length === 0 ? (
                <Text style={styles.noTareas}>No tienes tareas registradas.</Text>
            ) : (
                <FlatList
                    data={tareas}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            
                            <Text style={styles.titulo}>ID: {item.id}</Text>
                            <Text style={styles.descripcion}>Tarea: {item.title}</Text>
                            <Text style={styles.descripcion}>Descripción: {item.descripcion}</Text>
                            <Text style={styles.descripcion}>Nota: {item.nota}</Text>
                            <Text style={styles.descripcion}>Tipo de tarea: {item.tipoTarea}</Text>
                            <Text style={styles.descripcion}>¿Completado la tarea?: {item.completed ? 'Sí' : 'No'}</Text>
                            <Text style={styles.descripcion}>Prioridad: {item.prioridad}</Text>
                            <Text style={styles.descripcion}>
                                Fecha de creación:{' '}
                                {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'No disponible'}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  titlePrinicpal: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#003366',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#003366',
  },
  noTareas: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 40,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 1,
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 2,
  },
  descripcion: {
    fontSize: 15,
    color: '#333',
    marginBottom: 3,
  },
});