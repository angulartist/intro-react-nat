import {AsyncStorage} from "react-native";

export const _getUID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const _storeData = async (key = '@aiStore:key', obj) => {
    obj = JSON.stringify(obj)

    try {
        await AsyncStorage.setItem(key, obj);
    } catch (error) {
    }
};


export const _retrieveData = async (key = '@aiStore:key') => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log(JSON.parse(value));
        }
    } catch (error) {
    }
};

export const _multiGet = async (keys) => {
    const elements = await AsyncStorage.multiGet(keys);

    return elements.map(([key, value]) => {
        return {
            key,
            value: JSON.parse(value)
        }
    })
};

export const _getAllKeys = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();

        return keys.reverse();
    } catch (error) {
    }
};