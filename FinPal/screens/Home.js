import { View, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import TestButton from "@/components/TestButton";
import * as React from 'react';
import {useState, useEffect} from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Home() {
    const [budget, setBudget] = useState(1000);
    const [data, setData] = useState([
        {
            title: 'Akamai Coffee Shop',
            location: 'Kihei, HI',
            date: 'Today, 13:21',
            amount: (Math.random() * 10).toFixed(2),
            icon: '#FB8E41',
        },
        {
            title: 'Shops at Wailea',
            location: 'Wailea, HI',
            date: 'Yesterday, 20:07',
            amount: (Math.random() * 25).toFixed(2),
            icon: '#0091FF',
        },
        {
            title: 'Ono Hawaiian BBQ',
            location: 'Paia, HI',
            date: 'Thursday',
            amount: (Math.random() * 100).toFixed(2),
            icon: '#34D058',
        },
        {
            title: 'Fond',
            location: 'Lahaina, HI',
            date: 'Wednesday',
            amount: (Math.random() * 10).toFixed(2),
            icon: '#34D058',
        },
        {
            title: 'Ula’Ula Cafe',
            location: 'Waihee-Waiehu, HI',
            date: 'Tuesday',
            amount: (Math.random() * 15).toFixed(2),
            icon: '#FB8E41',
        },
        {
            title: "Tante's Fishmarket",
            location: 'Wailuku, HI',
            date: 'Monday',
            amount: (Math.random() * 10).toFixed(2),
            icon: '#0091FF',
        },
    ]);
    const transactionNames = [
        'Apple',
        'REI',
        'Starbucks',
        'Amazon',
        'Target',
        'Walmart',
        'Costco',
        'Best Buy',
        'Home Depot',
        'McDonalds',
        'Burger King'
        ]
    const locations = [
        'Atlanta, GA',
        'Chicago, IL',
        'Dallas, TX',
        'Denver, CO',
        'Houston, TX',
        'Los Angeles, CA',
        'Miami, FL',
        'New York, NY',
        'San Francisco, CA',
        'Seattle, WA',
        'Washington, DC',
    ]
    const colors = [
        '#FB8E41',
        '#0091FF',
        '#34D058',
        '#5AC8FA',
        '#5856D6',
        '#FF2D55',
        '#FF9500',
        '#FFCC00'
    ]

    useEffect(() => {
        schedulePushNotification(data[0], budget, data).then(r => console.log(r));
    }, [data]);


    const addTransaction = async () => {
        const newTransaction = {
            title: transactionNames[Math.floor(Math.random() * transactionNames.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            // format current date for ex. "Today, 13:21"
            date: new Date().toLocaleString('en-US', {
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
            }),
            amount: (Math.random() * 100).toFixed(2),
            icon: colors[Math.floor(Math.random() * colors.length)],
        };
        // add new transaction to the beginning of the data array
        setData([newTransaction, ...data]);

    }

    return (
        <View style={styles.container}>
            <View style={styles.staticSection}>
                <Card />
                <Balance data={data} budget={budget}/>
                <TestButton title="Post a Test Transaction" onPress={addTransaction} />
            </View>
            <Transactions data={data} />
        </View>
    );
}

async function schedulePushNotification(transaction, budget, data) {
    const moneyLeft = parseFloat((budget - (data.reduce((acc, transaction) => {
            return acc + parseFloat(transaction.amount);
        }, 0)).toFixed(2)).toFixed(2));
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