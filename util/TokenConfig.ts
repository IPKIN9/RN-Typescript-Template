import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('userToken', value);
    } catch (e) {
        console.log(e);
    }
};

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
            // value previously stored
            return value
        }
    } catch (e) {
        console.log(e);
        return e
    }
};

const clearData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log(e);
        return e
    }
}

export { storeData, getData, clearData };
