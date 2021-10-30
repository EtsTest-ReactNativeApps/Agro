import React, { memo } from "react";
import Background from "../Auth_Components/Background";
import Logo from "../Auth_Components/Logo";
import Header from "../Auth_Components/Header";
import Button from "../Auth_Components/Button";
import Paragraph from "../Auth_Components/Paragraph";
import { theme } from "../Auth_Core/theme";
import {View,Pressable,Text, Dimensions,Image} from 'react-native'

const HomeScreen = ({ navigation }) => (
  <Background>
    <View style={{marginTop:Dimensions.get('screen').height*0.05}}>
      <Logo />
    </View>
    {/* <Text style={{color:theme.colors.primary,fontSize:25,fontWeight:'bold'}} >Pampas Login</Text> */}
    <View style={{marginTop:Dimensions.get('screen').height*0.05,width:'100%'}}>
      <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
        Login
      </Button>
      <Button
        mode="outlined"
        style={{borderColor:theme.colors.primary,borderWidth:5}}
        onPress={()=>setTimeout(() => navigation.navigate("RegisterScreen"),0)}
      >
        Sign Up
      </Button>
    </View>
    <View style={{alignItems:'center',padding:5,marginTop:25}}>
      <Text style={{fontWeight:'bold',marginBottom:5}}> Powered by</Text>
      <Image
        source = {require('../constants/pytorch.png')}
        style = {{width:80,height:80}}
        resizeMode = 'contain'
      />
    </View>
    {/* <View style={{width:'100%',borderRadius:50,borderColor:theme.colors.primary,
    borderWidth:2,
    height:40,justifyContent:'center',alignItems:'center'}}>
      <Pressable style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}
        onPress={()=>setTimeout(() => navigation.navigate("RegisterScreen"),0)}>
        <Text style={{color:theme.colors.primary,fontWeight:'900'}} >SIGN UP</Text>
      </Pressable>
    </View> */}
  </Background>
);

export default memo(HomeScreen);
