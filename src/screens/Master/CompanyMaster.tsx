import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Modal, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import API from '../../global/API';

export default function CompanyMaster() {
  const [companyList, setCompanyList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [selectedCompany, setSelectedCompany] = useState(null); // State for selected company

  // Fetch companies from API
  const fetchCompanies = async () => {
    try {
      setLoading(true); // Show loading indicator
      const response = await fetch(API.GetAllCompanies);
      const data = await response.json();
     
      if (response.ok) {
        console.log(data.data);
        setCompanyList(data.data);
        console.log(companyList);
      } else {
        console.error('Error fetching companies:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Open modal to edit the selected company
  const openModalToEdit = (index) => {
    const companyToEdit = companyList[index];  // Get the company data for editing
    setSelectedCompany(companyToEdit); // Update the selected company state
    console.log(`tttttttttttttttttttttt`,selectedCompany);
    
    console.log(companyToEdit);
    
    setIsModalVisible(true); // Open the modal
  };
  

  // Use useEffect to fetch companies when component mounts
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => {
        setSelectedCompany(null); // Clear selection for new entry
        setIsModalVisible(true);
      }}>
        <Text style={styles.addButtonText}>Add Company</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Company Details</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        companyList.length > 0 ? (
          <FlatList
            data={companyList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.companyItem} onPress={() => openModalToEdit(index)}>
                <Text style={styles.companyText}>Name: {item.CompanyName}</Text>
                <Text style={styles.companyText}>📧 Email: {item.Email}</Text>
                <Text style={styles.companyText}>📞 Phone: {item.Phone}</Text>
                <Text style={styles.companyText}>🏠 Address: {item.Address}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No companies available. Click "Add Company" to add one.</Text>
        )
      )}
      
      {/* Modal for adding/editing company */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={() => setIsModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.formHeader}>
        {selectedCompany ? 'Edit Company' : 'Add Company'}
      </Text>

      {/* Company Name Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          value={selectedCompany ?selectedCompany.CompanyName:''}
          onChangeText={(text) => setSelectedCompany({ ...selectedCompany, CompanyName: text })}
        />
      </View>

      {/* Email Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={selectedCompany ? selectedCompany.Email : ''}
          onChangeText={(text) => setSelectedCompany({ ...selectedCompany, Email: text })}
        />
      </View>

      {/* Phone Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={selectedCompany ? selectedCompany.Phone : ''}
          onChangeText={(text) => setSelectedCompany({ ...selectedCompany, Phone: text })}
        />
      </View>

      {/* Address Input */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={selectedCompany ? selectedCompany.Address : ''}
          onChangeText={(text) => setSelectedCompany({ ...selectedCompany, Address: text })}
        />
      </View>

      <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle save logic (add or update company here)
            setIsModalVisible(false);
          }}
        >
          <Text style={styles.buttonText}>
            {selectedCompany ? 'Save Changes' : 'Add Company'}
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
    marginVertical: 2,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  formHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    color:'#000'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
