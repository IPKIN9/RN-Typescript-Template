import React, { useEffect } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../../shared/Colors"
import { ILoginPayload, useLoginContext } from '../../../store/LoginContextState'
import LoginApi from '../../../ucase/Login'
import { errorProduce } from '../../../util/ErrorLogConsoleReport'
import { StackNavigationProp } from "@react-navigation/stack";
import { storeData, getData } from '../../../util/TokenConfig'

type LoginFormProps = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
    const { isLoading, loginPayload, setIsLoading, setPageLoading, setLoginPayload } = useLoginContext()
    
    const handleInputChange = (fieldName: keyof ILoginPayload, text: string) => {
        setLoginPayload({
            ...loginPayload, // Membuat salinan objek state yang ada
            [fieldName]: text, // Mengubah nilai pada field yang diinginkan
        });
    };

    const checkForm = async () => {
        setIsLoading(true)
        await LoginApi.postData(loginPayload)
        .then(async (res) => {
            const data = res.data as {
                access_token: string
            }
            await storeData(data.access_token)

            setTimeout(() => {
                navigation.navigate('MainHome')
            }, 800);
        })
        .catch(error => {
             // handle error
            errorProduce(error)
        });
        setIsLoading(false)
    }

    const ifLogin = async () => {
        const token = await getData();

        if (token) {
            setTimeout(() => {
                navigation.navigate('MainHome')
            }, 800);
        }
    }

    useEffect(() => {
        ifLogin()
        setTimeout(() => {
            setIsLoading(false)
        }, 800);
    }, [])

    return (
        <View className="p-[24px] flex flex-col gap-y-[16px] items-center">
            <View className="flex flex-col items-center justify-end h-[240px] gap-y-[16px]">
                 <View className="flex flex-col gap-y-[8px] items-center">
                     <Image className="h-[48px] w-[48px]" source={require('./../../../assets/icons/rsud.png')} />
                     <Text className="text-[8px]" style={{ fontFamily: 'Montserrat-SemiBold' }}>LAYANAN DIGITAL RSUD UNDATA PALU</Text>
                 </View>
                 <Text className="text-[16px]" style={{ fontFamily: 'Montserrat-SemiBold' }}>SELAMAT DATANG KEMBALI</Text>
                 <Text className="text-center text-[12px] w-[280px]" style={{ fontFamily: 'Montserrat-Regular' }}>Silahkan login terlebih dahulu untuk melihat data registrasi dan riwayat kunjungan mu.</Text>
             </View>

             <View className="w-full h-[240px] justify-start flex flex-col gap-y-[24px]">
                 <View className="flex flex-col gap-y-[12px]">
                     <Text className="text-[12px] text-gray-500" style={{ fontFamily: 'Montserrat-SemiBold' }}>Username</Text>
                     <TextInput
                        value={loginPayload.username}
                        onChangeText={(text) => handleInputChange('username', text)}
                        className="px-[11px] py-[4px] border-[1px] border-gray-400 rounded-lg" placeholder="Cth. user@mail.com" />
                 </View>
                 <View className="flex flex-col gap-y-[12px]">
                     <Text className="text-[12px] text-gray-500" style={{ fontFamily: 'Montserrat-SemiBold' }}>Password</Text>
                     <TextInput 
                        onChangeText={(text) => handleInputChange('password', text)}
                        className="px-[11px] py-[4px] border-[1px] border-gray-400 rounded-lg" secureTextEntry placeholder="******" />
                 </View>
             </View>
             <View className="w-full">
                 <Pressable onPress={() => {checkForm()}} className={`px-[24px] py-[14px] rounded-[8px] ${isLoading ? 'bg-gray-300' : 'bg-blue-400'}`}>
                     <Text className="text-center text-white text-[12px]" style={{ fontFamily: 'Montserrat-SemiBold' }}>Sign In</Text>
                 </Pressable>
             </View>
        </View>
    )
}

export default LoginForm