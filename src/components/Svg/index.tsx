// Two approaches to display SVG icons:
// 1. react-native-svg: manually transform the .svg file using external tools and copy the code into .tsx icon component.
// 2. react-native-svg-transformer: directly import .svg files as components (ensure declarations.d.ts is configured). To change the icon color, use the reserved keyword "currentColor" instead of a specific color in the .svg file.

import { StyleSheet, View } from 'react-native';

import ShareTsx from '~/assets/icons/Share';
import ShareSvg from '~/assets/icons/Share/share.svg';

const SvgExample = () => {
  return (
    <View style={styles.container}>
      <ShareSvg width={38} height={38} color="#00CDD1" />
      <ShareTsx width={26} height={26} stroke="#00CDD1" />
    </View>
  );
};

export default SvgExample;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
  },
});
