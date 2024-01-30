import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, Text, View } from "react-native";
import { Image } from "react-native";

type WaitingRoomScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const WaitingRoom: React.FC<WaitingRoomScreenProp> = ({ navigation }) => {
    const navigateToLogin = () => {
        navigation.navigate('Login')
    }
    return (
        <View className="w-full h-full flex flex-col justify-start items-center px-8 pt-[200px] gap-y-4">
            <Image className="w-16 h-16" source={require('../../../assets/icons/rsud.png')} />
            <Text className="text-center">BERHASIL MENDAFTAR, SILAHKAN LOGIN TERLEBIH DAHULU</Text>
            <Pressable onPress={() => {navigateToLogin()}} className="px-[24px] py-[8px] rounded-md bg-blue-500" >
                <Text className="text-white text-[18px]">LOGIN</Text>
            </Pressable>
        </View>
    )
}

export default WaitingRoom