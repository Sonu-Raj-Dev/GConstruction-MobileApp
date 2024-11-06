import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function EmployeeMaster() {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  
  const companies = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ];

  console.log(companies);
  const handleSave = () => {
    // Handle save logic here
    console.log('Employee Data:', { employeeName, employeeEmail, employeePhone, selectedCompany });
    // Reset form or navigate to another screen after save
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Employee Master Page</Text> */}

      <Text style={styles.label}>Employee Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter employee name"
        placeholderTextColor="#888"
        value={employeeName}
        onChangeText={setEmployeeName}
      />

      <Text style={styles.label}>Employee Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter employee email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={employeeEmail}
        onChangeText={setEmployeeEmail}
      />

      <Text style={styles.label}>Employee Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter employee phone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={employeePhone}
        onChangeText={setEmployeePhone}
      />

      <Text style={styles.label}>Select Company</Text>
      <Picker
        selectedValue={selectedCompany}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCompany(itemValue)}
      >
        <Picker.Item label="Select Company" value="" />
        {companies.map((company) => (
          <Picker.Item key={company.id} label={company.name} value={company.id} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} color="#6200EE" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
