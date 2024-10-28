import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreens/Home';
import Contact from '../screens/ContactScreens/Contact';
import CalenderView from '../screens/CalenderScreens/CalenderView';

const HomeScreens = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Calender" component={CalenderView} />
      {/* <Stack.Screen name='Details' component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};
const ContsctScreens = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ContactScreen" component={Contact} />
      {/* <Stack.Screen name='Details' component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export {HomeScreens, ContsctScreens};

const styles = StyleSheet.create({});
