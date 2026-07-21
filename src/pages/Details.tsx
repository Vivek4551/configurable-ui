import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import DynamicRenderer from '../dynamic/DynamicRenderer';
import layout from '../dynamic/layout.example.json';
import type { LayoutConfig } from '../dynamic/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function Details({ route }: Props) {
  const { city, state } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text>city: {city}</Text>
      <Text>state: {state}</Text>
      <DynamicRenderer config={layout as LayoutConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Details;
