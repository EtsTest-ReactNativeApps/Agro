import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import Background from "../Auth_Components/Background";
import { theme } from "../Auth_Core/theme";
import auth from '@react-native-firebase/auth'



const AuthLoadingScreen = ({ navigation }) => {
  auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      navigation.navigate("ImagePicker",{user:user});
    } else {
      // User is not logged in
      navigation.navigate("Welcome");
    }
  });
  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.error} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
