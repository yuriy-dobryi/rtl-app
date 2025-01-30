import { View, type ViewProps } from 'react-native';

type Props = ViewProps & {};

const ThemedView = ({ style, ...rest }: Props) => {
  return <View style={[style]} {...rest} />;
};
export default ThemedView;
