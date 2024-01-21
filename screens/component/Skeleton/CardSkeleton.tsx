import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Text, View, Animated } from "react-native";

type SkeltonProps = {
    width: number;
};

const CardSkeleton: React.FC<SkeltonProps> = ({ width }) => {
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
        <View className="p-[24px]">
            <View className="h-[180px] w-full rounded-[14px] bg-gray-200 overflow-hidden">
                <Animated.View
                    className="w-full h-full"
                    style={{ transform: [{ translateX: translateX }] }}
                >
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.03)", "transparent"]}
                        className="w-full h-full"
                        start={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default CardSkeleton;
