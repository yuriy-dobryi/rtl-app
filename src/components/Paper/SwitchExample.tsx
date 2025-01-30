import * as React from 'react';
import { Switch } from 'react-native-paper';

const SwitchExample = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Switch
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      trackColor={{ false: '#FFD7DB', true: 'blue' }}
      ios_backgroundColor={'#FFD7DB'}
    />
  );
};

export default SwitchExample;
