import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

export default function TestButton(props) {
    return (
        <Pressable style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});