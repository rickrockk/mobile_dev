import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Экран профиля</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});
