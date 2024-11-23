import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Contact() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
    

      {/* Contact Information Section */}
      <View style={styles.contactCard}>
        {/* Phone Information */}
        <View style={styles.contactRow}>
          <Text style={styles.icon}>📞</Text>
          <View style={styles.textWrapper}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>9969079124</Text>
          </View>
        </View>

        {/* Email Information */}
        <View style={styles.contactRow}>
          <Text style={styles.icon}>📧</Text>
          <View style={styles.textWrapper}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>sonu296702@gmail.com</Text>
          </View>
        </View>

        {/* Address Information */}
        <View style={styles.contactRow}>
          <Text style={styles.icon}>🏢</Text>
          <View style={styles.textWrapper}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>Malad East</Text>
          </View>
        </View>
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 30,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 15,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  contactButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    alignSelf: 'center', // Center button horizontally
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
