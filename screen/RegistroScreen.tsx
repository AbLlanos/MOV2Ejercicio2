import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/Config'

export default function RegistroScreen({ navigation }: any) {


    const [correo, setcorreo] = useState("")
    const [contrasena, setcontrasena] = useState("")

    function registro() {

        if (correo.trim() === "" || contrasena.trim() === "") {
            Alert.alert("Incompleto", "Existen campos en blanco")
            return;
        }

        createUserWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {

                const user = userCredential.user;
                navigation.navigate("login")


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


                    default:
                        Alert.alert("ERROR", "El registro ha fallado")
                        break;

                }

            });


    }




    return (
        <View>
            <Text>RegistroScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})