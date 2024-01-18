import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

type StatsScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const StatsComp: React.FC<StatsScreenProp> = ({ navigation }) => {
    const [passwordHide, setPasswordHide] = useState(true);

    return (
        <SafeAreaView>
            <View className="px-[8px] pt-[32px] pb-[24px] flex flex-col gap-y-[18px]">
                <Text
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                    className="text-[14px] pl-[10px]"
                >
                    DAFTAR BARU
                </Text>
                <View className="bg-white rounded-[4px] px-[18px] pb-[24px] flex flex-col gap-y-[24px] w-full h-fit shadow-md">
                    <TextInput
                        className="py-[8px] px-[14px] rounded-[11px] border-[1px] border-gray-300"
                        placeholder="Username"
                    />
                    <View className="py-[8px] px-[14px] rounded-[11px] border-[1px] border-gray-300 flex flex-row justify-between items-center">
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={passwordHide}
                        />
                        <Pressable
                            onPress={() => {
                                setPasswordHide(!passwordHide);
                            }}
                        >
                            <MaterialIcons
                                name="keyboard-hide"
                                size={18}
                                color={passwordHide ? "gray" : "black"}
                            />
                        </Pressable>
                    </View>
                    <Text className="text-red-500">* Sertakan foto ktp anda untuk keperluan verifikasi pihak admin terkait data diri anda</Text>
                    <View className="flex flex-col gap-y-[14px] items-center">
                        <Pressable className="flex flex-row p-[18px] rounded-[11px] border-[1px] border-gray-300">
                            <Feather name="camera" size={28} color="gray" />
                        </Pressable>
                        <Pressable>
                            <Text className="text-gray-400 text-[14px]">Buka Galery</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default StatsComp;