import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';

export default function CalenderView() {
  // Hardcoded data for absent and present days
  const data = {
    empName: 'John Doe',
    absent: '1/10,2/10,2/9',
    present: '4/10,5/10',
  };

  // Example dynamic table data
  const tableData = [
    { date: '10/10/2024', amount: 100, remarks: 'Salary Payment' },
    { date: '12/10/2024', amount: 50, remarks: 'Advance' },
  ];

  // Parse the absent and present dates from strings to a date format
  const absentDays = data.absent.split(',').map(day => formatDate(day));
  const presentDays = data.present.split(',').map(day => formatDate(day));

  // Helper function to convert '1/10' style date to 'YYYY-MM-DD' format for Calendar
  function formatDate(dateStr) {
    const [day, month] = dateStr.split('/');
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Create a markedDates object for react-native-calendars
  const markedDates = {};
  absentDays.forEach(day => {
    markedDates[day] = { marked: true, dotColor: 'red', activeOpacity: 0 };
  });
  presentDays.forEach(day => {
    markedDates[day] = { marked: true, dotColor: 'green', activeOpacity: 0 };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{data.empName}</Text>

      <Calendar
        current={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#000',
          textDayFontWeight: '500',
          textDayHeaderFontWeight: '600',
          textDayHeaderFontSize: 16,
        }}
        style={styles.calendar}
      />

      {/* Dynamic Table Rendering */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>Amount</Text>
          <Text style={styles.tableHeader}>Remarks</Text>
        </View>

        {/* Render dynamic rows based on tableData */}
        {tableData.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableData}>{row.date}</Text>
            <Text style={styles.tableData}>{`$${row.amount}`}</Text>
            <Text style={styles.tableData}>{row.remarks}</Text>
          </View>
        ))}
      </View>
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
    justifyContent: 'space-around', // Space evenly between columns
    alignItems: 'center', // Align items vertically in the center
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableHeader: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    flex: 1, // Ensure equal spacing between columns
    textAlign: 'center', // Center text horizontally
  },
  tableData: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
});
