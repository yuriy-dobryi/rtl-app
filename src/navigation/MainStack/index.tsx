import { createStackNavigator } from '@react-navigation/stack';

import type { NavigatorScreenParams } from '@react-navigation/native';

import { ROUTES } from '../constants';
import Tabs, { type TabsParamList } from '../Tabs';

export type MainStackParamList = {
  [ROUTES.TABS]: NavigatorScreenParams<TabsParamList>;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.TABS}
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
