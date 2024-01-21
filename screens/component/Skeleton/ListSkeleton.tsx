import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type SkeltonProps = {
    width: number;
};

const ListSkeleton: React.FC<SkeltonProps> = ({ width }) => {
    const translateX = useRef(new Animated.Value(-width)).current;
    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                useNativeDriver: true,
                duration: 1600,
            })
        ).start();
    }, [width]);
    return (
        <View className="flex flex-row justify-between py-2 px-2 w-full h-[200px]">
            <View className="w-[130px] h-3 rounded-lg bg-gray-200 overflow-hidden">
                <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.05)",
                            "transparent",
                        ]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
            <View className="w-[40px] h-3 rounded-lg bg-gray-200 overflow-hidden">
                <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(0,0,0,0.05)",
                            "transparent",
                        ]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default ListSkeleton;
