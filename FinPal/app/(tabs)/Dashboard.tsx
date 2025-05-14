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
import ProgressRing from "../../components/ProgressRingItem";
import ProgressRings from '@/components/ProgressRings';
import getCategoryColor from "../../utils/getCategoryColor"
import { defaultProgressRings } from '@/data/defaultBudgets';


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

export default function Dashboard() {
    const [transactions, setTransaction] = useState([]);
    const [rings, setRings] = useState([]);


    //Load user transactions
    useEffect(() => {
    const loadDashboard = async () => {
        //get transaction data
        try {
             const res = await api.post("/plaid/transactions");
            console.log(res.data);
            setTransaction(res.data);
        } catch (err) {
            console.error("Error fetching transactions", err);
        }
         
    };
    loadDashboard();
    }, []);



    

    return (
        <View style={styles.container}>
            <ProgressRings data={defaultProgressRings}>

            </ProgressRings>
            <View style={styles.staticSection}>
            </View>
            <Transactions data={transactions} />
        </View>
    );
}

/** async function schedulePushNotification(
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
}*/

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