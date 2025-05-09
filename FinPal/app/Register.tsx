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
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';



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
        <View
        style={StyleSheet.absoluteFill}>
        <KeyboardAvoidingView
         behavior={Platform.select({ ios: "padding", android: undefined })}
         style={styles.container}>
            <LinearGradient
            colors={['#e3f9e5', '#c1eac5']}
            end={{ x: 0.8, y: 1 }}
            style={StyleSheet.absoluteFill}
            />
            <LottieView
            source={require('../assets/animations/tree.json')}
            autoPlay
            loop
            style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 15 }}
            />
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
                Already have an account?{" "}
                <Text style={styles.loginLink}>Log in</Text>
            </Text>
            </TouchableOpacity> 
                
            {linkToken && showPlaid && (<TouchableOpacity
             style={styles.button}
             onPress={handlePlaidLink}>
                <Text style={styles.buttonText}>Connect Your Bank</Text>
            </TouchableOpacity> )}
        </KeyboardAvoidingView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 28,
      justifyContent: "center",
      backgroundColor: "#f3f6f9",
    },
    title: {
      fontSize: 28,
      fontFamily: "Manrope",
      fontWeight: "700",
      marginBottom: 32,
      textAlign: "center",
      color: "#1c1c1e",
    },
    input: {
      backgroundColor: "#ffffff",
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderRadius: 14,
      fontSize: 16,
      fontFamily: "Manrope",
      borderWidth: 1,
      borderColor: "#d1d5db",
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    button: {
      backgroundColor: "#1c1c1e",
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "Manrope",
    },
    loginText: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 14,
      color: "#4a5568",
      fontFamily: "Manrope",
    },
    loginLink: {
      color: "#007bff",
      fontWeight: "500",
    },
    error: {
      color: "red",
      marginBottom: 12,
      textAlign: "center",
      fontFamily: "Manrope",
    },


    });




