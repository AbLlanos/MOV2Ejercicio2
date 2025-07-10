import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/Config'
import { ref, set } from 'firebase/database'

export default function RegistroScreen({ navigation }: any) {


    const [correo, setcorreo] = useState("")
    const [contrasena, setcontrasena] = useState("")
    const [nombre, setnombre] = useState("")
    const [edad, setedad] = useState("")

    function registro() {
        if (!nombre.trim() || !edad.trim() || !correo.trim() || !contrasena.trim()) {
            Alert.alert("Campos incompletos", "Todos los campos son obligatorios.");
            return;
        }

        createUserWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;

                set(ref(db, 'users/' + user.uid), {
                    nombre: nombre,
                    edad: edad,
                    email: correo,
                });

                Alert.alert("Felicidades", "Se ha registrado sin problemas");
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.log("Código de error:", error.code);

                switch (error.code) {
                    case "auth/email-already-in-use":
                        Alert.alert("Correo en uso", "Este correo ya está registrado.");
                        break;
                    case "auth/invalid-email":
                        Alert.alert("Correo inválido", "Formato de correo incorrecto.");
                        break;
                    case "auth/weak-password":
                        Alert.alert("Contraseña débil", "La contraseña debe tener al menos 6 caracteres.");
                        break;
                    default:
                        Alert.alert("Error", "No se pudo registrar. Intenta nuevamente.");
                        break;
                }
            });
    }




    return (
        <View style={styles.container}>

            <Image
                source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/762/762686.png',
                }}
                style={styles.bannerImage}
            />

            <Text style={styles.titlePrinicpal}>TaskHub</Text>



            <Text style={styles.title}>Registro de usuarios</Text>

            <Text style={styles.label}>Ingrese su nombre</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText={(texto) => setnombre(texto)}
                value={nombre}
            />

            <Text style={styles.label}>Ingrese su edad</Text>
            <TextInput
                style={styles.input}
                placeholder="Edad"
                keyboardType="number-pad"
                onChangeText={(texto) => setedad(texto)}
                value={edad}
            />

            <Text style={styles.label}>Ingrese su correo electrónico</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                onChangeText={(texto) => setcorreo(texto)}
                value={correo}
            />

            <Text style={styles.label}>Ingrese su contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={(texto) => setcontrasena(texto)}
                value={contrasena}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => registro()}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        backgroundColor: '#E6F4FF',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    titlePrinicpal: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#e1e0e0',
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
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
        fontSize: 16,
    },
    loginLink: {
        textAlign: 'center',
        marginTop: 10,
    },
    label: {
        fontSize: 15,
        marginVertical: 3
    },
    bannerImage: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        backgroundColor: "#6473d3",
        borderRadius: 20
    },
});