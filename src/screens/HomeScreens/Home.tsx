import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({navigation}) {
  const Data = [
    {
      id: '1',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '2',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '3',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '4',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '5',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '6',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '7',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '8',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
    {
      id: '9',
      empName: 'Sonu Rajbhar',
      absent: '4',
      present: '6',
      payment: '10000',
    },
  ];

  const EmployeeCard = ({item}) => (
    <LinearGradient
      colors={['#1D1F33', '#13131A']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => {
          navigation.navigate('Calender', {item});
        }}>
        <Text style={styles.empName}>{item.empName}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            🛑 Absent:{' '}
            <Text style={styles.detailNumber}>{item.absent} days</Text>
          </Text>
          <Text style={styles.detailText}>
            ✅ Present:{' '}
            <Text style={styles.detailNumber}>{item.present} days</Text>
          </Text>
          <Text style={styles.paymentText}>💰 Payment: ₹{item.payment}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={item => item?.id}
        renderItem={EmployeeCard}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0D0D0D',
  },
  cardContainer: {
    borderRadius: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  empName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  detailText: {
    fontSize: 18,
    color: '#A1A1A1',
    marginVertical: 5,
  },
  detailNumber: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  paymentText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
  },
});
