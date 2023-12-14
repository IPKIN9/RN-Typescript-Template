import React, { useEffect } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../shared/Colors"
import { LoginContextProvider } from '../../store/LoginContextState'
import LoginForm from '../component/Login'
import { StackNavigationProp } from "@react-navigation/stack";
// import { getUserToken } from '../../util/TokenConfig'

type LoginScreenProps = {
    navigation: StackNavigationProp<{}>;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {

    return (
        <LoginContextProvider>
            <LoginForm navigation={navigation}/>
        </LoginContextProvider>
    )
}

export default Login