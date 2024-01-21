import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from "react-native";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useGlobal } from "../../../store/GlobalStore";
import {
    IFormData,
    useRegisterContext,
} from "../../../store/RegisterContextState";
import { Picker } from "@react-native-picker/picker";

type Form1ScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const Form1: React.FC<Form1ScreenProp> = ({ navigation }) => {
    const [passwordHide, setPasswordHide] = useState(true);
    const { cameraImage, setCameraImage } = useGlobal();
    const {
        isLoading,
        setIsLoading,
        formStep,
        setFormStep,
        registerForm,
        setRegisterForm,
    } = useRegisterContext();

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const handleInputChange = (fieldName: keyof IFormData, text: string | number) => {
        setRegisterForm({
            ...registerForm, // Membuat salinan objek state yang ada
            [fieldName]: text, // Mengubah nilai pada field yang diinginkan
        });
    };

    const handlePressOutside = () => {
        // Mematikan keyboard
        Keyboard.dismiss();
    };

    const continueProgress = () => {
        setFormStep(2);
    };

    useEffect(() => { }, []);
    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    handlePressOutside();
                }}
            >
                <ScrollView className="bg-white rounded-[4px] px-[18px] pb-[24px] flex flex-col gap-y-[8px] w-full h-[560px] shadow-md mt-[24px]">
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Nomor Induk Ktp
                        </Text>
                        <TextInput
                            style={{ fontFamily: "Montserrat-Regular" }}
                            editable={!isLoading}
                            value={registerForm.nik}
                            onChangeText={(text) =>
                                handleInputChange("nik", text)
                            }
                            className="py-[8px] px-[14px] w-full rounded-[11px] border-[1px] border-gray-300"
                            placeholder="cth: 7101194437"
                        />
                    </View>
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Nama
                        </Text>
                        <TextInput
                            style={{ fontFamily: "Montserrat-Regular" }}
                            editable={!isLoading}
                            value={registerForm.nama}
                            onChangeText={(text) =>
                                handleInputChange("nama", text)
                            }
                            className="py-[8px] px-[14px] w-full rounded-[11px] border-[1px] border-gray-300"
                            placeholder="cth: aiman"
                        />
                    </View>
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Agama
                        </Text>
                        <View className=" w-full rounded-[11px] border-[1px] border-gray-300">
                            <Picker
                                selectedValue={registerForm.agama}
                                onValueChange={(itemValue) =>
                                    handleInputChange("agama", itemValue)
                                }
                            >
                                <Picker.Item label="Islam" value="islam" style={{fontSize: 14, color: 'gray'}} />
                                <Picker.Item label="Protestan" value="protestan" style={{fontSize: 14, color: 'gray'}} />
                                <Picker.Item label="Katolik" value="katolik" style={{fontSize: 14, color: 'gray'}} />
                                <Picker.Item label="Hindu" value="hindu" style={{fontSize: 14, color: 'gray'}} />
                                <Picker.Item label="Budha" value="budha" style={{fontSize: 14, color: 'gray'}} />
                                {/* Tambahkan item sesuai kebutuhan */}
                            </Picker>
                        </View>
                    </View>
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Jenis Kelamin
                        </Text>
                        <View className=" w-full rounded-[11px] border-[1px] border-gray-300">
                            <Picker
                                selectedValue={registerForm.jk}
                                onValueChange={(itemValue) =>
                                    handleInputChange("jk", itemValue)
                                }
                            >
                                <Picker.Item label="Pria" value="pria" style={{fontSize: 14, color: 'gray'}} />
                                <Picker.Item label="Wanita" value="wanita" style={{fontSize: 14, color: 'gray'}} />
                                {/* Tambahkan item sesuai kebutuhan */}
                            </Picker>
                        </View>
                    </View>
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Status Nikah
                        </Text>
                        <View className=" w-full rounded-[11px] border-[1px] border-gray-300">
                            <Picker
                                selectedValue={registerForm.status_nikah}
                                onValueChange={(itemValue) =>
                                    handleInputChange("status_nikah", itemValue)
                                }
                            >
                                <Picker.Item label="Belum" value={0} style={{fontSize: 14, color: 'gray'}} />
                                <Picker.Item label="Sudah" value={1} style={{fontSize: 14, color: 'gray'}} />
                                {/* Tambahkan item sesuai kebutuhan */}
                            </Picker>
                        </View>
                    </View>
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Pekerjaan
                        </Text>
                        <TextInput
                            style={{ fontFamily: "Montserrat-Regular" }}
                            editable={!isLoading}
                            value={registerForm.pekerjaan}
                            onChangeText={(text) =>
                                handleInputChange("pekerjaan", text)
                            }
                            className="py-[8px] px-[14px] w-full rounded-[11px] border-[1px] border-gray-300"
                            placeholder="cth: petani"
                        />
                    </View>
                    <View className="flex flex-col gap-y-[8px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Kewarga Negaraan
                        </Text>
                        <TextInput
                            style={{ fontFamily: "Montserrat-Regular" }}
                            editable={!isLoading}
                            value={registerForm.pekerjaan}
                            onChangeText={(text) =>
                                handleInputChange("kewarganegaraan", text)
                            }
                            className="py-[8px] px-[14px] w-full rounded-[11px] border-[1px] border-gray-300"
                            placeholder="cth: indonesia"
                        />
                    </View>
                    <View className="flex flex-col gap-y-[8px] pb-[20px]">
                        <Text
                            className="text-[12px] text-gray-500"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                            Alamat
                        </Text>
                        <TextInput
                            style={{ fontFamily: "Montserrat-Regular" }}
                            editable={!isLoading}
                            value={registerForm.pekerjaan}
                            onChangeText={(text) =>
                                handleInputChange("alamat", text)
                            }
                            className="py-[8px] px-[14px] w-full rounded-[11px] border-[1px] border-gray-300"
                            placeholder="cth: Jl. Asam Sutra"
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Form1;
