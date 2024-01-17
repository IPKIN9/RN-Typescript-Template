import React, { useEffect } from "react";
import {
    View,
} from "react-native";
import { ProfileContextProvider } from "../../store/ProfileContextState";
import { StackNavigationProp } from "@react-navigation/stack";
import ProfileCom from '../component/Profile'

type LoginScreenProps = {
    navigation: StackNavigationProp<{}>;
  };

const Profile: React.FC<LoginScreenProps> = ({ navigation }) => {
    return (
        <ProfileContextProvider>
            <ProfileCom navigation={ navigation } />
        </ProfileContextProvider>
    );
};

export default Profile;
