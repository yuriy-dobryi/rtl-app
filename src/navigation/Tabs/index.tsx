import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';

import { ROUTES } from '../constants';
import SettingsBase from '~/screens/SettingsBase';
import { Colors } from '~/theme';
import HomeBase from '~/screens/HomeBase';

export type TabsParamList = {
  [ROUTES.HOME_BASE]: undefined;
  [ROUTES.SETTINGS_BASE]: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const Tabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={ROUTES.HOME_BASE}
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarStyle: styles.tabBar,
          tabBarInactiveTintColor: Colors.light.tabBarInactive,
          tabBarActiveTintColor: Colors.light.brand,
        }}>
        <Tab.Screen
          name={ROUTES.HOME_BASE}
          component={HomeBase}
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            headerShown: true,
          }}
        />
        <Tab.Screen
          name={ROUTES.SETTINGS_BASE}
          component={SettingsBase}
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="setting" size={size} color={color} />
            ),
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#22181C',
    borderTopColor: 'transparent',
  },
});
