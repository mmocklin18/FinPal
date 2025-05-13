import { View, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import Balance from '../../components/Balance';
import Transactions from '../../components/Transactions';
import TestButton from "@/components/TestButton";
import * as React from 'react';
import {useState, useEffect} from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NotificationBehavior } from 'expo-notifications';
import Constants from "expo-constants";
import { Transaction } from "../../types/transactions"
import api from "../../utils/api";


/**Notifications.setNotificationHandler({
    handleNotification: async (): Promise<NotificationBehavior> => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
      };
    },
});*/

export default function Home() {
    const [budget, setBudget] = useState(1000);
    const [data, setData] = useState();

    



    const testTransactions = async () => {
        try {
            const res = await api.post("/plaid/transactions");
            console.log(res.data);
        } catch (err) {
            console.error("Error fetching transactions", err);
        }
    };



    

    return (
        <View style={styles.container}>
            <View style={styles.staticSection}>
                <TestButton title="Post a Test Transaction" onPress={testTransactions} />
                <TestButton title="Test Plaid API" onPress={testTransactions} />
            </View>
            <Transactions data={data} />
        </View>
    );
}

async function schedulePushNotification(
    transaction: Transaction,
    budget: number,
    data: Transaction[]
) {
    const moneyLeft = parseFloat(
        (budget - data.reduce((acc, tx) => acc + parseFloat(tx.amount), 0)).toFixed(2)
    );

    if (moneyLeft > 0) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `$${transaction.amount} - ${transaction.title}`,
                body: (moneyLeft > 200) ? `You have $${moneyLeft} left in your budget!` : `Careful, you have $${moneyLeft} left your budget for this month.`,
            },
            trigger: null,
        });
    } else {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Budget Exceeded',
                body: `You have exceeded your budget by $${Math.abs(moneyLeft)}.`,
            },
            trigger: null,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        paddingTop: 16 + Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        overflowX: 'hidden',
    },
    staticSection: {
        paddingHorizontal: 16,
    },
});