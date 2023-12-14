import React, { useEffect } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../shared/Colors"

const Splash: React.FC  = () => {
    return (
        <View className="p-[24px] h-full w-full flex flex-col justify-center items-center">
            <Image source={require('../../assets/preeload.gif')} />
            <Text className="mt-[24px] opacity-50" style={{ fontFamily: 'Montserrat-Regular' }}>Mohon Tunggu...</Text>
        </View>
    )
}

export default Splash