import * as ImagePicker from "expo-image-picker";
import AwesomeButton from "react-native-really-awesome-button";
import React from "react";

export const MagicButton = ({nav}) => {
    const selectImage = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                aspect: [4, 3]
            });

            if (!response.cancelled) {
                const source = {uri: response.uri};
                const base64 = {base64: response.base64};

                nav.navigate('Result', {source, base64})
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AwesomeButton
            progress={false}
            strecth={true}
            backgroundColor={'#bdb2ff'}
            borderRadius={10}
            elevation={6}
            onPress={() => selectImage()}>
            magic scan
        </AwesomeButton>
    )
};