/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, View } from 'react-native';
import type { LayoutConfig } from './types';

const isRowDir = (d?: string) => d === 'row' || d === 'row-reverse';

function Leaf({ node }: { node: LayoutConfig }) {
  switch (node.type) {
    case 'text':
      return <Text style={node.style}>{node.text}</Text>;
    case 'image':
      return <Image source={{ uri: node.source }} style={node.style} />;
    case 'spacer':
      return <View style={[styles.fill, node.style]} />;
    case 'card':
    case 'group': {
      const half = (node.gap ?? 0) / 2;
      const flexDirection =
        node.flexDirection ?? (node.type === 'group' ? 'row' : 'column');
      const wrap = node.wrap ?? isRowDir(flexDirection);
      return (
        <View
          style={[
            styles.container,
            {
              flexDirection,
              flexWrap: wrap ? 'wrap' : 'nowrap',
              justifyContent: node.justifyContent,
              alignItems: node.alignItems,
              margin: -half,
            },
            node.style,
          ]}
        >
          {node.children?.map((child, i) => (
            <Cell key={i} node={child} gutter={half} />
          ))}
        </View>
      );
    }
    default:
      return null;
  }
}

function Cell({ node, gutter }: { node: LayoutConfig; gutter: number }) {
  return (
    <View
      style={[
        styles.cell,
        {
          padding: gutter,
          flexBasis: node.width ?? 'auto',
          flexGrow: node.flexGrow ?? (node.width !== undefined ? 0 : 1),
          minWidth: node.minWidth,
        },
      ]}
    >
      <Leaf node={node} />
    </View>
  );
}

export default function DynamicRenderer({ config }: { config: LayoutConfig }) {
  return <Leaf node={config} />;
}

const styles = StyleSheet.create({
  fill: { 
    flex: 1 
  },
  container: { 
    flexGrow: 1, 
    flexShrink: 1 
  },
  cell: { 
    flexShrink: 1 
  },
});
