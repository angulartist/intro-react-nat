import {StyleSheet, Text, View} from "react-native";
import Emoji from "react-native-emoji";
import {MagicButton} from "./MagicButton";
import React from "react";
import {Colors} from "../styles";

export const HomeActionBar = ({navigation}) => {
    return (
        <View style={styles.actionable}>
            <Text style={styles.smallText}>
                <Emoji name='dog'/>
                <Text>checks history</Text>
            </Text>
            <MagicButton nav={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    actionable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    smallText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: Colors.GRAY_DARK
    }
});