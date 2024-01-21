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

    const handleInputChange = (fieldName: keyof IFormData, text: string) => {
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
        setFormStep(2)
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    return (
        <View>
            <TouchableWithoutFeedback
                onPress={() => {
                    handlePressOutside();
                }}
            >
                <ScrollView className="bg-white rounded-[4px] px-[18px] pb-[24px] flex flex-col gap-y-[18px] w-full h-[600px] shadow-md mt-[24px]">
                    <TextInput
                        editable={!isLoading}
                        value={registerForm.email}
                        onChangeText={(text) =>
                            handleInputChange("email", text)
                        }
                        className="py-[8px] px-[14px] w-full rounded-[11px] border-[1px] border-gray-300"
                        placeholder="Email"
                    />
                    <View className="py-[8px] pl-[14px] pr-[8px] rounded-[11px] border-[1px] border-gray-300 flex flex-row w-full justify-between items-center">
                        <TextInput
                            editable={!isLoading}
                            value={registerForm.password}
                            onChangeText={(text) =>
                                handleInputChange("password", text)
                            }
                            placeholder="Password"
                            secureTextEntry={passwordHide}
                            className="w-5/6"
                        />
                        <Pressable
                            className="w-[20px]"
                            onPress={() => {
                                setPasswordHide(!passwordHide);
                            }}
                        >
                            <MaterialIcons
                                name="keyboard-hide"
                                size={18}
                                color={passwordHide ? "gray" : "black"}
                            />
                        </Pressable>
                    </View>
                    <TextInput
                        editable={!isLoading}
                        value={registerForm.password_confirmation}
                        onChangeText={(text) =>
                            handleInputChange("password_confirmation", text)
                        }
                        className="py-[8px] px-[14px] rounded-[11px] border-[1px] border-gray-300 w-full"
                        placeholder="Ulangi password"
                        secureTextEntry={passwordHide}
                    />
                    <Text className="text-red-500 text-[11px]">
                        * Sertakan foto ktp anda untuk keperluan verifikasi
                        pihak admin terkait data diri anda
                    </Text>
                    <View className="flex flex-col gap-y-[2px] items-center">
                        <Pressable
                            disabled={!hasPermission}
                            onPress={() => {
                                navigation.navigate("Camera");
                            }}
                            className="flex flex-row p-[11px] rounded-[11px] border-[1px] border-gray-300"
                            style={
                                hasPermission
                                    ? { opacity: 30 }
                                    : { opacity: 100 }
                            }
                        >
                            <Feather name="camera" size={28} color="gray" />
                        </Pressable>
                        {!cameraImage && (
                            <View className="w-full h-[140px] flex flex-col justify-center items-center">
                                <Ionicons name="image-outline" size={70} color="gray" />
                                <Text className="text-gray-400">Belum ambil gambar</Text>
                            </View>
                        )}
                        {cameraImage && (
                            <View className="py-[18px] w-[270px] h-[200px]">
                                <Image
                                    source={{
                                        uri: cameraImage ? cameraImage : "",
                                    }}
                                    className="w-full h-full"
                                />
                            </View>
                        )}
                    </View>
                    <View className="w-full h-fit bg-white flex flex-row justify-center pb-[18px]">
                        {registerForm.email.length >= 5 &&
                            registerForm.password.length >= 5 &&
                            registerForm.password_confirmation.length >= 5 &&
                            cameraImage && (
                                <Pressable onPress={() => {continueProgress()}} className="py-[11px] px-[24px] h-fit w-fit rounded-[8px] bg-blue-700">
                                    <Text
                                        className="text-white text-[12px]"
                                        style={{
                                            fontFamily: "Montserrat-SemiBold",
                                        }}
                                    >
                                        Lanjutkan
                                    </Text>
                                </Pressable>
                            )}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Form1;
