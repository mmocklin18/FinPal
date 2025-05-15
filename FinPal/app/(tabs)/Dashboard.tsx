import { View, StyleSheet, Text } from 'react-native';
import Transactions from '../../components/Transactions';
import * as React from 'react';
import {useState, useEffect} from "react";
import * as Notifications from 'expo-notifications';
import { NotificationBehavior } from 'expo-notifications';
import Constants from "expo-constants";
import api from "../../utils/api";
import ProgressRings from '@/components/ProgressRings';
import { defaultProgressRings } from '@/data/defaultBudgets';
import { LinearGradient } from 'expo-linear-gradient';

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
            <ProgressRings data={defaultProgressRings}/>
            <View style={styles.staticSection}></View>
            <Transactions data={transactions} />
        </View>
    );
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
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#374151', // Tailwind gray-700
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 12,
        letterSpacing: 0.3,
        fontFamily:"Manrope"
    }
    


});