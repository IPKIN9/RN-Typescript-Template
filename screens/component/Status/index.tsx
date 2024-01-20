import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraCom from "../../pages/Camera";
import { useGlobal } from "../../../store/GlobalStore";

type StatsScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const StatsComp: React.FC<StatsScreenProp> = ({ navigation }) => {
    const [passwordHide, setPasswordHide] = useState(true);
    const { cameraImage, setCameraImage } = useGlobal();

    const [stepRegist, setStepRegist] = useState("user");
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    return (
        <View>
            {stepRegist === "user" ? (
                <SafeAreaView>
                    <View className="px-[8px] pt-[24px] pb-[24px] flex flex-col gap-y-[18px]">
                        <Text
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                            className="text-[14px] pl-[10px]"
                        >
                            DAFTAR BARU
                        </Text>
                        <View className="bg-white rounded-[4px] px-[18px] pb-[24px] flex flex-col gap-y-[18px] w-full h-fit shadow-md">
                            <TextInput
                                className="py-[8px] px-[14px] rounded-[11px] border-[1px] border-gray-300"
                                placeholder="Username"
                            />
                            <View className="py-[8px] px-[14px] rounded-[11px] border-[1px] border-gray-300 flex flex-row justify-between items-center">
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry={passwordHide}
                                />
                                <Pressable
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
                            <Text className="text-red-500 text-[12px]">
                                * Sertakan foto ktp anda untuk keperluan
                                verifikasi pihak admin terkait data diri anda
                            </Text>
                            <View className="flex flex-col gap-y-[14px] items-center">
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
                                    <Feather
                                        name="camera"
                                        size={28}
                                        color="gray"
                                    />
                                </Pressable>
                                <View className="py-[20px] w-[270px] h-[200px]">
                                    {cameraImage && (
                                        <Image
                                            source={{
                                                uri: cameraImage
                                                    ? cameraImage
                                                    : "",
                                            }}
                                            className="w-full h-full"
                                        />
                                    )}
                                </View>
                            </View>
                            <View className="w-full h-fit bg-white flex flex-row justify-center pb-[24px]">
                                <Pressable className="py-[11px] px-[24px] h-fit w-fit rounded-[8px] bg-blue-700">
                                    <Text
                                        className="text-white text-[12px]"
                                        style={{
                                            fontFamily: "Montserrat-SemiBold",
                                        }}
                                    >
                                        Lanjutkan
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            ) : (
                <View></View>
            )}
        </View>
    );
};

export default StatsComp;
