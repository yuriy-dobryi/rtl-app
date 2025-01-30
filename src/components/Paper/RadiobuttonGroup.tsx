import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

const RadiobuttonGroup = () => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
      <View style={styles.container}>
        <RadioButton.Item label="First item" value="first" mode="android" />
        <Divider style={{ backgroundColor: 'black' }} />
        <RadioButton.Item label="Second item" value="second" mode="android" />
      </View>
    </RadioButton.Group>
  );
};

export default RadiobuttonGroup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
