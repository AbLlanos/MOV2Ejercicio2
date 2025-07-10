import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import PerfilScreen from '../screen/PerfilScreen';
import RegistroScreen from '../screen/RegistroScreen';
import { NavigationContainer } from '@react-navigation/native';
import MenuUsuarioNavigator from './MenuUsuarioNavigator';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Drawer = createDrawerNavigator();

function Mydrawer() {
    return (

        <Drawer.Navigator>

            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="login" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Registro"
                component={RegistroScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-add-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Perfil"
                component={MenuUsuarioNavigator}
                options={{
                    drawerItemStyle: { display: 'none' }
                }} >
            </Drawer.Screen>

        </Drawer.Navigator>

    )
}


export default function MainNavigator() {
    return (

        <NavigationContainer>

            <Mydrawer></Mydrawer>

        </NavigationContainer>

    )
}

const styles = StyleSheet.create({})