import { StackNavigationProp } from "@react-navigation/stack";
import { BackHandler, Image, Pressable, Text, View } from "react-native";
import VisitApi from "../../../ucase/Visit";
import { errorProduce } from "../../../util/ErrorLogConsoleReport";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import ScheduleApi from "../../../ucase/Schedule";
import moment from "moment";
import { schedulesInterface, useGlobal } from "../../../store/GlobalStore";
import { getData } from "../../../util/TokenConfig";

type VisitScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const Visit: React.FC<VisitScreenProp> = ({ navigation }) => {
    interface IAvaibleStatus {
        status: string;
        data: {
            id: number;
            no_registrasi: string;
            nama_poly: string;
            nama_ruangan: string;
            waktu_kunjungan: string;
        } | null;
    }
    interface IRegist {
        poly_id: number;
    }
    const [avaibleStatus, setAvaibleStatus] = useState<IAvaibleStatus>({
        status: "",
        data: null,
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [payload, setPayload] = useState<IRegist>({
        poly_id: 0,
    });
    const { setAuth, isAuth, scheduleList } = useGlobal()

    const navigateToLogin = () => {
        navigation.navigate("Login");
    };

    const handleInputChange = (
        fieldName: keyof IRegist,
        text: number
    ) => {
        setPayload({
            ...payload, // Membuat salinan objek state yang ada
            [fieldName]: text, // Mengubah nilai pada field yang diinginkan
        });
    };

    const checkLogin = async () => {
        setAuth(await getData() ? true : false)
    }

    const getAvaibleStatus = async () => {
        setLoading(true);
        await VisitApi.getAllData()
            .then((res) => {
                const avaible = res.data as {
                    data: IAvaibleStatus;
                };

                if (avaible.data.data) {
                    setAvaibleStatus({
                        status: avaible.data.status,
                        data: {
                            id: avaible.data.data.id,
                            nama_poly: avaible.data.data.nama_poly,
                            nama_ruangan: avaible.data.data.nama_ruangan,
                            no_registrasi: avaible.data.data.no_registrasi,
                            waktu_kunjungan: avaible.data.data.waktu_kunjungan,
                        },
                    });
                } else {
                    setAvaibleStatus({
                        status: "",
                        data: null,
                    });
                }
            })
            .catch((err: AxiosError) => {
                errorProduce(err);
            });
            setPayload({
                poly_id: scheduleList[0].id
            })
        setLoading(false);
    };

    const register = async () => {
        setLoading(true);
        await VisitApi.regist(payload)
            .then((Res) => {
                getAvaibleStatus();
            })
            .catch((err: AxiosError) => {
                errorProduce(err)
            });
            setLoading(false);
    };

    const refreshMainHome = async () => {
        await Promise.all([
            getAvaibleStatus()])
        checkLogin()
    };

    useEffect(() => {
        getAvaibleStatus();

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

    }, []);

    return (
        <View>
            {avaibleStatus.status !== "process" && (
                <View className="w-full h-full flex flex-col justify-start items-center px-8 gap-y-[24px] relative py-[120px]">
                    <View className="flex flex-col gap-y-[8px] w-full">
                        <View className="px-1">
                            <Text className="text-gray-500">
                                Pilih Poly Berobat
                            </Text>
                        </View>
                        <View className="w-full rounded-[11px] border-[1px] border-gray-300 bg-white">
                            <Picker
                                selectedValue={payload.poly_id}
                                onValueChange={(itemValue) =>
                                    handleInputChange("poly_id", itemValue as number)
                                }
                            >
                                {scheduleList.map(
                                    (option: schedulesInterface, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={option.nama_poly}
                                            value={option.poly_id}
                                            style={{
                                                fontSize: 14,
                                                color: "gray",
                                            }}
                                        />
                                    )
                                )}
                            </Picker>
                        </View>
                    </View>
                    <Pressable
                        disabled={isLoading}
                        onPress={() => {
                            register();
                        }}
                        className="px-[24px] py-[11px] rounded-md bg-blue-500"
                    >
                        <Text className="text-white">
                            {isLoading ? "MOHON TUNGGU..." : "DAFTAR"}
                        </Text>
                    </Pressable>
                </View>
            )}
            {avaibleStatus.status === "process" && (
                <View className="w-full h-full flex flex-col px-[24px] py-[32px] gap-y-[32px]">
                    <Text className="text-[14px]">
                        Registrasi sedang berlangsung
                    </Text>
                    <View className="flex flex-col gap-y-[2px] pt-[18px]">
                        <Text className="text-gray-500">No. Registrasi</Text>
                        <Text className="text-[24px]">
                            {avaibleStatus.data?.no_registrasi ?? ""}
                        </Text>
                    </View>
                    <View className="flex flex-col gap-y-[2px]">
                        <Text className="text-gray-500">Nama Poli</Text>
                        <Text className="text-[24px]">
                            {avaibleStatus.data?.nama_poly ?? ""}
                        </Text>
                    </View>
                    <View className="flex flex-col gap-y-[2px]">
                        <Text className="text-gray-500">Ruangan</Text>
                        <Text className="text-[24px]">
                            {avaibleStatus.data?.nama_ruangan ?? ""}
                        </Text>
                    </View>
                    <View className="flex flex-col gap-y-[2px]">
                        <Text className="text-gray-500">Waktu Kunjungan</Text>
                        <Text className="text-[24px]">
                            {avaibleStatus.data?.waktu_kunjungan ?? ""}
                        </Text>
                    </View>
                    <View className="pt-[24px]">
                        <Text>
                            Kamu bisa mendaftar kembali besok jika ingin
                            mendaftar ke poli lain.
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Visit;
