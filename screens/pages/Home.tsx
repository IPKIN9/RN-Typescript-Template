import React, { useEffect } from "react"
import { HomeContextProvider } from '../../store/HomeContextState'
import HomeComp from '../component/Home'
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenProps = {
  navigation: StackNavigationProp<{}>;
};

const Home: React.FC<LoginScreenProps>  = ({ navigation }) => {
  return (
    <HomeContextProvider>
      <HomeComp navigation={navigation}/>
    </HomeContextProvider>
  )
}

export default Home