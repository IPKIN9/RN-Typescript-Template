import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useGlobal } from "../../../store/GlobalStore";
import { useRegisterContext } from "../../../store/RegisterContextState";
import Form1 from "./Form1";
import Form2 from "./Form2";

type StatsScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const StatsComp: React.FC<StatsScreenProp> = ({ navigation }) => {
    const { formStep, setFormStep } = useRegisterContext();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    return (
        <View>
            <SafeAreaView>
                <ScrollView>
                    <View className="px-[8px] pt-[24px] pb-[24px] flex flex-col">
                        <View className="flex flex-row justify-between pr-[4px]">
                            <Text
                                style={{ fontFamily: "Montserrat-SemiBold" }}
                                className="text-[14px] pl-[10px]"
                            >
                                DAFTAR BARU
                            </Text>
                            {formStep !== 1 && (
                                <Pressable
                                    onPress={() => {
                                        setFormStep(1);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Montserrat-Regular",
                                        }}
                                        className="text-[14px] pl-[10px] text-blue-700"
                                    >
                                        Kembali
                                    </Text>
                                </Pressable>
                            )}
                        </View>

                        {formStep === 1 ? (
                            <Form1 navigation={navigation} />
                        ) : formStep === 2 ? (
                            <Form2 navigation={navigation}></Form2>
                        ) : (
                            <View></View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default StatsComp;
