import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import Foundation from '@expo/vector-icons/Foundation';

const DialogActions = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog} buttonColor="#FFD7DB">
        Show Dialog
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon
            icon={({ size, color }) => (
              <Foundation
                name="alert"
                size={size}
                color={color}
                style={{ marginTop: -10 }}
              />
            )}
          />
          <Dialog.Title style={styles.title}>Dialog with Icon</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              This is a dialog with DialogIcon. When icon is displayed you
              should center the header
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ paddingBottom: 6 }}>
            <Button onPress={hideDialog} textColor="red">
              Disagree
            </Button>
            <Button onPress={hideDialog}>Agree</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogActions;

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
  },
});
