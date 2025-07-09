import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

        if (correo.trim() === "" || contrasena.trim() === "") {
            Alert.alert("Incompleto", "Existen campos en blanco")
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



            })
            .catch((error) => {

                console.log(error.message);

                switch (error.message) {

                    case "auth/weak-password":
                        Alert.alert("Contraseña débil", "Se necesita por lo menos 6 dígitos")
                        break;

                    case "auth/email-already-in-use":
                        Alert.alert("ERROR", "Las credenciales ya estan en uso")
                        break;

                    case "auth/invalid-email":
                        Alert.alert("Correo inválido", "Formato de correo incorrecto")
                        break;

                    case "auth / email - already -in -use":
                        Alert.alert("Correo inválido", "Formato de correo incorrecto")
                        break;

                    default:
                        Alert.alert("ERROR", "El registro ha fallado")
                        break;

                }

            });

        Alert.alert("Felicidades", "El registro ha sido exitoso")
        navigation.navigate("Login")


    }




    return (
        <View style={styles.container}>

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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    titlePrinicpal: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
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
        color: '#0066cc',
        textAlign: 'center',
        marginTop: 10,
    },
    label: {
        fontSize: 15,
        marginVertical: 3
    }
});