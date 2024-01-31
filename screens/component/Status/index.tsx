import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
    BackHandler,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useGlobal } from "../../../store/GlobalStore";
import { useRegisterContext } from "../../../store/RegisterContextState";
import Form1 from "./Form1";
import Form2 from "./Form2";
import WaitingRoom from "./WaitingRoom"
import Visit from "./Visit"
import { getData } from "../../../util/TokenConfig";

type StatsScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const StatsComp: React.FC<StatsScreenProp> = ({ navigation }) => {
    const { formStep, setFormStep } = useRegisterContext();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const { setAuth, isAuth, scheduleList } = useGlobal()

    const checkLogin = async () => {
        setAuth(await getData() ? true : false)
    }

    const refreshMainHome = async () => {
        checkLogin()
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();

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
            <SafeAreaView>
                {!isAuth ?
                    <View className="px-[8px] pt-[24px] pb-[24px] flex flex-col">
                        <View className="flex flex-row justify-between pr-[4px]">
                            <Text
                                style={{ fontFamily: "Montserrat-SemiBold" }}
                                className="text-[14px] pl-[10px]"
                            >
                                { formStep !== 3 ? "DAFTAR BARU" : "" }
                            </Text>
                            {formStep !== 1 && (
                                <Pressable
                                    onPress={() => {
                                        setFormStep(1);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Montserrat-Regular",
                                        }}
                                        className="text-[14px] pl-[10px] text-blue-700"
                                    >
                                        Kembali
                                    </Text>
                                </Pressable>
                            )}
                        </View>

                        {formStep === 1 ? (
                            <Form1 navigation={navigation} />
                        ) : formStep === 2 ? (
                            <Form2 navigation={navigation}></Form2>
                        ) : (
                            <WaitingRoom navigation={navigation} />
                        )}
                    </View>
                    :
                    <Visit navigation={navigation} />
                }
            </SafeAreaView>
        </View>
    );
};

export default StatsComp;
