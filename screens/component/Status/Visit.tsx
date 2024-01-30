import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Pressable, Text, View } from "react-native";
import VisitApi from "../../../ucase/Visit"
import { errorProduce } from "../../../util/ErrorLogConsoleReport";
import { AxiosError } from "axios";
import { useEffect } from "react";

type VisitScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const Visit: React.FC<VisitScreenProp> = ({ navigation }) => {
    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    const getAvaibleStatus = async () => {
        await VisitApi.getAllData()
        .then((res) => {
            console.log(res.data);
        })
        .catch((err: AxiosError) => {
            errorProduce(err)
        })
    }
    
    useEffect(() => {
        getAvaibleStatus()
    }, [])

    return (
        <View className="w-full h-full flex flex-col justify-start items-center px-8 gap-y-4 relative">
            <Image className="w-[350px] h-[350px] absolute z-10 top-[70px] left-0" source={require('../../../assets/background/top-bg.png')} />
        </View>
    )
}

export default Visit