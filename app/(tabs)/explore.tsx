import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Pressable } from 'react-native';
import { useState } from 'react';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

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
  console.log('Ejercicios:', exercises);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
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

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
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
    borderColor: 'red',
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
