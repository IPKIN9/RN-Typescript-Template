import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface IScheduleList {
  name: string;
  poli: string;
  start: string;
  end: string;
}

interface IListItem {
  item: IScheduleList;
}

const itemList: IScheduleList[] = [
  {
    name: "Nazar",
    poli: "Jiwa",
    start: "08:00:00",
    end: "10:00:00",
  },
  {
    name: "Tola",
    poli: "Jiwa",
    start: "08:00:00",
    end: "10:00:00",
  },
  {
    name: "Paputungan",
    poli: "Jiwa",
    start: "08:00:00",
    end: "10:00:00",
  },
];

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


const RenderItem: React.FC<IListItem> = ({ item }) => (
  <View className="flex flex-row justify-between py-2 px-2 w-full rounded-lg">
    <View className="flex flex-col justify-center gap-y-0">
      <Text className="text-[15px] text-gray-700">{item.name}</Text>
      <Text className="text-[11px] text-gray-500">{item.poli}</Text>
    </View>
    <View className="flex flex-col justify-center">
      <Text className="text-[12px] text-gray-700">{item.start}</Text>
      <Text className="text-[12px] text-gray-700">{item.end}</Text>
    </View>
  </View>
);

const Schedule: React.FC = () => {
  const renderedItem = () => {
    return itemList.map((item, index) => (
      <RenderItem key={index} item={item} />
    ));
  };

  return renderedItem()
};

export default Schedule;