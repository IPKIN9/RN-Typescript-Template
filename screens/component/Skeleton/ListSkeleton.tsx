import { LinearGradient } from "expo-linear-gradient"
import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const ListSkeleton: React.FC  = () => {
    return (
        <View className="grid grid-cols-2 justify-between gap-x-4 py-2 px-2 w-full">
            <ShimmerPlaceholder className="w-full rounded-lg" />
        </View>
    )
}

export default ListSkeleton