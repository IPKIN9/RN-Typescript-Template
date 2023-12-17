import React, { useEffect, useState } from "react"
import { BackHandler, Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import Colors from "../../../shared/Colors"
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import Schedule from './../Schedule'
import DoctorList from './../DocktorList'
import CardSkeleton from '../Skeleton/CardSkeleton'
import QuickAccessSkelton from '../Skeleton/QuickAccessSkelton'
import ListSkeleton from '../Skeleton/ListSkeleton'
import { schedulesInterface, useHomeContext, HomeContextProvider, doctorInterface, IMedicalCardInterface } from '../../../store/HomeContextState'
import ScheduleApi from "../../../ucase/Schedule";
import DoctorApi from "../../../ucase/Doctor";
import moment from "moment";
import { errorProduce } from '../../../util/ErrorLogConsoleReport'
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { Easing, useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { clearData, getData } from "../../../util/TokenConfig";
import MedicalCardApi from '../../../ucase/MedicalCard'
import { useIsFocused } from "@react-navigation/native";

type LoginFormProps = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const HomeComp: React.FC<LoginFormProps>  = ({ navigation }) => { 
    const isFocused = useIsFocused();
    const { isLoading, setIsLoading, setScheduleList, scheduleList, setDoctorList, medicalCard, setMedicalCard } = useHomeContext()
    const [dateNow, setDateNow] = useState('')
    const [quickAccess, setQuickAccess] = useState(1)
    const [listSkelton, setListSkelton] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const checkLogin = async () => {
        setIsLogin(await getData() ? true : false)
    }

    const getMedicalCard = async () => {
        await MedicalCardApi.getAllData()
        .then((res) => {
            const medicalCard = res.data as {
                data: IMedicalCardInterface
            }
            setMedicalCard(medicalCard.data)
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

    const getScheduleData = async () => {
        setListSkelton(true)
        setQuickAccess(1)
        await ScheduleApi.getAllData({dokter_id: '', today: moment().format('YYYY-DD-MM')})
        .then((res) => {
            if (res.data) {
                const schdules = res.data as {
                    data: schedulesInterface[]
                }
                setScheduleList(schdules.data)
            }
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                clearData()
                navigation.navigate('Login')
            } else {
                errorProduce(err)
            }
        })

        setTimeout(() => {
            setListSkelton(false)
        }, 800);
    }

    const getDoctorData = async () => {
        setListSkelton(true)
        setQuickAccess(2)
        await DoctorApi.getAllData()
        .then((res) => {
            const schdules = res.data as {
                data: doctorInterface[]
            }
            setDoctorList(schdules.data)
        })
        .catch((err) => {
            errorProduce(err)
        })

        setTimeout(() => {
            setListSkelton(false)
        }, 800);
    }

    const refreshMainHome = async () => {
        setIsLoading(true)
        await Promise.all([
            getScheduleData(),
            getMedicalCard()])
        checkLogin()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    };

    useEffect(() => {
        moment.updateLocale('id', {
            months: [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ],
        });
          
        const currentDate = moment().format('DD MMMM');
        setDateNow(currentDate)

        const unsubscribe = navigation.addListener('focus', () => {
            refreshMainHome();
        });
    
        // Membersihkan listener saat komponen tidak lagi terfokus

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
        <View>
            <View className="h-full w-full bg-gray-100">
                <View className="fixed w-full h-1/3 rounded-bl-[41px] flex flex-row justify-center" style={{backgroundColor: Colors.primary.two}}>
                <View className="flex flex-col items-start h-full justify-center mt-1">
                    <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-[18px] text-white">Halo, Mamang</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold' }} className="mt-1 text-[18px] text-white">Lagi butuh apa hari ini?</Text>
                    <View className="mt-8">
                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-[13px] text-white">Cek jadwal dokter hari ini...</Text>
                    </View>
                </View>
                <View className="w-12 h-14 absolute z-0 right-0 bottom-[-50px]" style={{backgroundColor: Colors.primary.two}}></View>
                </View>
                <View className="relative w-full h-[480px] bg-gray-50 rounded-tr-[41px] px-0 overflow-hidden">
                <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                    {isLoading && (
                        <CardSkeleton />
                    )}

                   {!isLoading && (
                     <View className="h-[180px] w-full mt-12 px-4 py-2 ">
                        <View className={`h-full w-full rounded-3xl p-3 shadow-md shadow-gray-500 border-[1px] ${isLogin ? 'border-orange-400 bg-orange-50' : 'border-blue-400 bg-blue-50'}`}>
                            <View className="flex flex-row justify-between items-start">
                            <View className="flex flex-col items-start">
                                <Text style={{ fontFamily: 'Montserrat-Regular' }} className="text-[12px] text-gray-700">RS.Undata Palu</Text>
                                {medicalCard.id >= 1 && (
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-gray-700">{medicalCard.nama_profile}</Text>
                                )}
                            </View>
                            <SimpleLineIcons name="options" size={18} color="#f97316" />
                            </View>
                            <Pressable className="flex flex-row justify-center items-center h-1/2 w-full mt-2">
                            <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className={`mr-3 text-xl ${isLogin ? 'text-orange-500' : 'text-blue-400'} mt-2`}>{ isLogin && medicalCard.id >= 1 ? medicalCard.no_rm : !isLogin ? 'Login Terlebih Dahulu' : 'Kamu Belum Daftar' }</Text>
                            { medicalCard.id >= 1 && (
                                <Feather name="copy" size={21} color="#f97316" />
                            ) }
                            </Pressable>
                            <View className="flex flex-row justify-end items-end mt-1">
                            <Text style={{ fontFamily: 'Montserrat-Regular' }} className="text-[12px]">{medicalCard.tl}</Text>
                            </View>
                        </View>
                        <View className="absolute w-[80px] h-[60px] z-0 top-0 left-2 rounded-tl-[31px] border-t-2 border-l-2 border-orange-400 bg-transparent" />
                        <View className="absolute w-[80px] h-[60px] z-0 bottom-0 right-2 rounded-br-[31px] border-b-2 border-r-2 border-orange-400 bg-transparent" />
                     </View>
                   )}

                    <SafeAreaView>
                    <View className="w-full flex flex-col items-center justify-start mt-8">
                        <View className="w-full flex flex-row justify-between px-4">
                        <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-gray-700">QUICK ACCESS</Text>
                        </View>

                        {isLoading && (<QuickAccessSkelton />)}

                        {!isLoading && (
                            <View className="flex flex-row justify-center gap-x-6 h-[60px] w-full mt-8">
                            <Pressable onPress={() => {getScheduleData()}}>
                                <View className={`w-[60px] h-full border-[1px] rounded-xl ${quickAccess === 1 ? 'border-blue-500 bg-blue-400' : 'border-gray-300'} flex flex-col items-center justify-center`}>
                                    <Image source={require('./../../../assets/icons/schedule.png')} className="w-[30px] h-[30px]" />
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className={`${quickAccess === 1 ? 'text-white' : 'text-blue-300'} text-[10px] mt-[1px]`}>Jadwal</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => {getDoctorData()}}>
                                <View className={`w-[60px] h-full border-[1px] rounded-xl ${quickAccess === 2 ? 'border-blue-500 bg-blue-400' : 'border-gray-300'} flex flex-col items-center justify-center`}>
                                    <Image source={require('./../../../assets/icons/doctor.png')} className="w-[30px] h-[30px]" />
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className={`${quickAccess === 2 ? 'text-white' : 'text-blue-300'} text-[10px] mt-[1px]`}>Dokter</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => {setQuickAccess(3)}}>
                                <View className={`w-[60px] h-full border-[1px] rounded-xl ${quickAccess === 3 ? 'border-blue-500 bg-blue-400' : 'border-gray-300'} flex flex-col items-center justify-center`}>
                                    <Image source={require('./../../../assets/icons/list.png')} className="w-[30px] h-[30px]" />
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className={`${quickAccess === 3 ? 'text-white' : 'text-blue-300'} text-[10px] mt-[1px]`}>Riwayat</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => {setQuickAccess(4)}}>
                                <View className={`w-[60px] h-full border-[1px] rounded-xl ${quickAccess === 4 ? 'border-blue-500 bg-blue-400' : 'border-gray-300'} flex flex-col items-center justify-center`}>
                                    <Image source={require('./../../../assets/icons/customer-service.png')} className="w-[30px] h-[30px]" />
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className={`${quickAccess === 4 ? 'text-white' : 'text-blue-300'} text-[10px] mt-[1px]`}>Petunjuk</Text>
                                </View>
                            </Pressable>
                            </View>
                        )}
                    </View>

                    <View className="h-full mt-11 pb-4 w-full px-2">
                        <View className="w-full flex flex-row justify-between items-center px-4">
                        <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-gray-700">{ quickAccess === 1 ? 'JADWAL' : quickAccess === 2 ? 'DOKTER' : quickAccess === 3 ? 'Riwayat' : 'Petunjuk' }</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-gray-400 uppercase">{ quickAccess === 1 ? dateNow : '' }</Text>
                        </View>
                        
                        <View className="flex flex-col justify-start items-center px-2 mt-2">

                            {(isLoading || listSkelton) && <ListSkeleton />}

                            {!isLoading && quickAccess === 1 && scheduleList.length >= 1 && (
                            <Schedule />
                            )}

                            {!isLoading && !listSkelton && quickAccess === 1 && scheduleList.length === 0 && (
                            <View className="w-full flex flex-row justify-center items-center h-[200px]">
                                <Text style={{ color: '#888', fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
                                Tidak ada jadwal hari ini.
                                </Text>
                            </View>
                            )}

                        </View>

                        {!isLoading && !listSkelton && quickAccess === 2 && (
                            <View className="bg-gray-50 bg-none shadow-lg h-full py-6 rounded-md mt-2">
                                <DoctorList/>
                            </View>
                        )}

                        {!isLoading && !listSkelton && quickAccess === 3 && (
                            <View>
                                
                            </View>
                        )}
                        
                    </View>
                    </SafeAreaView>
                </ScrollView>
                </View>
            </View>
        </View>
    )
}
    
export default HomeComp