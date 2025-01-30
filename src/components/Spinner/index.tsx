import type { ActivityIndicatorProps } from 'react-native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { Colors } from '~/theme';

interface Props extends ActivityIndicatorProps {
  type?: 'contain' | 'cover';
}

const Spinner = ({
  type = 'contain',
  color = Colors.light.white,
  size = 'large',
  style,
  ...rest
}: Props) => (
  <View style={[displayTheme[type], style]}>
    <ActivityIndicator color={color} size={size} {...rest} />
  </View>
);
export default Spinner;

const displayTheme = StyleSheet.create({
  contain: {
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cover: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
