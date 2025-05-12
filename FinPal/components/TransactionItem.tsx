import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types/transactions';

type TransactionItemProps = {
  data: Transaction;
};

export default function TransactionItem({ data }: TransactionItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={[styles.icon, { backgroundColor: data.icon }]} />
          <View>
            <Text style={styles.title}>{data.title}</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  location: {
    color: '#666',
    marginBottom: 6,
  },
  date: {
    color: '#666',
    fontSize: 13,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ff0000',
  },
  icon: {
    height: 36,
    width: 36,
    borderRadius: 6,
    marginRight: 12,
  },
});
