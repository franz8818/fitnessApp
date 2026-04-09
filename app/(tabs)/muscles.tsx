import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Platform, StyleSheet } from 'react-native';

export default function MusclesScreen() {
  return (
    <ThemedView>
      <ThemedText type="title">Músculos</ThemedText>
      <ThemedText>Aquí irá la lista de músculos</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
