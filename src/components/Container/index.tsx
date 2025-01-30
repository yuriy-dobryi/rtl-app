import type { ReactNode } from 'react';
import type { DimensionValue } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { isNumber } from 'lodash';

import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import { Colors } from '~/theme';
import Spinner from '../Spinner';

interface Props extends SafeAreaViewProps {
  type?: 'header' | 'content';
  safeAreaTop?: boolean;
  loading?: boolean;
  paddingVertical?: DimensionValue;
  children: ReactNode;
}

const containerTheme = StyleSheet.create({
  header: {
    backgroundColor: Colors.light.black,
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    backgroundColor: Colors.light.bgContent,
  },
});

const Container = ({
  type = 'content',
  safeAreaTop,
  loading,
  paddingVertical,
  style,
  children,
  ...rest
}: Props) => (
  <SafeAreaView
    edges={safeAreaTop ? ['top', 'left', 'right'] : ['left', 'right']}
    style={[
      containerTheme[type],
      isNumber(paddingVertical) && {
        paddingVertical: moderateScale(paddingVertical),
      },
      style,
    ]}
    {...rest}>
    {children}
    {loading && <Spinner />}
  </SafeAreaView>
);

export default Container;
