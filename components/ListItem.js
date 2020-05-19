import {Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import React from "react";

export const ListItem = ({item, nav}) => {
    return (
        <TouchableWithoutFeedback key={item.key}
                                  onPress={() => nav.navigate('Detail', {item})}>
            <SharedElement id={`card-${item.key}`}>
                <Image
                    source={{uri: item.value.source}}
                    style={styles.cardImage}
                />
            </SharedElement>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    cardImage: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        height: 200,
        width: '100%'
    }
});