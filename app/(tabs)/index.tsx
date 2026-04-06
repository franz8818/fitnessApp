import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

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

        <ThemedView style={{ flex: 1, justifyContent: 'center',  alignItems: 'center', gap: 20, }}>
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
      <ThemedView style={styles.stepContainer}>
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
    gap: 20,
    marginBottom: 8,
  },
  fitnessAppLogo: {
    height: 300,
    width: 450,
    alignSelf: 'center',
  },
});
