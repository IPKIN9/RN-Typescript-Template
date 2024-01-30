import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";

type WaitingRoomScreenProp = {
    navigation: StackNavigationProp<any>; // Adjust the type based on your navigation stack
};

const WaitingRoom: React.FC<WaitingRoomScreenProp> = ({ navigation }) => {
    return (
        <View></View>
    )
}

export default WaitingRoom