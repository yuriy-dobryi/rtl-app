import * as React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';

const ModalExample = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            backgroundColor: visible ? 'rgba(0,0,0,.5)' : 'transparent',
          }}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button onPress={showModal}>Show</Button>
    </>
  );
};

export default ModalExample;
