import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const SettingsBase = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ color: 'white' }}>
        Settings!
      </Text>
    </View>
  );
};

export default SettingsBase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
