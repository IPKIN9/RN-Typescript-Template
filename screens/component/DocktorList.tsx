import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { doctorInterface, useHomeContext } from "../../store/HomeContextState";

interface ChessboardData {
  key: string | number;
  name: string;
  img: any; // Ubah tipe img sesuai dengan kebutuhan Anda
}

const truncateString = (inputString: string, maxLength: number) => {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + '...';
  }
  return inputString;
}

interface RenderItemProps {
  item: ChessboardData;
}

const RenderItem: React.FC<RenderItemProps> = ({ item }) => (
  <View className='flex flex-col items-center justify-center mt-4'>
    <View className='border-[1px] border-gray-500 z-0 absolute bottom-[-5px] w-[80px] h-[35px] rounded-md'></View>
    <Image source={item.img} className='h-[60px] w-[60px]' />
    <Text className='text-[10px] max-w-[80px] text-center capitalize'>{truncateString(item.name , 21)}</Text>
  </View>
);

const DoctorList: React.FC = () => {
  const { isLoading, doctorList } = useHomeContext()
  const data: ChessboardData[] = doctorList.map((item, index) => {
    return { key: (index + 1), name: item.nama, img: item.jk === 'pria' ? require('./../../assets/icons/doctor.png') : require('./../../assets/icons/doctor2.png') }
  })

  const chunkArray = (arr: ChessboardData[], chunkSize: number) => {
    const chunkedArray: ChessboardData[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const renderChessboard = () => {
    const chunkedData = chunkArray(data, 3); // Mengelompokkan data menjadi baris-baris dengan maksimum 3 data per baris

    return chunkedData.map((row, rowIndex) => (
      <View className='flex flex-row justify-around px-4' key={rowIndex}>
        {row.map((item) => (
          <RenderItem key={item.key} item={item} />
        ))}
      </View>
    ));
  };

  return (
    renderChessboard()
  );
};

export default DoctorList;
