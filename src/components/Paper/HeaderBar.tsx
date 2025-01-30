import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Portal, type AppbarProps } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';

const HIT_SLOP = 10;

const HeaderBar = (props: Omit<AppbarProps, 'children'>) => {
  return (
    <Portal>
      <Appbar.Header style={styles.container} {...props}>
        <Appbar.BackAction
          onPress={() => {}}
          style={styles.icon}
          hitSlop={HIT_SLOP}
        />
        <Appbar.Content title="Header title" style={styles.titleView} />
        <View style={{ flex: 1 }} />
        <View style={styles.row}>
          <Appbar.Action
            icon={() => <Feather name="search" size={22} color="black" />}
            onPress={() => {}}
            style={styles.icon}
            hitSlop={HIT_SLOP}
          />
          <Appbar.Action
            icon={() => <Feather name="share" size={22} color="black" />}
            onPress={() => {}}
            style={styles.icon}
            hitSlop={HIT_SLOP}
          />
        </View>
      </Appbar.Header>
    </Portal>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingLeft: 6,
    paddingRight: 8,
    backgroundColor: '#FFD7DB',
  },
  titleView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 16,
  },
  icon: {
    width: 'auto',
    margin: 0,
  },
});
