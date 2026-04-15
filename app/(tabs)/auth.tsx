import { StyleSheet, TextInput } from 'react-native';
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


      <ThemedView style={styles.container}>

        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{ fontFamily: Fonts.rounded }}>
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </ThemedText>
        </ThemedView>

        <ThemedText>Ingresa tus datos para continuar</ThemedText>

        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
        />

      </ThemedView>
      </ThemedView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              // 🔥 CLAVE para evitar superposición
    padding: 20,
    justifyContent: 'center',
  },
  header: {
  width: '100%',
  height: 250,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f2f2f2', // 👈 simula el gris
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
});
