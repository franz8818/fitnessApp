import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function MusclesScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="figure.arms.open"
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded }}>
          Músculos
        </ThemedText>
      </ThemedView>

      <ThemedText>
        Aquí podrás explorar los diferentes grupos musculares.
      </ThemedText>

      <Collapsible title="Pecho">
        <ThemedText>
          Ejercicios enfocados en el desarrollo del pecho.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Espalda">
        <ThemedText>
          Ejercicios para fortalecer la espalda.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Piernas">
        <ThemedText>
          Trabajo completo de tren inferior.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Brazos">
        <ThemedText>
          Bíceps y tríceps para mejorar fuerza y estética.
        </ThemedText>
      </Collapsible>

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
});
