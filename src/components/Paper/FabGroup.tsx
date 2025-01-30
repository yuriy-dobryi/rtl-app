import { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

const FabGroup = () => {
  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'calendar-today' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
            labelStyle: { color: 'white' },
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
            labelStyle: { color: 'white' },
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
            labelStyle: { color: 'white' },
          },
        ]}
        color="green"
        backdropColor="rgba(0,0,0,.8)"
        fabStyle={{ backgroundColor: 'yellow' }}
        onStateChange={state => setOpen(state.open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default FabGroup;
