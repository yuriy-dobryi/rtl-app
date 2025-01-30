import * as React from 'react';
import { ToggleButton } from 'react-native-paper';

const ToggleButtonRow = () => {
  const [value, setValue] = React.useState('left');

  return (
    <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
      <ToggleButton icon="format-align-left" iconColor="green" value="left" />
      <ToggleButton icon="format-align-right" iconColor="green" value="right" />
    </ToggleButton.Row>
  );
};

export default ToggleButtonRow;
