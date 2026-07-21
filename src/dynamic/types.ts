import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

interface Layout {
  /** e.g. '50%', 200. Combined with minWidth this drives the wrap behavior. */
  width?: ViewStyle['width'];
  /** below this width the node wraps onto its own line */
  minWidth?: number;
  flexGrow?: number;
}

export type LayoutConfig =
  | (Layout & { type: 'text'; text: string; style?: TextStyle })
  | (Layout & { type: 'image'; source: string; style?: ImageStyle })
  | (Layout & { type: 'spacer'; style?: ViewStyle })
  | (Layout & {
      type: 'card' | 'group';
      flexDirection?: ViewStyle['flexDirection'];
      /** spacing between children; wrapped lines still line up exactly (no flex `gap` overflow) */
      gap?: number;
      /** default true — children wrap onto new lines when they don't fit */
      wrap?: boolean;
      /** how children are aligned along the main axis, per wrapped line — e.g. 'center' for a lone item that doesn't fill its line */
      justifyContent?: ViewStyle['justifyContent'];
      alignItems?: ViewStyle['alignItems'];
      style?: ViewStyle;
      children?: LayoutConfig[];
    });
