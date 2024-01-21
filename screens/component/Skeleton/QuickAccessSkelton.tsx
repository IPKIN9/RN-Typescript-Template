import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type SkeltonProps = {
    width: number;
};

const QuickAccessSkelton: React.FC<SkeltonProps> = ({ width }) => {
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                useNativeDriver: true,
                duration: 1000,
            })
        ).start();
    }, [width]);
    return (
        <View className="flex flex-row justify-center gap-x-6 h-[60px] w-full mt-8">
            <View className="bg-gray-200 w-[60px] h-full rounded-xl flex flex-col items-center justify-center overflow-hidden">
                <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.03)",
                        ]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
            <View className="bg-gray-200 w-[60px] h-full rounded-xl flex flex-col items-center justify-center overflow-hidden">
            <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.03)",
                        ]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
            <View className="bg-gray-200 w-[60px] h-full rounded-xl flex flex-col items-center justify-center overflow-hidden">
            <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.03)",
                        ]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
            <View className="bg-gray-200 w-[60px] h-full rounded-xl flex flex-col items-center justify-center overflow-hidden">
            <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.03)",
                        ]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default QuickAccessSkelton;
