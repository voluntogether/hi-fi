import React from 'react';
import {Platform} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

import {getHeaderBlurEffect} from '../../utils/designSystem';

export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerTintColor: Colors.primary,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: true,
      headerTransparent: true,
      headerBlurEffect: getHeaderBlurEffect(),
    },
  }),
});

export const tabBarDefaultOptions = (routeName: string): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.grey40,
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
  tabBarIcon: ({focused, color, size}) => (
    <Icon name={getIconName(routeName, focused)} size={size} color={color} />
  ),
});

const getIconName = (routeName: string, focused: boolean): string => {
  if (routeName === 'MainNavigator') {
    return focused ? 'newspaper' : 'newspaper-outline';
  }
  if (routeName === 'ExampleNavigator') {
    return focused ? 'construct' : 'construct-outline';
  }
  if (routeName === 'SettingsNavigator') {
    return focused ? 'cog' : 'cog-outline';
  }

  return 'list';
};
