import React, { useEffect, useState } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native"
import Colors from "../../../shared/Colors"
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import Schedule from './../Schedule'
import CardSkeleton from '../Skeleton/CardSkeleton'
import QuickAccessSkelton from '../Skeleton/QuickAccessSkelton'
import ListSkeleton from '../Skeleton/ListSkeleton'
import { schedulesInterface, useHomeContext, HomeContextProvider } from '../../../store/HomeContextState'
import ScheduleApi from "../../../ucase/Schedule";
import moment from "moment";

const HomeComp: React.FC  = () => { 

    const { isLoading, setIsLoading, setScheduleList } = useHomeContext()
    const [dateNow, setDateNow] = useState('')

    const getScheduleData = async () => {
        setIsLoading(true)
        await ScheduleApi.getAllData({dokter_id: '', today: moment().format('YYYY-MM-DD')})
        .then((res) => {
            const schdules = res.data as {
                data: schedulesInterface[]
            }
            setScheduleList(schdules.data)
            console.log(schdules.data);   
        })
        .catch((err) => {
            console.error(err);
        })
    }
    useEffect(() => {
        moment.updateLocale('id', {
            months: [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ],
        });
          
        const currentDate = moment().format('DD MMMM');
        setDateNow(currentDate)
        getScheduleData()

        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, [])

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
                        <View className="h-full w-full rounded-3xl p-3 bg-orange-50 shadow-md shadow-gray-500 border-[1px] border-orange-400">
                            <View className="flex flex-row justify-between items-start">
                            <View className="flex flex-col items-start">
                                <Text style={{ fontFamily: 'Montserrat-Regular' }} className="text-[12px] text-gray-700">RS.Undata Palu</Text>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-gray-700">IRWANDI PAPUTUNGAN</Text>
                            </View>
                            <SimpleLineIcons name="options" size={18} color="#f97316" />
                            </View>
                            <Pressable className="flex flex-row justify-center items-center h-1/2 w-full mt-2">
                            <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-2xl mr-3 text-orange-500">882-733-716-2</Text>
                            <Feather name="copy" size={21} color="#f97316" />
                            </Pressable>
                            <View className="flex flex-row justify-end items-end mt-1">
                            <Text style={{ fontFamily: 'Montserrat-Regular' }} className="text-[12px]">26/8/23</Text>
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
                            <View className="w-[60px] h-full border-[1px] rounded-xl border-blue-500 bg-blue-400 flex flex-col items-center justify-center">
                                <Image source={require('./../../../assets/icons/schedule.png')} className="w-[30px] h-[30px]" />
                                <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-white text-[10px] mt-[1px]">Jadwal</Text>
                            </View>
                            <View className="w-[60px] h-full border-[1px] rounded-xl border-gray-300 flex flex-col items-center justify-center">
                                <Image source={require('./../../../assets/icons/doctor.png')} className="w-[30px] h-[30px] opacity-70" />
                                <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-blue-300 text-[10px] mt-[1px]">Dokter</Text>
                            </View>
                            <View className="w-[60px] h-full border-[1px] rounded-xl border-gray-300 flex flex-col items-center justify-center">
                                <Image source={require('./../../../assets/icons/list.png')} className="w-[30px] h-[30px] opacity-40" />
                                <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-blue-300 text-[10px] mt-[1px]">Riwayat</Text>
                            </View>
                            <View className="w-[60px] h-full border-[1px] rounded-xl border-gray-300 flex flex-col items-center justify-center">
                                <Image source={require('./../../../assets/icons/customer-service.png')} className="w-[30px] h-[30px] opacity-70" />
                                <Text style={{ fontFamily: 'Montserrat-SemiBold' }} className="text-blue-300 text-[10px] mt-[1px]">Bantuan</Text>
                            </View>
                            </View>
                        )}
                    </View>

                    <View className="h-full mt-11 pb-4 w-full px-2">
                        <View className="w-full flex flex-row justify-between items-center px-4">
                        <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-gray-700">JADWAL DOKTER</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold' }} className="text-gray-400 uppercase">{ dateNow }</Text>
                        </View>
                        
                        <View className="flex flex-col justify-start items-center px-2 mt-2">

                        {isLoading && (<ListSkeleton />)}

                        {!isLoading && (
                            <Schedule />
                        )}

                        </View>

                        {/* <View className="bg-gray-5 shadow-lg h-full py-6 rounded-md mt-2">
                        <DocktorList/>
                        </View> */}
                        
                    </View>
                    </SafeAreaView>
                </ScrollView>
                </View>
            </View>
        </View>
    )
}
    
export default HomeComp