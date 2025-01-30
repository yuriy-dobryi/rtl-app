import React from 'react';
import { StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import { ROUTES } from '../constants';
import SettingsBase from '~/screens/SettingsBase';
import HomeBase from '~/screens/HomeBase';

export type TabsParamList = {
  [ROUTES.HOME_BASE]: undefined;
  [ROUTES.SETTINGS_BASE]: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const renderTabBar = ({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) => (
  <BottomNavigation.Bar
    navigationState={state}
    safeAreaInsets={insets}
    onTabPress={({ route, preventDefault }) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (event.defaultPrevented) {
        preventDefault();
      } else {
        navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key,
        });
      }
    }}
    renderIcon={({ route, focused, color }) => {
      const { options } = descriptors[route.key];
      if (options.tabBarIcon) {
        return options.tabBarIcon({ focused, color, size: 30 });
      }
      return null;
    }}
    getLabelText={({ route }) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? (options.tabBarLabel as string)
          : options.title !== undefined
            ? options.title
            : route.name;
      return label;
    }}
    getBadge={() => 4}
    activeIndicatorStyle={styles.tabIconActive}
    style={styles.tabBar}
  />
);

const Tabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={ROUTES.HOME_BASE}
        backBehavior="history"
        tabBar={renderTabBar}>
        <Tab.Screen
          name={ROUTES.HOME_BASE}
          component={HomeBase}
          options={{
            headerShown: true,
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.SETTINGS_BASE}
          component={SettingsBase}
          options={{
            headerShown: true,
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    backgroundColor: '#FFB5E3',
    borderTopColor: 'transparent',
  },
  tabIconActive: {
    paddingVertical: 20,
    backgroundColor: '#CC91B5',
  },
});
