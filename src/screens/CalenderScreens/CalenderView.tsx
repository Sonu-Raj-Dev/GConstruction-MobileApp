import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity, Switch } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import API from '../../global/API';

export default function CalendarView({ route }) {
  const { item: employeeData } = route.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [isPresent, setIsPresent] = useState(true); // Switch for Present/Absent
  const [modalVisible, setModalVisible] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.post(API.GetCalenderData, employeeData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response:', response.data);  // Log the API response
      if (Array.isArray(response.data.data)) {
        setAttendanceData(response.data.data);
      } else {
        console.error('Invalid data format received from the API');
        setAttendanceData([]);
      }
    } catch (error) {
      console.error('Error fetching attendance data', error);
      setAttendanceData([]);
    }
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') {
      console.error('Invalid date string:', dateStr);
      return ''; // Return an empty string or a fallback value if the date string is invalid
    }
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const onDayPress = (day) => {
    const selectedDate = day.dateString;
    
    // Check if the selected day is before the employee's creation date or in the future
    const employeeCreationDate = new Date(employeeData.createdAt).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    
    if (selectedDate < employeeCreationDate || selectedDate > today) {
      alert('Cannot add attendance for this date. Please select a valid date.');
      return;
    }

    // Check if the selected day already has attendance data
    const attendanceRecord = attendanceData.find((record) => record.AttendanceDate === selectedDate);

    if (attendanceRecord) {
      // If there's existing data, pre-fill the modal with this data for editing
      setAmount(attendanceRecord.Amount);
      setRemark(attendanceRecord.Remark);
      setIsPresent(attendanceRecord.IsPresent);
    } else {
      // Clear the form for a new entry
      setAmount('');
      setRemark('');
      setIsPresent(true);
    }

    setSelectedDate(selectedDate);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (amount && remark) {
      try {
        const existingRecordIndex = attendanceData.findIndex((record) => record.AttendanceDate === selectedDate);
        
        if (existingRecordIndex > -1) {
          // Update the existing record
          const updatedData = [...attendanceData];
          updatedData[existingRecordIndex] = {
            AttendanceDate: selectedDate,
            Amount: amount,
            Remark: remark,
            EmployeeId: employeeData._id,
            IsPresent: isPresent,
          };

          setAttendanceData(updatedData);
          alert('Attendance data updated successfully!');
        } else {
          // Add a new record if it doesn't exist
          const response = await axios.post(`${API.AddCalenderData}`, {
            AttendanceDate: selectedDate,
            Amount: amount,
            Remark: remark,
            EmployeeId: employeeData._id,
            IsPresent: isPresent,
          });

          setAttendanceData((prevData) => [
            ...prevData,
            { AttendanceDate: selectedDate, Amount: amount, Remark: remark, IsPresent: isPresent },
          ]);
          alert('Attendance data added successfully!');
        }

        setModalVisible(false);
        setAmount('');
        setRemark('');
        setIsPresent(true);
        setSelectedDate(null);
      } catch (error) {
        console.error('Error adding/updating attendance data', error);
        alert('Failed to submit attendance data');
      }
    } else {
      alert('Please fill in both amount and remarks');
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  let markedDates = {};
  if (Array.isArray(attendanceData)) {
    attendanceData.forEach((record) => {
      const formattedDate = record.AttendanceDate;
      markedDates[formattedDate] = {
        marked: true,
        dotColor: record.IsPresent ? 'green' : 'red',
        activeOpacity: 0,
        customStyles: {
          text: {
            color: record.IsPresent ? '#008000' : '#FF0000', // Green for present, Red for absent
          },
        },
      };
    });
  }

  // Disable all dates before the employee's creation date and future dates
  const employeeCreationDate = new Date(employeeData.createdAt).toISOString().split('T')[0];
  
  // Mark all dates before the employee's creation date or future dates as disabled
  let daysBeforeCreationAndFuture = {};
  const today = new Date();
  let loopDate = new Date(employeeCreationDate);

  while (loopDate <= today) {
    const formattedDate = loopDate.toISOString().split('T')[0];
    if (formattedDate < employeeCreationDate || formattedDate > currentDate) {
      daysBeforeCreationAndFuture[formattedDate] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          text: {
            color: '#d3d3d3', // Gray color for disabled text
          },
        },
      };
    }
    loopDate.setDate(loopDate.getDate() + 1);
  }

  markedDates = { ...markedDates, ...daysBeforeCreationAndFuture };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{employeeData?.FirstName} {employeeData?.LastName}</Text>

      <Calendar
        current={currentDate}
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#000',
          textDayFontWeight: '500',
          textDayHeaderFontWeight: '600',
          textDayHeaderFontSize: 16,
        }}
        style={styles.calendar}
      />

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>Amount</Text>
          <Text style={styles.tableHeader}>Remarks</Text>
        </View>

        {attendanceData?.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableData}>{formatDateForDisplay(row.AttendanceDate)}</Text>
            <Text style={styles.tableData}>{`₹${row.Amount}`}</Text>
            <Text style={styles.tableData}>{row.Remark}</Text>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Attendance Data</Text>

            {selectedDate && (
              <Text style={styles.selectedDate}>
                Selected Date: {formatDateForDisplay(selectedDate)}
              </Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              placeholderTextColor="#888"
              value={amount}
              keyboardType="numeric"
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Remarks"
              placeholderTextColor="#888"
              value={remark}
              onChangeText={setRemark}
            />

            {/* Switch for Present/Absent */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{isPresent ? 'Present' : 'Absent'}</Text>
              <Switch
                value={isPresent}
                onValueChange={(value) => setIsPresent(value)}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableHeader: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    flex: 1,
    textAlign: 'center',
  },
  tableData: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 15,
    color: '#444',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    width: '100%',
    color: '#000',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
