import { LinearGradient } from "expo-linear-gradient"
import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const QuickAccessSkelton: React.FC  = () => {
    return (
        <View className="flex flex-row justify-center gap-x-6 h-[60px] w-full mt-8">
            <ShimmerPlaceholder className="w-[60px] h-full rounded-xl flex flex-col items-center justify-center" />
            <ShimmerPlaceholder className="w-[60px] h-full rounded-xl flex flex-col items-center justify-center" />
            <ShimmerPlaceholder className="w-[60px] h-full rounded-xl flex flex-col items-center justify-center" />
            <ShimmerPlaceholder className="w-[60px] h-full rounded-xl flex flex-col items-center justify-center" />
        </View>
    )
}

export default QuickAccessSkelton