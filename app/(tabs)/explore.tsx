//Componentes
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

//Hooks
import { useState, useEffect } from 'react';

//Componentes personalizados
import ParallaxScrollView from '@/components/parallax-scroll-view';
import CardItem from '@/components/ui/card-item';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

//Firebase
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

//Datos
import { exercises } from '@/data/exercises'; // Datos de ejercicios locales (strings)


//Tipos de datos
type Exercise = {
  id: string; // Firestore usa id como string
  name: string;
  description: string;
  image: any; //ReactNative usa números internos para las imagenes locales, por eso se deja como any
};

type EjercicioDB = {
  id: string;
  name: string;
  description: string;
  imageKey: string;
};

type EntrenamientosDB = {
  id: string;
  exercise: string;
  notes: string;
  date: string; // Guardamos la fecha como string en formato YYYY-MM-DD
};

// Componente principal de la pantalla de exploración
export default function TabTwoScreen() {

  // Memoria del componente -> Qué ejercicio seleccionó el usuario -> React vuelve a renderizar.
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  // console.log('Ejercicios:', exercises);

  //CARRUSEL DE FECHAS
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Carrusel de fechas

  //NOTAS
  const [notes, setNotes] = useState('');
  // Guardar Notas

  // Variable con datos, Función que actualiaza valor = Define el valor inicial del arreglo (any=cualquier tipo de dato)
  const [entrenamientos, setEntrenamientos] = useState<EntrenamientosDB[]>([]);

  // CONEXIÓN CON FIREBASE - Se obtiene la lista de ejercicios desde Firestore. - READ
  const [ejerciciosDB, setEjerciciosDB] = useState<EjercicioDB[]>([]);


  //IMAGENES(objeto) - Se obtienen de manera local con un mapeo de datos. DEBE EXISTIR EN LA CARPETA DE ASSETS.
  const images: { [key: string]: any } = {
    dominadas: require('@/assets/ejercicios/dominadas.png'),
    fondos: require('@/assets/ejercicios/fondos.png'),
    sentadillas: require('@/assets/ejercicios/sentadillas.png'),
    caminadora: require('@/assets/ejercicios/caminadora.png'),
    press_banca: require('@/assets/ejercicios/press_banca.png'),
    elevaciones: require('@/assets/ejercicios/elevaciones_laterale_con_mancuernas.png'),
    empuje: require('@/assets/ejercicios/empuje_de_caderas.png'),
    curl_femoral: require('@/assets/ejercicios/femoral_tumbado_en_maquina.png'),
    curl_biceps: require('@/assets/ejercicios/curl_biceps.png'),
  };


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


  // Función para guardar el entrenamiento en Firestore
  const guardarEntrenamiento = async () => {
    console.log('Botón presionado');
    console.log('Ejercicio:', selectedExercise);
    console.log('Notas:', notes);
    console.log('Fecha:', selectedDate.toISOString().split('T')[0]);

    // Agregar el nuevo entrenamiento a la base de datos de Firestore - CREATE
    try {
      await addDoc(collection(db, 'entrenamientos'), {
        exercise: selectedExercise?.name,
        notes: notes,
        date: selectedDate.toISOString().split('T')[0],
      });

      obtenerEntrenamientos(); // Actualizar la lista de entrenamientos después de guardar

      console.log('Guardado en Firebase');
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerEjercicios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'ejercicios'));

      const lista = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<EjercicioDB, 'id'>;

        return {
          id: doc.id,
          ...data
        };
      });

      setEjerciciosDB(lista);
    } catch (error) {
      console.log(error);
    }
  };


  // Función para obtener los entrenamientos registrados por el usuario desde Firestore - READ
  const obtenerEntrenamientos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'entrenamientos'));

      const lista = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<EntrenamientosDB, 'id'>;

        return {
          id: doc.id,
          ...data
        };
      });

      setEntrenamientos(lista);

    } catch (error) {
      console.log(error);
    }
  };

  // Función para eliminar un entrenamiento de Firestore - DELETE
  const eliminarEntrenamiento = async (id: string) => {
    try {

      await deleteDoc(doc(db, 'entrenamientos', id));

      console.log('Entrenamiento eliminado');

      obtenerEntrenamientos();

    } catch (error) {
      console.log(error);
    }
  };

  // useEffect para cargar los ejercicios y entrenamientos al montar el componente
  useEffect(() => {
    obtenerEjercicios();
    console.log();
    obtenerEntrenamientos();
  }, []); //Mostrar solo la primera vez que se monta el componente


  return (

    <View style={{ flex: 1 }}>

      <ParallaxScrollView

        //HEADER - Se desactivo para este proyecto el darkMode
        headerBackgroundColor={{ light: '#dfecf1', dark: '#dfecf1' }}

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

        {selectedExercise && ( // SCROLL DE FECHAS - Solo aparece si estas en detalles de un ejercicio.
          <View>

            <ThemedText type="title" style={styles.monthTitle}>
              {selectedDate.toLocaleDateString('es-ES', { month: 'long' })}
            </ThemedText>


            {/* CARRUSEL */}
            <ScrollView style={styles.carruselContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
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

        {selectedExercise && ( // FORM DE NOTAS - Si hay un ejercicio seleccionado, muestra el formulario de notas.
          <View style={styles.formContainer}>

            <ThemedText style={styles.label}>Notas</ThemedText>

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="¿Cómo te fue hoy?"
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            <Pressable
              onPress={guardarEntrenamiento}
              style={({ pressed }) => [
                styles.saveButton,
                pressed && { opacity: 0.7 }
              ]}
            >
              <ThemedText style={styles.saveButtonText}>
                Guardar sesión
              </ThemedText>
            </Pressable>

          </View>
        )}

        {selectedExercise && (
          <View style={styles.formContainer}>

            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Historial
            </ThemedText>

            {entrenamientos
              .filter(
                item =>
                  item.exercise === selectedExercise.name &&
                  item.date === selectedDate.toISOString().split('T')[0]
              )
              .map((item) => (
                <View
                  key={item.id}
                  style={styles.entrenamientosView}
                >

                  <View style={{ flex: 1 }}>

                    <ThemedText>
                      {item.notes}
                    </ThemedText>

                    <ThemedText>
                      {item.date.split('T')[0]}
                    </ThemedText>

                  </View>

                  <Pressable style={styles.deleteButton}
                    onPress={() => eliminarEntrenamiento(item.id)}
                  >
                    <ThemedText>
                      <IconSymbol
                        name="trash"
                        size={18}
                        color="#153152"
                      />
                    </ThemedText>

                  </Pressable>

                </View>
              ))}

          </View>
        )}

        {selectedExercise && ( // DESCRIPCIÓN DEL EJERCICIO - Si hay un ejercicio seleccionado, muestra su descripción.
          <>
            <ThemedText type="title" style={styles.sectionTitle}>
              Descripción
            </ThemedText>

            <ThemedText style={styles.descriptionContainer}>
              {selectedExercise
                ? selectedExercise.description
                : 'Explora los ejercicios disponibles y registra tus entrenamientos de forma sencilla.'}
            </ThemedText>
          </>
        )}

        {!selectedExercise && ( // LISTADO DE EJERCICIOS - Si no hay ejercicio seleccionado, muestra el listado de ejercicios.
          <>
            <ThemedText type="title" style={styles.sectionTitle}>
              Explora los ejercicios
            </ThemedText>

            <ThemedText style={styles.descriptionContainer}>
              Descubre cada ejercicio y lleva el control de tu entrenamiento día a día.
            </ThemedText>

            <View style={styles.grid}>
              {ejerciciosDB.map((item) => (
                <CardItem
                  key={item.id}
                  name={item.name}
                  image={images[item.imageKey] || require('@/assets/images/FitnessApp-2.png')} // fallback - Si no encuentra la imagen, muestra una por defecto.
                  onPress={() =>
                    setSelectedExercise({
                      id: item.id, // o déjalo string si luego ajustas el tipo
                      name: item.name,
                      description: item.description,
                      image: images[item.imageKey] || require('@/assets/images/FitnessApp-2.png')
                    })
                  }
                />
              ))}
            </View>
          </>
        )}


      </ParallaxScrollView >

      {selectedExercise && ( //BOTÓN DE RETROCEDER - Solo aparece si estas en detalles de un ejercicio. 
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

  sectionTitle: {
    marginTop: 10,
    paddingHorizontal: 8,
    fontSize: 28, // opcional (ya viene con type="title")
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

  entrenamientosView: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,

    flexDirection: 'row', // Para colocar la fecha y el botón en la misma línea
    justifyContent: 'space-between', // Para separar la fecha y el botón a los extremos
    alignItems: 'center', // Para alinear verticalmente la fecha y el botón
  },

  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
  },

  dateItem: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginRight: 12,
    marginTop: 10,
  },

  dateItemActive: {
    backgroundColor: '#153152',
  },

  carruselContainer: {
    marginTop: 10,
    padding: 6,
  },

  monthTitle: {
    fontSize: 28,
    textTransform: 'capitalize',
    marginTop: 10,
    paddingHorizontal: 8,
  },

});