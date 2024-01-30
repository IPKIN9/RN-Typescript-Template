import React from "react";
import { Text, View } from "react-native";
import { IVisitHistory, useHomeContext } from "../../store/HomeContextState";

const RenderItem: React.FC<IVisitHistory> = ({ no_registrasi, tgl, ket }) => (
    <View className="pt-2 pb-8 px-2 w-full rounded-lg flex-col gap-y-2">
        <View className="flex flex-row items-start justify-between w-full">
            <View className="flex flex-col justify-center gap-y-0">
                <Text className="text-[11px] text-gray-500 capitalize">
                    No. Registrasi
                </Text>
                <Text className="text-[15px] text-gray-700 font-semibold capitalize">
                    {no_registrasi}
                </Text>
            </View>
            <View className="flex flex-col justify-center">
                <Text className="text-[15px] text-gray-700">{tgl}</Text>
            </View>
        </View>
        <Text className="text-[12px]">{ket}</Text>
    </View>
);

const VisitHistory: React.FC = () => {
    const { isLoading, visitHistory } = useHomeContext();
    const renderedItem = () => {
        console.log("ini visit", visitHistory);

        return visitHistory.map((item, index) => (
            <RenderItem key={index} {...item} />
        ));
    };

    return renderedItem();
};
export default VisitHistory;
