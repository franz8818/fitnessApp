import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { useState } from 'react';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import CardItem from '@/components/ui/card-item';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { muscles } from '@/data/muscles';

type Muscle = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export default function MusclesScreen() {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  //Generar un array de fechas para el carrusel
  const getDates = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <View style={{ flex: 1 }}>

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#dfecf1', dark: '#dfecf1' }}
        headerImage={
          <Image
            source={
              selectedMuscle
                ? selectedMuscle.image
                : require('@/assets/images/FitnessApp-2.png')
            }
            style={styles.headerImage}
          />
        }>

        {selectedMuscle && (
          <View>
            <ThemedText type="title" style={styles.sectionTitle}>
              Fecha
            </ThemedText>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {getDates().map((date, index) => {
                const isSelected =
                  date.toDateString() === selectedDate.toDateString();

                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedDate(date)}
                    style={[
                      styles.dateItem,
                      isSelected && styles.dateItemActive
                    ]}
                  >
                    <ThemedText style={isSelected && { color: '#fff' }}>
                      {date.getDate()}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {selectedMuscle && (
          <View style={styles.formContainer}>
            <ThemedText style={styles.label}>Notas</ThemedText>

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="¿Cómo trabajaste este músculo hoy?"
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            <Pressable style={styles.saveButton}>
              <ThemedText style={styles.saveButtonText}>
                Guardar sesión
              </ThemedText>
            </Pressable>
          </View>
        )}

        {selectedMuscle && (
          <>
            <ThemedText type="title" style={styles.sectionTitle}>
              Descripción
            </ThemedText>

            <ThemedText style={styles.descriptionContainer}>
              {selectedMuscle.description}
            </ThemedText>
          </>
        )}

        {!selectedMuscle && (
          <>
            <ThemedText type="title" style={styles.sectionTitle}>
              Explora los músculos
            </ThemedText>

            <ThemedText style={styles.descriptionContainer}>
              Conoce los principales grupos musculares y enfoca mejor tu entrenamiento.
            </ThemedText>

            <View style={styles.grid}>
              {muscles.map((item) => (
                <CardItem
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  onPress={() => setSelectedMuscle(item)}
                />
              ))}
            </View>
          </>
        )}

      </ParallaxScrollView>

      {selectedMuscle && (
        <Pressable
          onPress={() => setSelectedMuscle(null)}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.7 }
          ]}
        >
          <ThemedText>
            <IconSymbol name="chevron.left" size={20} color="#fff" />
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

  sectionTitle: {
    marginTop: 10,
    paddingHorizontal: 8,
    fontSize: 28,
  },

  descriptionContainer: {
    fontSize: 18,
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
    marginTop: 5,
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

  saveButton: {
    marginTop: 10,
    backgroundColor: '#153152',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  dateItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginRight: 8,
  },

  dateItemActive: {
    backgroundColor: '#153152',
  },

});
