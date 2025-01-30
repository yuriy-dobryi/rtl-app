import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const SegmentedButtonsExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        // multiSelect
        buttons={[
          {
            value: 'walk',
            label: 'Walking',
            uncheckedColor: 'white',
            checkedColor: 'black',
          },
          {
            value: 'train',
            label: 'Transit',
            uncheckedColor: 'white',
            checkedColor: 'black',
          },
          {
            value: 'drive',
            label: 'Driving',
            uncheckedColor: 'white',
            checkedColor: 'black',
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SegmentedButtonsExample;
