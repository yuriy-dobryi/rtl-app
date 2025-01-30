import { useState } from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Banner, Portal } from 'react-native-paper';

import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';

const BannerTransaction = () => {
  const [visible, setVisible] = useState(true);
  const { height } = useWindowDimensions();

  return (
    <Portal>
      <ThemedView
        style={[styles.container, { height }]}
        pointerEvents="box-none">
        <Banner
          visible={visible}
          contentStyle={{ backgroundColor: 'gray' }}
          actions={[
            {
              label: 'Fix it',
              onPress: () => setVisible(false),
            },
            {
              label: 'Learn more',
              onPress: () => setVisible(false),
            },
          ]}
          icon={({ size = 20 }) => (
            <Image
              source={{
                uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          <ThemedText>
            There was a problem processing a transaction on your credit card.
          </ThemedText>
        </Banner>
      </ThemedView>
    </Portal>
  );
};

export default BannerTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
