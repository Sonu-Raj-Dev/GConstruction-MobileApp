import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreens/Home';
import Contact from '../screens/ContactScreens/Contact';
import CalenderView from '../screens/CalenderScreens/CalenderView';
import EmployeeMaster from '../../src/screens/Master/EmployeeMaster';
import CompanyMaster from '../../src/screens/Master/CompanyMaster';

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
const CompanyMasterDetails = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
     <Stack.Screen name="CompanyMaster" component={CompanyMaster} />     
      </Stack.Navigator>
  );
};
const EmployeeDetails = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
     <Stack.Screen name="EmployeeMaster" component={EmployeeMaster} />     
      </Stack.Navigator>
  );
};
export {HomeScreens, ContsctScreens,CompanyMasterDetails,EmployeeDetails};

const styles = StyleSheet.create({});
