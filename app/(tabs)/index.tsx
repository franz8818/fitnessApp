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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    top: 25,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    top: 30,
    marginBottom: 40,
  },
  description: {
    textAlign: 'center',
    top: 0,
    opacity: 0.7,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  fitnessAppLogo: {
    height: 190,
    width: 350,
    bottom: 0,
    left: 30,
    position: 'absolute',
  },
});
