import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Pressable } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { Fonts } from '@/constants/theme';
import { exercises } from '@/data/exercises';

type Exercise = {
  id: number;
  name: string;
  description: string;
  image: string;
};


export default function TabTwoScreen() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  // console.log('Ejercicios:', exercises);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}

      headerImage={
        <Image
          source={require('@/assets/images/FitnessApp-2.png')}
          style={styles.headerImage}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>

      <View style={styles.grid}>
        {exercises.map((item) => (

          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => setSelectedExercise(item)}
          >
            <View style={styles.cardInner}>
              <Image
                source={item.image}
                style={styles.image}
              />
              <ThemedText>{item.name}</ThemedText>
            </View>

          </Pressable>

        ))}

        {selectedExercise && (
          <ThemedText>Seleccionado: {selectedExercise.name}</ThemedText>
        )}
      </View>

    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({

  headerImage: {
    width: 300,
    height: 300,
    bottom: -50,
    resizeMode: 'contain',
    position: 'absolute',
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  card: {
    width: '33.33%', //Divide el espacio en 3 columnas exactas.
    padding: 3, //Crea el espacio entre columnas (simula el gap)
  },

  cardInner: {
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 12,

    padding: 12,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 70,
    borderRadius: 8,
  },
});
