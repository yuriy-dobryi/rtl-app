import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu } from 'react-native-paper';

const DropdownSelector = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} textColor="white">
            Show menu
          </Button>
        }>
        <Menu.Item leadingIcon="redo" onPress={closeMenu} title="Redo" />
        <Menu.Item leadingIcon="undo" onPress={closeMenu} title="Undo" />
        <Menu.Item
          leadingIcon="content-cut"
          onPress={closeMenu}
          title="Cut"
          disabled
        />
        <Menu.Item
          leadingIcon="content-copy"
          onPress={closeMenu}
          title="Copy"
          disabled
        />
        <Menu.Item
          leadingIcon="content-paste"
          onPress={closeMenu}
          title="Paste"
          trailingIcon="chevron-right"
        />
      </Menu>
    </View>
  );
};

export default DropdownSelector;
