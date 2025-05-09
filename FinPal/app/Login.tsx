import { useState } from "react";
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
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';



export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const result = await api.post("/auth/login", { email, password });        
            await AsyncStorage.setItem("token", result.data.token);
            router.replace("/(tabs)/Dashboard");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Login failed.");
        }
    };

    return (
        <View
        style={StyleSheet.absoluteFill}
        >
        <KeyboardAvoidingView
         behavior={Platform.select({ ios: "padding", android: undefined })}
         style={styles.container}>
            <LinearGradient
            colors={['#e3f9e5', '#c1eac5']}
            end={{ x: 0.8, y: 1 }}
            style={StyleSheet.absoluteFill}
            />
            <LottieView
            source={require('../assets/animations/moneyfall.json')}
            autoPlay
            loop
            style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 8 }}
            />
            <Text style={styles.title}>Welcome Back to FinPal!</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/Register")}>
            <Text style={{ color: "#1a202c", marginTop: 12 }}>
                Don't have an account?{" "}
                <Text style={styles.link}>Sign Up</Text>
            </Text>
            </TouchableOpacity>
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
      fontWeight: "700",
      fontFamily: "Manrope",
      textAlign: "center",
      color: "#1c1c1e",
      marginBottom: 32,
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
      elevation: 1,
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
    linkText: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 14,
      color: "#4a5568",
      fontFamily: "Manrope",
    },
    link: {
      color: "#007bff",
      fontWeight: "500",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: 12,
      fontFamily: "Manrope",
    },
  });




