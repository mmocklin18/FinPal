import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
import { Transaction } from '@/types/transactions';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressRing } from '@/types/progressring';
import getCategoryColor from '@/utils/getCategoryColor';
import assignIcon from '@/utils/assignIcon';

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
      console.log("🔥 Dashboard mounted");

    const router = useRouter();
    const [transactions, setTransaction] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState();    

    //Load user transactions
    useEffect(() => {
        console.log("Useeffect running");
    const loadDashboard = async () => {
          console.log("loadDashboard called");

        //check monthly income
        try {
            const  userRes = await api.get("/user/income");
            console.log("User data:", userRes.data);
            if (!userRes.data.monthlyIncome) {
                router.push("../Income");
                return;
            }
            setMonthlyIncome(userRes.data.monthlyIncome)
        } catch (err) {
            console.error("PATCH USER INCOME FAILED", err)
        }
        
        //get transaction data
            console.log("CALLING POST TRANSACTIONS")
        try {
            const txnRes = await api.post("/plaid/transactions");
            console.log(txnRes.data);
            setTransaction(txnRes.data);
        } catch (err) {
            console.error("Error fetching transactions", err);
        }
    };
    loadDashboard();
    }, []);



    

    const budgetSpent: Record<string, number> = {                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        "Housing": 0,
        "Dining_Out": 0,
        "Transportation": 0,
        "Health": 0,
        "Entertainment":0, 
        "Shopping": 0,
        "Lifestyle": 0,
        "Debt_&_Fees": 0,
        "Savings": 0,
        "Other": 0,
    };

    const budgetPercentages: Record<string, number> = {
        "Housing": 30,
        "Dining_Out": 8,
        "Transportation": 10,
        "Health": 5,
        "Entertainment": 6,
        "Shopping": 6,
        "Lifestyle": 7,
        "Debt_&_Fees": 8,
        "Savings": 15,
        "Other": 5,
    };

    transactions.forEach((item: Transaction) => {
        const cat = item.category;

        //Sum totals spent in each category
        if (cat && Object.prototype.hasOwnProperty.call(budgetSpent, cat)) {
            budgetSpent[cat] += item.amount;
        } else {
            budgetSpent["Other"] += item.amount;
        }
    });


    const ringsData: ProgressRing[] = Object.entries(budgetPercentages).map(
        ([category, goalPercent]) => {
            const goalAmount = monthlyIncome * (goalPercent / 100);
            const spent = Math.round(budgetSpent[category]) || 0;
            const percentage = goalAmount === 0 || isNaN(goalAmount) ? 0 : (spent / goalAmount) * 100;
            return {
                category: category,
                percentage: percentage,
                spent: spent,
                color: getCategoryColor(category),
                budget: goalAmount,
                label: assignIcon(category),
            }
        }
    );


    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Current Monthly Income: ${monthlyIncome}</Text>
            <View style={styles.editIncomeContainer}>
                <TouchableOpacity
                 onPress={() => router.replace("../Income")}
                 style={styles.editIncomeButton}
                 >
                    <Text style={styles.editIncomeText}>Edit Income</Text>
                </TouchableOpacity>
            </View>
            <ProgressRings data={ringsData}/>
            <View style={styles.staticSection}></View>
            <Transactions data={transactions} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 2,
        paddingTop: 30, 
        backgroundColor: '#ecf0f1',
        overflowX: 'hidden',
    },
    staticSection: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#374151', 
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 12,
        letterSpacing: 0.3,
        fontFamily:"Manrope"
    },
    editIncomeButton: {
        backgroundColor: "#065f46", 
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    editIncomeText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    editIncomeContainer: {
        alignItems: "flex-end",
        marginBottom: 12,
        marginRight: 10,
    },
    


});