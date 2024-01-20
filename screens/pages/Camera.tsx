import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import {
    Alert,
    BackHandler,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useGlobal } from "../../store/GlobalStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const CameraComp: React.FC = ({}) => {
    const navigation: any = useNavigation();
    const {cameraImage, setCameraImage} = useGlobal()

    const [valFlashMode, setFlashMode] = useState<any>(FlashMode.off);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                // Mengambil URI dari gambar pertama dalam array assets
                setCameraImage(result.assets[0].uri);
                navigation.navigate("MainHome");
            }
        } catch (error) {
            console.error("Error picking an image", error);
            Alert.alert("Error", "Gagal memilih gambar dari galeri.");
        }
    };

    const cameraRef = useRef<Camera>(null);

    const handleCapture = async () => {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync();
          setCameraImage(photo.uri);
          navigation.navigate("MainHome");
        }
      };

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                console.error("Izin akses ke galeri tidak diberikan!");
            }
        })();

        const handleBackButton = () => {
            navigation.navigate("MainHome");
            return true; // Prevent default behavior (closing the app)
        };
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);

        // Remove event listener when the component is unmounted
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackButton
            );
        };
    }, []);

    return (
        <View className=" w-full h-full relative">
            <View className="w-full h-[80px] bg-black">
                <Text>tutup</Text>
            </View>
            <Camera
                ref={cameraRef}
                flashMode={valFlashMode}
                style={styles.cameraContainer}
            ></Camera>
            <View className="w-full h-[230px] bg-black flex flex-row justify-around items-center">
                {cameraImage && (
                    <Pressable
                        onPress={() => {
                            pickImage();
                        }}
                    >
                        <Image
                            source={{ uri: cameraImage }}
                            className="w-[32px] h-[32px]"
                        />
                    </Pressable>
                )}
                {!cameraImage && (
                    <Pressable
                        onPress={() => {
                            pickImage();
                        }}
                        className="w-fit h-fit p-3 border-[1px] border-white rounded-full"
                    >
                        <Feather name="image" size={18} color="white" />
                    </Pressable>
                )}
                <Pressable onPress={() => {handleCapture()}} className="w-fit h-fit rounded-full border-[1px] border-white p-3">
                    <View className="w-9 h-9 rounded-full bg-white"></View>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setFlashMode(
                            valFlashMode === FlashMode.torch
                                ? FlashMode.off
                                : FlashMode.torch
                        );
                    }}
                    style={
                        valFlashMode === FlashMode.torch
                            ? { backgroundColor: "white" }
                            : { backgroundColor: "transparent" }
                    }
                    className="w-fit h-fit p-3 border-[1px] border-white rounded-full"
                >
                    <MaterialCommunityIcons
                        name="flashlight"
                        size={18}
                        color={
                            valFlashMode === FlashMode.torch ? "black" : "white"
                        }
                    />
                </Pressable>
            </View>
            <View className="h-full w-full absolute top-0 right-0 flex flex-col items-center pt-[200px] gap-y-[24px]">
                <View className="w-5/6 h-[190px] rounded-[4px] border-[2px] border-white flex flex-row items-center justify-end px-[20px] pb-[17px]">
                    <View className="w-[65px] h-[98px] border-[1px] border-white rounded-[4px]"></View>
                </View>
                <Text
                    className="text-white text-[12px] text-center w-4/6"
                    style={{ fontFamily: "Montserrat-Regular" }}
                >
                    Pastikan posisi ktp berada dalam kotak yang sudah diatur
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
    },
});
export default CameraComp;
