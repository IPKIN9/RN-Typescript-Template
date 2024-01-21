import React, { useEffect } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../shared/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import StatsComp from "../component/Status";
import { RegisterContextProvider } from "../../store/RegisterContextState";

type StatsScreenProp = {
    navigation: StackNavigationProp<{}>;
};

const Status: React.FC<StatsScreenProp> = ({ navigation }) => {
    return (
        <RegisterContextProvider>
            <View className="h-full w-full bg-gray-100 flex flex-col gap-y-[12px]">
                <View className="h-[12%] w-full flex flex-col justify-center pt-[12%] bg-white pb-[10px]">
                    <View className="w-full h-fit flex flex-row justify-between px-[16px] items-center">
                        <Text className="font-semibold text-18px text-gray-900">
                            STATUS PENDAFTARAN
                        </Text>
                        <Text>
                            <MaterialIcons
                                name="receipt-long"
                                size={24}
                                color="gray"
                            />
                        </Text>
                    </View>
                </View>
                <StatsComp navigation={navigation} />
            </View>
        </RegisterContextProvider>
    );
};

export default Status;
