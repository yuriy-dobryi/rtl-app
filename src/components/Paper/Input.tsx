import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = () => {
  return (
    <TextInput
      mode="outlined"
      label="Outlined input"
      placeholder="Type something"
      right={<TextInput.Affix text="right element" />}
    />
  );
};

export default Input;
