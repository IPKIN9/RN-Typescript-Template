import React from "react";
import { Camera, CameraType } from 'expo-camera';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useGlobal } from "../../../store/GlobalStore";

const CameraComp: React.FC = () => {
    const { openCamera, setOpenCamera } = useGlobal()
    return (
        <View className=" w-full h-[600px] absolute z-10 top-0 right-0">
            <Camera style={styles.cameraContainer}></Camera>
            <View className="flex flex-col gap-y-[14px] items-center pt-[24px]">
                <Pressable onPress={() => {setOpenCamera(false)}} className="flex flex-row p-[18px] rounded-[11px] border-[1px] border-gray-300">
                   <Text className="text-[18px]">Close</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1
    }
  });
export default CameraComp;