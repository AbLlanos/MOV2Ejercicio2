import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.bienvenida}>¡Bienvenido a</Text>
      <Text style={styles.title}>TaskHub</Text>
      <Text style={styles.subtitle}>Gestión de Tareas en Tiempo Real</Text>

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/762/762686.png',
        }}
        style={styles.bannerImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/16322/16322193.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registro')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FF', // Color claro, amigable
    padding: 24,
    justifyContent: 'center',
  },
  bienvenida: {
    fontSize: 24,
    textAlign: 'center',
    color: '#0066cc', // Azul claro
    fontWeight: '500',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#003366', // Azul oscuro
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#0066cc',
    textAlign: 'center',
  },
  bannerImage: {
    width: 230,
    height: 230,
    alignSelf: 'center',
    backgroundColor: "#6473d3",
    borderRadius: 50,
    marginVertical:20,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '600',
    textAlign: "center"
  },
});
