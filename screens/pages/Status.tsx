import React, { useEffect } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../shared/Colors"

const Status: React.FC  = () => {
    return (
        <View className="h-full w-full bg-gray-100 flex flex-col gap-y-[12px]">
            <View className="h-[12%] w-full flex flex-col justify-center pt-[12%] bg-white pb-[10px]">
                <View className="w-full h-fit flex flex-row justify-between px-[16px] items-center">
                    <Text className="font-semibold text-18px text-gray-900">STATUS PENDAFTARAN</Text>
                    <Text>
                        <MaterialIcons name="receipt-long" size={24} color="gray" />
                    </Text>
                </View>
            </View>
            <View className="w-full h-[10%] flex flex-row items-center">
                <Pressable className="w-[50%] h-[60%] px-[12px] py-[8px] bg-blue-500 border-[1px] border-gray-200 flex flex-row items-center justify-center">
                    <Text className="text-white font-normal text-[14px] text-center">Berlangsung</Text>
                </Pressable>
                <Pressable className="w-[50%] h-[60%] px-[12px] py-[8px] bg-gray-200 border-[1px] border-gray-300 flex flex-row items-center justify-center">
                    <Text className="text-gray-900 font-normal text-[14px] text-center">Daftar Baru</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Status