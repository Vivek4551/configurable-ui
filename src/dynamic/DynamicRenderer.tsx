import { Image, Text, View } from 'react-native';
import type { LayoutConfig } from './types';

// ponytail: RN's own `gap` style counts toward line-overflow, so two 50%-wide
// items + gap wrap early. Using negative margin on the container + matching
// padding on each child keeps percentage widths exact regardless of gap.
export default function DynamicRenderer({ config, sized = true }: { config: LayoutConfig; sized?: boolean }) {
  const layoutStyle = sized
    ? {
        flexGrow: config.flexGrow ?? (config.width ? 0 : 1),
        flexShrink: 1,
        flexBasis: config.width ?? 0,
        minWidth: config.minWidth,
      }
    : { flexGrow: 1, flexShrink: 1 };

  switch (config.type) {
    case 'text':
      return <Text style={[layoutStyle, config.style]}>{config.text}</Text>;
    case 'image':
      return <Image source={{ uri: config.source }} style={[layoutStyle, config.style]} />;
    case 'spacer':
      return <View style={[layoutStyle, config.style]} />;
    case 'card':
    case 'group': {
      const half = (config.gap ?? 0) / 2;
      const flexDirection = config.flexDirection ?? (config.type === 'group' ? 'row' : 'column');
      // wrapping only makes sense for row-direction reflow — wrapping a column
      // with no fixed height collapses it (Yoga has no cross size to wrap against)
      const isRow = flexDirection === 'row' || flexDirection === 'row-reverse';
      const flexWrap = config.wrap === undefined ? (isRow ? 'wrap' : 'nowrap') : config.wrap ? 'wrap' : 'nowrap';
      return (
        <View
          style={[
            layoutStyle,
            {
              flexDirection,
              flexWrap,
              justifyContent: config.justifyContent,
              alignItems: config.alignItems,
              margin: -half,
            },
            config.style,
          ]}
        >
          {config.children?.map((child, i) => (
            <View
              key={i}
              style={{
                padding: half,
                // equal-split (basis 0, grow 1) only makes sense for row reflow with
                // no explicit width; a column's auto height must hug its content, so
                // basis defaults to 'auto' there — flexBasis 0 would collapse it to 0
                flexGrow: child.flexGrow ?? (child.width !== undefined ? 0 : isRow ? 1 : 0),
                flexShrink: 1,
                flexBasis: child.width ?? (isRow ? 0 : 'auto'),
                minWidth: child.minWidth,
              }}
            >
              <DynamicRenderer config={child} sized={false} />
            </View>
          ))}
        </View>
      );
    }
    default:
      return null;
  }
}
