import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { schedulesInterface, useHomeContext } from "../../store/HomeContextState";

function isCurrentTimeBetween(start: string, end: string): boolean {
  const currentTime = new Date();
  const startTime = new Date(currentTime);
  const endTime = new Date(currentTime);

  const [startHours, startMinutes] = start.split(":");
  startTime.setHours(parseInt(startHours, 10));
  startTime.setMinutes(parseInt(startMinutes, 10));

  const [endHours, endMinutes] = end.split(":");
  endTime.setHours(parseInt(endHours, 10));
  endTime.setMinutes(parseInt(endMinutes, 10));

  return currentTime >= startTime && currentTime <= endTime;
}

const RenderItem: React.FC<schedulesInterface> = ({ nama_poly, nama_ruangan, start_time, end_time }) => (
  <View className="flex flex-row justify-between py-2 px-2 w-full rounded-lg">
    <View className="flex flex-col justify-center gap-y-0">
      <Text className="text-[15px] text-gray-700 capitalize">Poly: {nama_poly}</Text>
      <Text className="text-[11px] text-gray-500 capitalize">Ruangan: {nama_ruangan}</Text>
    </View>
    <View className="flex flex-col justify-center">
      <Text className="text-[12px] text-gray-700">Buka {start_time}</Text>
      <Text className="text-[12px] text-gray-700">Tutup {end_time}</Text>
    </View>
  </View>
);

const Schedule: React.FC = () => {
  const { isLoading, scheduleList } = useHomeContext()
  const renderedItem = () => {
    return scheduleList.map((item, index) => (
      <RenderItem key={index} {...item} />
    ));
  };

  return renderedItem()
};

export default Schedule;