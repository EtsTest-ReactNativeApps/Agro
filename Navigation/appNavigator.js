import React from 'react';
import { Image, Platform, SafeAreaView, View,Text } from 'react-native';


import Colors from '../constants/Colors';
import AppDashboard from '../Screens/Dashboard';
import PreDetectScreen from '../Screens/PreDetectScreen';

import {logoutUser} from "../api/auth-api";


import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    AuthLoadingScreen,
    Dashboard
  } from "../Auth_Screens";

import { useSelector } from 'react-redux';
import Drawer from '../Components/drawer';

import DetailScreen from '../Screens/DetailScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import CropRecommender from '../Screens/CropRecommender';
import Welcome from '../Screens/Welcome';
const AppNavigator=createStackNavigator({
    Dashboard:AppDashboard,
    PreDetectScreen:PreDetectScreen,
    DetailScreen:DetailScreen,
    CropRecommender:CropRecommender
    },{headerMode:'none'});
    const AuthNavigator=createStackNavigator({
        HomeScreen,
        LoginScreen,
        RegisterScreen,
        ForgotPasswordScreen,
        Dashboard,
        AuthLoadingScreen,
        Welcome
    },{
        initialRouteName:'AuthLoadingScreen',
        headerMode:'none'
    });
     const DrawerNavigator=createDrawerNavigator({
        Home:{screen:AppNavigator,
            navigationOptions:{
            drawerIcon:drawerInfo => <View  style={{width:25,height:25}}>
                <Image source={require('../constants/home.png')} style={{width:'100%',height:'100%',tintColor:drawerInfo.tintColor}}/>
                </View>
        }},
        logout:{screen:Dashboard,
            navigationOptions:(props)=>{
                return ({drawerIcon:drawerInfo =><View  style={{width:25,height:25}}>
                 <Image source={require('../constants/exit.png')} style={{width:'100%',height:'100%',tintColor:drawerInfo.tintColor}}
                /></View>})
            }}
    },{drawerWidth:'65%',    
         contentOptions:{
            activeTintColor:Colors.primary,
            inactiveTintColor:'grey',
            itemStyle:{justifyContent:'space-between',alignItems:'center',width:'100%'}
        },contentComponent:props=>{
            return (<SafeAreaView>
                        <Drawer {...props} />
                        <DrawerItems {...props} />
                    </SafeAreaView>)
        }
    });
    const MainAppNavigator=createSwitchNavigator({
        // Startup:startupScreen,
        // Start:OnBoardScreen,
        Auth:AuthNavigator,
        ImagePicker:DrawerNavigator
    })
export default createAppContainer(MainAppNavigator);