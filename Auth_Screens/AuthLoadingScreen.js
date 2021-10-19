import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import Background from "../Auth_Components/Background";
import { theme } from "../Auth_Core/theme";
import { FIREBASE_CONFIG } from "../Auth_Core/config";


import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'

// Initialize Firebase


const AuthLoadingScreen = ({ navigation }) => {
  
  auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      navigation.navigate("ImagePicker");
    } else {
      // User is not logged in
      navigation.navigate("HomeScreen");
    }
  });
  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.error} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
