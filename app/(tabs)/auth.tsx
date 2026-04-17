import { StyleSheet, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import { useState } from 'react';

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  return (

    <ThemedView style={{ flex: 1 }}>

      <ThemedView style={styles.header}>
        <Image
          source={require('@/assets/images/FitnessApp-2.png')}
          style={styles.fitnessAppLogo}
        />
      </ThemedView>


      <ThemedView style={styles.formContainer}>

        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{ fontFamily: Fonts.rounded }}>
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </ThemedText>
        </ThemedView>

        <ThemedText>
          {isRegister
            ? 'Crea una cuenta para continuar'
            : 'Ingresa tus datos para continuar'}
        </ThemedText>


        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
        />

        {isRegister && (
          <TextInput
            placeholder="Confirmar contraseña"
            secureTextEntry
            style={styles.input}
          />
        )}

        <Pressable onPress={() => console.log('Botón presionado')}
          style={({ pressed }) => [
            styles.button,
            isRegister && styles.buttonRegister,
            pressed && { opacity: 0.7 }
          ]}
        >
          <ThemedText style={styles.buttonText}>
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => setIsRegister(!isRegister)}>
          <ThemedText style={styles.switchText}>
            {isRegister
              ? '¿Ya tienes cuenta? Inicia sesión'
              : '¿No tienes cuenta? Regístrate'}
          </ThemedText>
        </Pressable>


      </ThemedView>
    </ThemedView>

  );
}

const styles = StyleSheet.create({

  formContainer: {
    flex: 1,              // Se usa para evitar superposición
    padding: 30,
    paddingTop: 50,
    justifyContent: 'flex-start', //Empiezan los elementos al comienzo 
  },

  header: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Fondo gris claro para el encabezado
  },

  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,
  },

  fitnessAppLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 60,
  },

  button: {
    backgroundColor: '#199dd7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonRegister: {
    backgroundColor: '#153152',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  switchText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
  }

});
