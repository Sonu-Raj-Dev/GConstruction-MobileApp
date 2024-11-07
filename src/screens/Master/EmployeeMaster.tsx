import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Modal, ActivityIndicator, RefreshControl, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import API from '../../global/API';
import { Picker } from '@react-native-picker/picker';

export default function EmployeeMaster() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchCompanies(); // Fetch companies when the component mounts
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API.GetAllEmployee);
      if (response.status === 200) {
        setEmployeeList(response.data.data);
      } else {
        console.error('Error fetching Employees:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching Employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch companies from API
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API.GetAllCompanies);
      if (response.status === 200) {
        setCompanyList(response.data.data);
        // console.log('responsessssss',response);

        // console.log('CCCCCCCCCCCCC', companyList);
      } else {
        console.error('Error fetching companies:', response.data.message || 'Unknown error');
      }

    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEmployee = async () => {
    try {
      setIsSaving(true);
      const url = API.AddEmployee;
      console.log('URLLLLLLLLLLLLLLLLLL', url);
      console.log('Data To Post', selectedEmployee);
      const method = 'post';
      const response = await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: selectedEmployee,
      });

      if (response.status === 200 || response.status === 201) {
        fetchEmployees();
        setIsModalVisible(false);
        setSelectedEmployee({});
      } else {
        console.error('Error saving Employee:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error saving Employee:', error.response ? error.response.data : error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date)) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return '';
  };

  const openModalToEdit = (index) => {
    const employeeToEdit = employeeList[index];

    // Set selected employee along with its company id
    setSelectedEmployee({
      ...employeeToEdit,
      CompanyId: employeeToEdit.CompanyId._id,  // Store the company ID for selection
    });

    setIsModalVisible(true);
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setSelectedEmployee({});
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Employee</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : employeeList.length > 0 ? (
        <FlatList
          style={{ marginBottom: 50 }}
          data={employeeList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.companyItem} onPress={() => openModalToEdit(index)}>
              <Text style={styles.companyText}>🏢 Name: {item.FirstName} {item.LastName}</Text>
              <Text style={styles.companyText}>📆 Date Of Joining: {formatDate(item.createdAt)}</Text>
              <Text style={styles.companyText}>📞 Phone: {item.Phone}</Text>
              <Text style={styles.companyText}>
                🏠 Company: {item.CompanyId && item.CompanyId.CompanyName ? item.CompanyId.CompanyName : 'No Company Assigned'}
              </Text>
              <Text style={styles.companyText}>
                {item.IsActive ? "🟢 Active" : "🔴 Inactive"}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No Employees available. Click "Add Employee" to add one.</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.formHeader}>
              {selectedEmployee._id ? 'Edit Employee' : 'Add Employee'}
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={selectedEmployee.FirstName || ''}
                onChangeText={(text) => setSelectedEmployee({ ...selectedEmployee, FirstName: text })}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={selectedEmployee.LastName || ''}
                onChangeText={(text) => setSelectedEmployee({ ...selectedEmployee, LastName: text })}
              />
            </View>
            {selectedEmployee._id && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Date Of Joining</Text>
                <TextInput
                  style={styles.input}
                  value={formatDate(selectedEmployee.createdAt) || ''}
                  onChangeText={(text) => setSelectedEmployee({ ...selectedEmployee, createdAt: text })}
                />
              </View>
            )}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={selectedEmployee.Phone || ''}
                onChangeText={(text) => setSelectedEmployee({ ...selectedEmployee, Phone: text })}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedEmployee.CompanyId || ''}  // Use CompanyId to track the selected company
                onValueChange={(itemValue) =>
                  setSelectedEmployee({ ...selectedEmployee, CompanyId: itemValue })  // Store the CompanyId
                }
                style={styles.picker}  // Apply font and padding inside Picker
              >
                <Picker.Item label="Select Company" value="" />
                {companyList.map((company) => (
                  <Picker.Item key={company._id} label={company.CompanyName} value={company._id} />  // Use _id as value
                ))}
              </Picker>
            </View>
            <View style={styles.formGroup}>
              {/* <Text style={styles.label}>IsActive</Text> */}
              <Switch
                value={selectedEmployee?.IsActive ?? false}
                onValueChange={(value) =>
                  setSelectedEmployee({ ...selectedEmployee, IsActive: value })
                }
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={saveEmployee} disabled={isSaving}>
                <Text style={styles.buttonText}>
                  {isSaving ? 'Saving...' : selectedEmployee._id ? 'Save Changes' : 'Add Employee'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  companyItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#6200EE',
    borderWidth: 1,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  companyText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',  // Ensure the modal doesn't restrict the height
    overflow: 'visible', // Allow overflowing content to be visible
  },
  formHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  formGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    color: '#000'
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    marginTop: 5,
    color: '#000'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5bc0de',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 1,
    padding: 1, // Padding for the container
    marginTop: 1,
  },
});
