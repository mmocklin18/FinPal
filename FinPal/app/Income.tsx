import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import api from '@/utils/api';

export default function Income() {
    const[income, setIncome] = useState('');
    const[error, setError] = useState('');

    const router = useRouter()

    //Save income and bring user to dashboard
    const handleSaveIncome = async () => {
        const parsedIncome = parseFloat(income);
        
        //check valid input
        if (parsedIncome <= 0 || parsedIncome === null) {
            console.error("PATCH failed:");
            setError('Invalid number, try again');
        } else {
            //update db
            console.log("UPDATING DB WITH INCOME")
            try {
                const res = await api.patch("user/income", {
                    monthlyIncome: parsedIncome,
                });
                console.log("📤 Sending monthlyIncome:", parsedIncome);

                //route to Dashboard
                router.replace('/(tabs)/Dashboard');
            } catch (err) {
                console.error("Income PATCH failed:", err.response?.data || err.message || err);
                setError("Something went wrong. Try again.");
            }
        }
    };


  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <Text style={styles.title}>Let's personalize your budget</Text>
      <Text style={styles.subtitle}>What is your average monthly income?</Text>

      <TextInput
        style={styles.input}
        placeholder="$ e.g. 3000"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSaveIncome}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});