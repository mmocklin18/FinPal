import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            AsyncStorage.removeItem("token");
            router.replace("/");
        } catch (e) {
            console.error('Logout failed', e);
        }
    }

    return (
        <Pressable style={{padding:10}} onPress={handleLogout}>
        <Text>Logout</Text>
        </Pressable>
    );


}
