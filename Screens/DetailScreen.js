import React,{  useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, PermissionsAndroid, Platform, ScrollView, Text, ToastAndroid } from "react-native";
import { Dimensions, Pressable, View } from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Next from '../constants/next.png'

import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"
import {DoubleCircleLoader, RippleLoader, TextLoader} from 'react-native-indicator'
import WeatherComponent from "./component/weatherComponent";
import { RNCamera } from "react-native-camera";
import ModalComponent from "./ModalComponent";

import diseases from './diseasesData'
const DetailScreen = props =>{
  const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const name=props.navigation.getParam('name')
    const uri=props.navigation.getParam('uri')
    const detect=props.navigation.getParam('detect')
    const [pressed,setPressed]=useState(false)
    return <SafeAreaView style={{flex:1}}>        
            <ScrollView style={{width:width,height:height,backgroundColor:'#F8F8F8'}} contentContainerStyle={{alignItems:'center',padding:12,justifyContent:'flex-start'}}>
                <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginTop:height*0.02}}>
                    <Pressable onPress={()=>props.navigation.goBack()} style={{width:width*0.1,
                        justifyContent:'center',
                        alignItems:'center',backgroundColor:'white',
                        padding:12,
                        height:width*0.1,borderRadius:width*0.1,elevation:5,
                        shadowColor:'black',shadowOpacity:5,shadowRadius:5}}>
                            <Image source={Next} style={{width:'100%',height:'100%'}} />                        
                    </Pressable>
                </View>
                <View style={{
                    width:width*.95,
                    height:height*.25,
                    borderRadius:20,
                    marginTop:20,
                    overflow:'hidden'}} >
                    <Image source={{uri:uri}}  
                    style={{width:'100%',height:'100%'}}/>
                </View>
                <View style={{height:height*0.1,width:'100%',marginTop:20,
                marginBottom:30,
                flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{
                           width:height*0.1,
                           height:height*0.1,
                           borderRadius:height*0.1,
                           elevation:3,
                           padding:5,
                           backgroundColor:'white',
                           justifyContent:'center',
                           alignItems:'center',
                           shadowColor:'black',
                           shadowOffset:{width:0,height:4},
                           shadowOpacity:0.4,
                           shadowRadius:4}}>
                            <View style={{width:height*0.07,height:height*0.07}}>
                            <Image source={name === 'wheat'?require("../constants/wheat.png"):
                                name === 'rice' ? require("../constants/rice.png") :
                                name === 'corn' ? require("../constants/corn.png") : 
                                name === 'leaf' ? require("../constants/leaf.png") :
                                name === 'fruit' ? require("../constants/fruit.png") :
                                name === 'cotton' ? require("../constants/cotton.png") :
                                name === 'okra' ? require("../constants/okra.png"):null } 
                                style={{width:'100%',height:'100%'}}/>
                            </View>
                    </View>     
                   <View style={{height:'100%', marginRight:10}}>
                       <View style={{
                           height:height*0.056,
                           borderRadius:15,
                          
                           marginTop:25,
                           elevation:1,
                           paddingHorizontal:15,
                           backgroundColor:detect.toLowerCase().includes('ealthy')?'#C7F0AF':'#E89F9F',
                           justifyContent:'center',
                           alignItems:'center',
                           shadowColor:'black',
                           shadowOffset:{width:0,height:4},
                           shadowOpacity:0.4,
                           shadowRadius:4}}>
                               <Text style={{fontFamily:'Sora-Regular',letterSpacing:1.3,fontSize:16,
                               color:detect.toLowerCase().includes('ealthy')?'#2A8B31':'#B00000'}}>
                                 {detect.replace(/[()]/g,'').replace(/_/g,' ').replace(/,/g,'')} detection
                                </Text>
                        </View>                        
                    </View>                      
                </View>
                <View style={{height:height*0.4,width:'100%'}} >
                    <Text style={{letterSpacing:1,lineHeight:25,fontSize:15,color:'#898989',
                    fontFamily:'Sora-Regular'}}>
                        {diseases[detect.toLowerCase().replace(/ /g,'_').replace(/,/g,'').replace(/[()]/g,'')]}
                    </Text>
                </View>
                <Text style={{fontFamily:'Sora-Regular',textAlign:'left',marginVertical:10,fontSize:13,color:'#3C3A3A'}}>
                    Symptoms
                </Text>
                <View style={{width:'100%'}}>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                    <Image source={require('../constants/check.png')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={{width:width*0.8,flexDirection:'column',justifyContent:'flex-start'}}>
                    <View>
                        <Text style={{
                            fontFamily:'Sora-Regular',
                            letterSpacing:1.2,
                            fontSize:12,
                            lineHeight:16,
                            fontWeight:'500',
                            color:'#898989',
                            }}> Lesions may form in bands across leaves as a result of an infection in the whorl. 
                            </Text>
                    </View>
                </View>
            </View>
            <View style={{width:width*0.9,height:0.2,alignSelf:'center',marginVertical:15,backgroundColor:'#C9C7C7'}} />
            <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row',marginBottom:15}}>
            <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                <Image source={require('../constants/check.png')} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{width:width*0.8,height:'100%',flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{
                        fontFamily:'Sora-Regular',
                        letterSpacing:1.2,
                        fontSize:12,
                        lineHeight:16,
                        fontWeight:'500',
                        color:'#898989',
                        textDecorationStyle:'solid'}}> Lesions may form in bands across leaves as a result of an infection in the whorl. 
                        </Text>
                </View>
            </View>
        </View>
        </View>
              </ScrollView>    
            </SafeAreaView>
}

export default React.memo(DetailScreen);