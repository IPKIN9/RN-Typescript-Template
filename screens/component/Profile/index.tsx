import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { BackHandler, Pressable, SafeAreaView, Text, View } from "react-native";
import { IUserProfile, useProfileContext } from '../../../store/ProfileContextState'
import { SimpleLineIcons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import ProfileApi from '../../../ucase/Profile'
import { clearData } from "../../../util/TokenConfig";
import { errorProduce } from "../../../util/ErrorLogConsoleReport";
import Logout from '../Modal/Logout'

type LoginFormProps = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const ProfileComp: React.FC<LoginFormProps> = ({ navigation }) => {
    const { isLoading, setIsLoading, pageLoading, setPageLoading, profile, setProfile, showLogoutModal, setShowLogOutModal } = useProfileContext()

    const getProfile = async () => {
        await ProfileApi.getAllData()
        .then((res) => {
            const profileData = res.data as {
                data: IUserProfile
            }

            setProfile(profileData.data)
        })
        .catch((err) => {
            console.log(err.response);
            
            if (err.response && err.response.status === 401) {
                clearData()
            } else {
                errorProduce(err)
            }
        })
    }

    const refreshMainHome = async () => {
        await Promise.all([getProfile()])
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshMainHome();
        });
        const handleBackButton = () => {
            // Handle the back button press
            // You can add your own logic here before exiting the app if needed
            // For now, we are just exiting the app
            BackHandler.exitApp();
            return true; // Prevent default behavior (closing the app)
        };
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Remove event listener when the component is unmounted
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
          unsubscribe();
        };
    }, [navigation])

    return (
        <View className="h-full w-full flex flex-col gap-y-[18px]">
            { showLogoutModal && (
                <Logout/>
            ) }
            <SafeAreaView>
                <View className="w-full h-fit flex flex-row justify-center pt-[63px] pb-[32px]">
                    <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-[21px] text-gray-700">PROFILE</Text>
                </View>
                <View className="px-2 py-[14px] w-full flex flex-col gap-y-[2px] items-center">
                    <FontAwesome name="user-circle" size={64} color="gray" />
                    <View className="pt-[24px] flex flex-row gap-x-[2px] items-center w-full justify-center pl-[18px]">
                        <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-[18px] text-gray-700 capitalize">{ profile.nama } </Text>
                        <AntDesign name="checkcircle" size={18} color="orange" />
                    </View>
                    <Text>{ profile.nik }</Text>
                </View>
                <View className="w-full h-fit flex flex-col gap-y-[28px] items-center pt-[32px] px-[41px]">
                    <View className="w-full flex flex-row justify-between">
                        <Text className="text-gray-700 text-[14px]">Jenis Kelamin</Text>
                        <Text className="text-gray-700 text-[14px] capitalize">{ profile.jk }</Text>
                    </View>
                    <View className="w-full flex flex-row justify-between">
                        <Text className="text-gray-700 text-[14px]">Agama</Text>
                        <Text className="text-gray-700 text-[14px] capitalize">{ profile.agama }</Text>
                    </View>
                    <View className="w-full flex flex-row justify-between">
                        <Text className="text-gray-700 text-[14px]">Pekerjaan</Text>
                        <Text className="text-gray-700 text-[14px] capitalize">{ profile.pekerjaan }</Text>
                    </View>
                    <View className="w-full flex flex-row justify-between">
                        <Text className="text-gray-700 text-[14px]">Status Nikah</Text>
                        <Text className="text-gray-700 text-[14px] capitalize">{ profile.status_nikah ? "sudah nikah" : "belum nikah" }</Text>
                    </View>
                    <View className="w-full flex flex-row justify-between">
                        <Text className="text-gray-700 text-[14px]">Kewarganegaraan</Text>
                        <Text className="text-gray-700 text-[14px] capitalize">{ profile.kewarganegaraan }</Text>
                    </View>
                </View>
                <View className="flex flex-row w-full pt-[64px] justify-center">
                    <Pressable onPress={ () => {setShowLogOutModal(true)} } className="flex flex-row py-[8px] px-[24px] rounded-[11px] bg-red-700">
                        <Text className="text-white text-[18px]">Logout</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ProfileComp