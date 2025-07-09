import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CrearTareaScreen from '../screen/CrearTareaScreen';
import EditarTareaScreen from '../screen/EditarTareaScreen';
import EliminarTareaScreen from '../screen/EliminarTareaScreen';
import PerfilScreen from '../screen/PerfilScreen';

const Bottom = createBottomTabNavigator();

export default function MenuUsuarioNavigator() {
    return (
        <Bottom.Navigator
            initialRouteName="Perfil"
            screenOptions={{ headerShown: false }}
        >
            <Bottom.Screen name="Perfil" component={PerfilScreen} />
            <Bottom.Screen name="Crear Tarea" component={CrearTareaScreen} />
            <Bottom.Screen name="Editar Tarea" component={EditarTareaScreen} />
            <Bottom.Screen name="Eliminar Tarea" component={EliminarTareaScreen} />
        </Bottom.Navigator>
    );
}

const styles = StyleSheet.create({});
