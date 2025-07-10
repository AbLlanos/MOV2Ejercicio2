import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CrearTareaScreen from '../screen/CrearTareaScreen';
import EditarTareaScreen from '../screen/EditarTareaScreen';
import EliminarTareaScreen from '../screen/EliminarTareaScreen';
import PerfilScreen from '../screen/PerfilScreen';
import ObservarTareasScreen from '../screen/ObservarTareasScreen';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Bottom = createBottomTabNavigator();

export default function MenuUsuarioNavigator() {
    return (
        <Bottom.Navigator
            initialRouteName="Perfil"
            screenOptions={{ headerShown: false }}
        >
            <Bottom.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Crear Tarea"
                component={CrearTareaScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Editar Tarea"
                component={EditarTareaScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="edit" size={size} color={color} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Leer Tarea"
                component={ObservarTareasScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="eye-outline" size={size} color={color} />
                    ),
                }}
            />
            <Bottom.Screen
                name="Eliminar Tarea"
                component={EliminarTareaScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trash-outline" size={size} color={color} />
                    ),
                }}
            />
        </Bottom.Navigator>
    );
}

const styles = StyleSheet.create({});
