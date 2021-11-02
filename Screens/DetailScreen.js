import React,{  useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, PermissionsAndroid, Platform, ScrollView, Text, ToastAndroid } from "react-native";
import { Dimensions, Pressable, View } from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"
import {DoubleCircleLoader, RippleLoader, TextLoader} from 'react-native-indicator'
import WeatherComponent from "./component/weatherComponent";
import { RNCamera } from "react-native-camera";
import ModalComponent from "./ModalComponent";

import diseases from './diseasesData'
import BottomHeaderDetail from "./BottomHeaderDetail";
import BottomDetailScreen from "./BottomDetailScreen";
const DetailScreen = props =>{
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const name=props.navigation.getParam('name')
    const uri=props.navigation.getParam('uri')
    const detect=props.navigation.getParam('detect')
   
    return <SafeAreaView style={{flex:1}}>

                <FlatList
                showsVerticalScrollIndicator={false}
                listKey='#hfuif'
                style={{width:width,height:height,backgroundColor:'white'}}            
                contentContainerStyle={{flexGrow:1,alignItems:'center'}} 
                ListHeaderComponent={<BottomHeaderDetail {...props} name={name} uri={uri} detect={detect} />} 
                ListFooterComponent={<BottomDetailScreen name={name} detect={detect.toLowerCase().replace(/ /g,'_').replace(/,/g,'').replace(/[()]/g,'')} />}/>        
            
            </SafeAreaView>
}

export default React.memo(DetailScreen);