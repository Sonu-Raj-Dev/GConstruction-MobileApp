import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ContsctScreens, HomeScreens,CompanyMasterDetails,EmployeeDetails} from './StackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreens/Home';
import {NavigationContainer} from '@react-navigation/native';

export default function Routing() {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreens} />
      <Drawer.Screen name="Company Master" component={CompanyMasterDetails} />
      <Drawer.Screen name="Employee Master" component={EmployeeDetails} />
      <Drawer.Screen name="Contact" component={ContsctScreens} />
    </Drawer.Navigator>
  );
}

// const DrawerNavigator = () => {
//   const Drawer = createDrawerNavigator();
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={Home} />
//       {/* <Drawer.Screen name="Contact" component={Contact} /> */}
//     </Drawer.Navigator>
//   );
// };

const styles = StyleSheet.create({});
