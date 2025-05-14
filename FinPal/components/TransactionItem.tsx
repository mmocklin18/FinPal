import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types/transactions';
import { useFonts } from 'expo-font';

type TransactionItemProps = {
  data: Transaction;
};

export default function TransactionItem({ data }: TransactionItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.icon}>
            <Text style={styles.emoji}>{data.icon}</Text>
          </View>
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
               {data.title.length > 24 ? data.title.slice(0, 24) + '…' : data.title}
            </Text>
            <Text style={styles.location}>{data.location}</Text>
            <Text style={styles.date}>{data.date}</Text>
          </View>
        </View>
        <Text style={styles.amount}>${data.amount}</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
    color: '#111827', 
    fontFamily: 'Manrope',    
  },
  location: {
    color: '#6b7280', 
    fontSize: 13,
  },
  date: {
    color: '#9ca3af', 
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444', 
    fontFamily: 'Manrope',
  },
  icon: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6', 
  },
  emoji: {
    fontSize: 22,
    textAlign: 'center',
  },
});
