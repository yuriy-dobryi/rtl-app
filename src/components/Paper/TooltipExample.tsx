import * as React from 'react';
import { IconButton, Tooltip } from 'react-native-paper';

const TooltipExample = () => (
  <Tooltip title="Selected Camera" enterTouchDelay={400}>
    <IconButton icon="camera" iconColor="green" size={24} onPress={() => {}} />
  </Tooltip>
);

export default TooltipExample;
