import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Routing from './Routing';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/HomeScreens/Home';

export default function AppNavigator() {
  const Drawer = createDrawerNavigator();
  // const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Routing />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
