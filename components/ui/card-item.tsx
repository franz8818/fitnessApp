import { View, Pressable, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';

type Props = {
  name: string;
  image: any;
  onPress: () => void;
};

export default function CardItem({ name, image, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardInner}>
        <Image source={image} style={styles.image} />
        <ThemedText>{name}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    
  card: {
    width: '33.33%',
    padding: 3,
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