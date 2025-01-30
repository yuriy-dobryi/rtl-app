import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import type { StackNavigationProp } from '@react-navigation/stack';

import MainStack from './MainStack';
import { ROUTES } from './constants';

export type RootStackParamList = {
  [ROUTES.MAIN]: undefined;
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={ROUTES.MAIN}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <RootStack.Screen name={ROUTES.MAIN} component={MainStack} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* <ToastStyled /> */}
    </>
  );
};

export default RootNavigation;
