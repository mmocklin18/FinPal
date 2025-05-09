import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";
import {
    create,
    open,
    LinkSuccess,
    LinkExit,
    LinkTokenConfiguration,
    LinkSuccessMetadata,
    LinkExitMetadata,
} from 'react-native-plaid-link-sdk';
import { fetchLinkToken } from "../api/plaid";


export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [linkToken, setLinkToken] = useState("");
    const [showPlaid, setShowPlaid] = useState(false);

    //
    const handleRegister = async () => {
        try {
            const result = await api.post("/auth/register", { email, password });        
            await AsyncStorage.setItem("token", result.data.token);

            //activate plaid link UI
            const token = await fetchLinkToken();
            if (token) {
                console.log(token)
                setLinkToken(token);
                setShowPlaid(true);
            } else {
                //continue with more limited functionality
                router.replace("/(tabs)/Dashboard");
            }


        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Login failed.");
        }
    };

    const handlePlaidLink = async () => {
        if (!linkToken) return;

        try {
            await create({token: linkToken});
            await open({
                onSuccess: async (success: LinkSuccess) => {
                    await api.post('plaid/exchange-public-token', {
                        public_token: success.publicToken,
                    });
                    router.replace("/(tabs)/Dashboard");
                },
                onExit: async (exit: LinkExit) => {
                    console.warn("User exited Plaid,", exit);
                    router.replace('/(tabs)/Dashboard');
                },
            });
        } catch (err) {
            console.error("Plaid error:", err);
        }
    };


    return (
        <KeyboardAvoidingView
         behavior={Platform.select({ ios: "padding", android: undefined })}
         style={styles.container}>
            <Text style={styles.title}>Get Started with FinPal!</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => router.replace("/Login")}>
            <Text style={{ color: "#1a202c", marginTop: 12 }}>
                Already have an account? Log in
            </Text>
            </TouchableOpacity> 
                
            {linkToken && showPlaid && (<TouchableOpacity
             style={styles.button}
             onPress={handlePlaidLink}>
                <Text style={styles.buttonText}>Connect Your Bank</Text>
            </TouchableOpacity> )}
        </KeyboardAvoidingView>

    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            justifyContent: "center",
            backgroundColor: "#f0f4f8",
        },
        title: {
            fontSize: 26,
            fontWeight: "700",
            marginBottom: 24,
            textAlign: "center",
            color: "#1a202c",
        },
        input: {
            backgroundColor: "#ffffff",
            padding: 14,
            borderRadius: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#cbd5e0",
        },
        button: {
            backgroundColor: "#1a202c",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 8,
        },
        buttonText: {
            color: "white",
            fontWeight: "600",
            fontSize: 16,
        },
        error: {
            color: "red",
            marginBottom: 12,
            textAlign: "center",
        },

    });




