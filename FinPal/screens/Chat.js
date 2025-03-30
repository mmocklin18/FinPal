import { fetchOpenAIResponse } from "@/app/openai";
import React, { useState, useRef } from "react";
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from "react-native";
import { StyleSheet } from 'react-native';
import {submit} from "react-native-plaid-link-sdk";

export default function Chat() {

    const [input,setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;


    const handleInputSubmit = async () => {
        //Do not allow empty input
        if (input.trim().length == 0) {
            return;
        }

        setLoading(true);
        const openAIResponse = await fetchOpenAIResponse(input);
        setResponse(openAIResponse);
        setLoading(false);
        setInput("");

        //reset animation
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1, // Fully visible
            duration: 1000, // 1 second fade-in
            useNativeDriver: true,
        }).start();

    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>💬 Chat with AI</Text>

            <TextInput
                style={styles.input}
                placeholder="What are your financial goals?"
                placeholderTextColor="#888"
                value={input}
                onChangeText={setInput}
            />

            <TouchableOpacity style={styles.button} onPress={handleInputSubmit} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Loading..." : "Send"}</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007bff" />}

            {response.length > 0 && (
                <Animated.View style={[styles.responseContainer, { opacity: fadeAnim }]}>
                <Text style={styles.responseText}>{response}</Text>
                </Animated.View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Light background
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#007bff",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    responseContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#e0f7fa",
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    responseText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },
});