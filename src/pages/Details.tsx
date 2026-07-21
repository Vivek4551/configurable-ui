import { ScrollView, StyleSheet, Text } from 'react-native';
import DynamicRenderer from '../dynamic/DynamicRenderer';
import layout from '../dynamic/layout.example.json';
import type { LayoutConfig } from '../dynamic/types';

function Details() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Details</Text>
      <DynamicRenderer config={layout as LayoutConfig} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Details;
