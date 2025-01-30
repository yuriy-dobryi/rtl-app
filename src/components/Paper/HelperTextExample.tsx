import * as React from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const HelperTextExample = () => {
  const [text, setText] = React.useState('');

  const hasErrors = () => {
    return !text.includes('@');
  };

  return (
    <View>
      <TextInput label="Email" value={text} onChangeText={setText} />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
    </View>
  );
};

export default HelperTextExample;
