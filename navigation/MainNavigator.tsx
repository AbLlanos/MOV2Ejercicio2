import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import PerfilScreen from '../screen/PerfilScreen';
import RegistroScreen from '../screen/RegistroScreen';
import { NavigationContainer } from '@react-navigation/native';
import MenuUsuarioNavigator from './MenuUsuarioNavigator';


const Drawer = createDrawerNavigator();

function Mydrawer() {
    return (

        <Drawer.Navigator>

            <Drawer.Screen name='Home' component={HomeScreen}></Drawer.Screen>

            <Drawer.Screen name='Login' component={LoginScreen}></Drawer.Screen>

            <Drawer.Screen name='Registro' component={RegistroScreen}></Drawer.Screen>

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