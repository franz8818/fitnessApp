import { StyleSheet, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function AuthScreen() {

  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const [user, setUser] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    // 1. Validar campos
    if (!email || !password) {
      alert('Ingresa correo y contraseña');
      return;
    }

    // 2. Validar si existe usuario
    if (!user) {
      alert('No hay usuario registrado');
      return;
    }

    // 3. Comparar credenciales
    if (email === user.email && password === user.password) {
      alert('Bienvenido');
      router.replace('/(tabs)/explore');
    }
    else {
      alert('Credenciales incorrectas');
    }
  };

  const handleRegister = () => {
    // console.log('Entró a handleRegister');
    // console.log(email, password, confirmPassword);

    // 1. Validar campos vacíos
    if (!email || !password || !confirmPassword) {
      alert('Completa todos los campos');
      return;
    }

    // 2. Validar contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const registeredEmail = email;

    // 3. Guardar usuario
    setUser({
      email,
      password,
    });

    alert('Cuenta creada correctamente');

    // 4. Limpiar campos
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Restaura el email escrito para facilitar el login
    setEmail(registeredEmail);

    // 5. Volver a login
    setIsRegister(false);
  };

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
          value={email}
          onChangeText={setEmail}

          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry

          style={styles.input}
          placeholderTextColor="#999"
        />


        {isRegister && (
          <TextInput
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry

            style={styles.input}
            placeholderTextColor="#999"
          />
        )}

        <Pressable onPress={isRegister ? handleRegister : handleLogin}
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
