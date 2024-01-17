import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useProfileContext } from "../../../store/ProfileContextState";
import LoginApi from "../../../ucase/Login";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Logout: React.FC = () => {
    const { setShowLogOutModal } = useProfileContext();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const logoutAccount = async () => {
        setLoading(true)
        LoginApi.flashData()
        .then((res) => {
            navigation.navigate('Home' as never);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <View
            className="w-full h-full absolute top-[40px] z-10 left-0 flex flex-col justify-center items-center"
            style={styles.container}
        >
            <View className="w-[300px] flex flex-col items-center h-fit bg-white rounded-[12px] pb-[32px] pt-[24px] px-[14px] relative">
                <View className="w-full flex flex-row items-center justify-center">
                    <Text
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                        className="text-gray-700 text-[24px]"
                    >
                        Keluar?
                    </Text>
                    <Pressable
                        onPress={() => {
                            setShowLogOutModal(false);
                        }}
                        className="absolute top-0 right-0"
                    >
                        <Feather name="x-circle" size={24} color="gray" />
                    </Pressable>
                </View>
                <View className="w-full h-fit pt-[30px] flex flex-row justify-center">
                    <Image
                        className="h-[130px] w-[130px]"
                        source={require("../../../assets/logout.jpg")}
                    />
                </View>
                <View className="flex flex-row justify-center gap-x-[24px] pt-[24px]">
                    <Pressable
                        onPress={() => {
                            setShowLogOutModal(false);
                        }}
                        className="flex flex-row py-[8px] px-[24px] rounded-[11px] bg-gray-200"
                    >
                        <Text className="text-gray-700 text-[18px]">Tidak</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { logoutAccount() }}
                        className="flex flex-row py-[8px] px-[24px] rounded-[11px] bg-blue-700 items-center justify-center"
                    >
                        <Text className="text-white text-[18px] text-center">
                            Ya
                        </Text>
                        {loading && (
                            <Image
                                className="h-5 w-5 ml-[8px]"
                                source={require("../../../assets/preeload.gif")}
                            />
                        )}
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Warna biru dengan opasitas 0.5
    },
});

export default Logout;
