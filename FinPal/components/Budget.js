import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
    Platform,
} from "react-native";
import {useState} from "react";
import {LineChart} from "react-native-chart-kit";

export default function Budget() {

    const [budget, setBudget] = useState(1000);

    return (
        <Pressable style={styles.container} >
            <View style={styles.layout}>
                <View>
                    <Text style={styles.title}>Card budget</Text>
                    <Text style={styles.balance}>
                        ${budget.toFixed(2)}
                    </Text>

                </View>

            </View>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 100,
        borderRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: Platform.select({
            native: 12,
        }),
    },
    layout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#666',
        marginBottom: 6,
    },
    balance: {
        fontSize: 28,
        fontWeight: '600',
    },
});
