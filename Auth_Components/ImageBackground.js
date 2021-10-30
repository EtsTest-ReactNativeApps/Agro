import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import Colors from "../constants/Colors";

const ImgBackground = ({ children }) => (
  <ScrollView style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,backgroundColor:'white'}}>
    <ImageBackground
     resizeMode='cover'
      style={styles.background}
      source={require("../constants/AuthBg.png")}
    >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
  </ScrollView>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height,
    
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    
  }
});

export default memo(ImgBackground);