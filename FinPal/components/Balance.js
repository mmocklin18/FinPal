import { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

export default function Balance(props) {

  const data = [
    0,
    25 + Math.random() * 25,
    50 + Math.random() * 25,
    75 + Math.random() * 25,
    75 + Math.random() * 25,
    100 + Math.random() * 25,
    100 + Math.random() * 25,
    120 + Math.random() * 25,
    130 + Math.random() * 25,
    150 + Math.random() * 25,
  ];

  return (
    <Pressable style={styles.container}>
      <View style={styles.layout}>
        <View style={styles.vertical}>
          <Text style={styles.title}>Card balance</Text>
          <Text style={styles.balance}>
            ${props.data.reduce((acc, transaction) => {
            return acc + parseFloat(transaction.amount);
          }, 0).toFixed(2)}
          </Text>
          <Text style={styles.title}>Remaining budget</Text>
          <Text style={styles.balance}>${(props.budget - (props.data.reduce((acc, transaction) => {
            return acc + parseFloat(transaction.amount);
          }, 0)).toFixed(2)).toFixed(2)}</Text>
        </View>
        <ProgressChart
          data={{
            data: [((props.data.reduce((acc, transaction) => {
              return acc + parseFloat(transaction.amount);
            }, 0))/props.budget)],
          }}
          width={Dimensions.get('window').width / 2 - 24}
          height={100}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            fillShadowGradientFrom: '#fff',
            fillShadowGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 200, 200, ${opacity * 2})`,
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
          }}
          radius={40}
          hideLegend={false}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: Platform.select({
      native: 12,
    }),
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#666',
    marginBottom: 6,
  },
  balance: {
    fontSize: 28,
    fontWeight: '600',
  },
});
