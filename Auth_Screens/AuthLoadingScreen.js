import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import Background from "../Auth_Components/Background";
import { theme } from "../Auth_Core/theme";
import auth from '@react-native-firebase/auth'
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";



const AuthLoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  auth().onAuthStateChanged(async user => {
    if (user) {
      console.log(user)
      await dispatch(authenticate(user.uid,user.email,user.displayName))
      // User is logged in
      navigation.navigate("ImagePicker",{user:user});
    } else {
      // User is not logged in
      navigation.navigate("Welcome");
    }
  });
  return (
    <Background style={{justifyContent:'center'}}>
      <ActivityIndicator size="large" color={theme.colors.error} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
