import { Image } from 'expo-image';
import { Pressable, StyleSheet, View, TextInput } from 'react-native';

import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import CardItem from '@/components/ui/card-item';

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
  // console.log('Ejercicios:', exercises);

  return (

    <View style={{ flex: 1 }}>

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <Image
            source={
              selectedExercise
                ? selectedExercise.image
                : require('@/assets/images/FitnessApp-2.png')
            }
            style={styles.headerImage}
          />
        }>

        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{ fontFamily: Fonts.rounded }}
          >
            {selectedExercise ? selectedExercise.name : 'Ejercicios'}
          </ThemedText>
        </ThemedView>

        <ThemedText style={styles.descriptionContainer}>
          {selectedExercise
            ? selectedExercise.description
            : 'Explora los ejercicios disponibles y registra tus entrenamientos de forma sencilla.'}
        </ThemedText>

        {!selectedExercise && (
          <View style={styles.grid}>
            {exercises.map((item) => (
              <CardItem
                key={item.id}
                name={item.name}
                image={item.image}
                onPress={() => setSelectedExercise(item)}
              />
            ))}
          </View>

        )}

        {selectedExercise && (
          <View style={styles.formContainer}>

            <ThemedText style={styles.label}>Fecha</ThemedText>
            <ThemedText>Hoy</ThemedText>

            <ThemedText style={styles.label}>Serie 1</ThemedText>
            <TextInput style={styles.input} placeholder="Reps" />

            <ThemedText style={styles.label}>Serie 2</ThemedText>
            <TextInput style={styles.input} placeholder="Reps" />

            <ThemedText style={styles.label}>Serie 3</ThemedText>
            <TextInput style={styles.input} placeholder="Reps" />

            <ThemedText style={styles.label}>Serie 4</ThemedText>
            <TextInput style={styles.input} placeholder="Reps" />

            <ThemedText style={styles.label}>RIR</ThemedText>
            <TextInput style={styles.input} placeholder="RIR" />

            <ThemedText style={styles.label}>Notas</ThemedText>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Notas..."
              multiline
            />

          </View>
        )}

      </ParallaxScrollView >

      {selectedExercise && ( //Solo aparece si estas en detallaes de un ejercicio
        <Pressable
          onPress={() => setSelectedExercise(null)}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.7 }
          ]}
        >

          <ThemedText><IconSymbol name="chevron.left" size={20} color="#fff" />
          </ThemedText>
        </Pressable>
      )}
    </View>
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
    marginTop: 25,
    paddingHorizontal: 8,
  },

  descriptionContainer: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 8,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 100,

    width: 44,
    height: 44,
    borderRadius: 22,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.35)',

    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // sombra Android
    elevation: 5,
  },

  formContainer: {
  marginTop: 20,
  paddingHorizontal: 12,
  gap: 10,
},

label: {
  fontSize: 14,
  opacity: 0.7,
},

input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 10,
  fontSize: 16,
},


});
