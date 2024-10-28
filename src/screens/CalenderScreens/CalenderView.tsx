import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function CalenderView({Navigation, route}) {
  const data = route?.params?.item;
  return (
    <View>
      <Text style={styles?.texts}>Employee Name : {data?.empName}</Text>
      <Text style={styles?.texts}>Absent Days :{data?.absent}</Text>
      <Text style={styles?.texts}>Present Days : {data?.present}</Text>
      <Text style={styles?.texts}>Payment :{data?.payment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  texts: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
});
