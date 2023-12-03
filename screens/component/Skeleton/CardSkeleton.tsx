import { LinearGradient } from "expo-linear-gradient"
import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const CardSkeleton: React.FC  = () => {
    return (
        <View className="p-[24px]">
            <ShimmerPlaceholder className="h-[180px] w-full rounded-[14px] bg-gray-200" />
        </View>
    )
}

export default CardSkeleton