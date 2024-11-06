import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import API from '../../global/API'; // Correctly imported API endpoints

export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API.GetAllEmployee);
      const result = await response.json();
      console.log(result);
      setData(result.data); // Accessing `data` array from the API response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Text style={styles.empName}>{`${item.FirstName} ${item.LastName}`}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            🛑 Absent:{' '}
            <Text style={styles.detailNumber}>{item.absent ?? '0'} days</Text>
          </Text>
          <Text style={styles.detailText}>
            ✅ Present:{' '}
            <Text style={styles.detailNumber}>{item.present ?? '0'} days</Text>
          </Text>
          <Text style={styles.paymentText}>💰 Payment: ₹{item.payment ?? '0'}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFD700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
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
