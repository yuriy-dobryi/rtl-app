import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Portal, Snackbar } from 'react-native-paper';

const SnackbarExample = () => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar} textColor="white">
        {visible ? 'Hide' : 'Show'}
      </Button>
      <Portal>
        <Snackbar
          visible={visible}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
          onIconPress={onDismissSnackBar}
          onDismiss={onDismissSnackBar}
          duration={4000}>
          Hey there! I'm a Snackbar.
        </Snackbar>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackbarExample;
