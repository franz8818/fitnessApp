import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#dfecf1', dark: '#6B7280' }}
    
      headerImage={
        <Image
          source={require('@/assets/images/FitnessApp-2.png')}
          style={styles.fitnessAppLogo}
        />
      }>

        <ThemedView style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', gap: 10, }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Construye el cuerpo que quieres, sin complicaciones.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Registra tus entrenamientos, sigue tu progreso y mantén el control total de tu rutina desde un solo lugar.</ThemedText>
        <ThemedText style={styles.description}>
          Registrate o dale click a Demo para probar la app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
        </Link>
      </ThemedView>
      
      <ThemedView style={styles.buttonsContainer}>
  
  <TouchableOpacity 
    style={styles.primaryButton}
    onPress={() => router.push('/auth')}
  >
    <ThemedText style={styles.primaryButtonText}>
      Iniciar sesión
    </ThemedText>
  </TouchableOpacity>

  <TouchableOpacity 
    style={styles.secondaryButton}
    onPress={() => router.push('/exercises')}
  >
    <ThemedText style={styles.secondaryButtonText}>
      Demo
    </ThemedText>
  </TouchableOpacity>

</ThemedView>


      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 20,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
    maxWidth: 320,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
  },
  stepContainer: {
    gap: 10,
    marginBottom: 8,
  },
  fitnessAppLogo: {
    height: 250,
    width: 225,
    alignSelf: 'center',
  },

  // Buttons
  buttonsContainer: {
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  gap: 25,
  paddingHorizontal: 30,
},

primaryButton: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: '#111',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 10,
  alignItems: 'center',
},

primaryButtonText: {
  color: '#fff',
  fontWeight: '600',
},

secondaryButton: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#999',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 10,
  alignItems: 'center',
},

secondaryButtonText: {
  color: '#999',
  fontWeight: '500',
},

});
