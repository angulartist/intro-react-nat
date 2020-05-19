import {StyleSheet, Text} from "react-native";
import React from "react";

export const HomeHeader = () => {
    return (
        <Text style={styles.heading}>
            dogs.ai
        </Text>
    )
};

const styles = StyleSheet.create({
    heading: {
        marginTop: 30,
        marginBottom: 80,
        fontWeight: 'bold',
        fontSize: 72,
    }
});