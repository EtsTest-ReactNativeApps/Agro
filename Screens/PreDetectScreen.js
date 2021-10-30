import React, { useCallback, useState } from "react";
import { FlatList, Image, PermissionsAndroid, Platform, Text, ToastAndroid } from "react-native";
import { Dimensions, Pressable, View } from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Next from '../constants/next.png'

import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"
import {DoubleCircleLoader, RippleLoader, TextLoader} from 'react-native-indicator'
import WeatherComponent from "./component/weatherComponent";
import { RNCamera } from "react-native-camera";
import ModalComponent from "./ModalComponent";



const PreDetectScreen = props => {
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const name=props.navigation.getParam('name')
    const data=props.navigation.getParam('data')
    const [pressed,setPressed]=useState(false)
    return <SafeAreaView style={{flex:1}}>        
            <View style={{width:width,height:height,backgroundColor:'#F8F8F8',alignItems:'center',padding:12,justifyContent:'flex-start'}}>
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
                <View style={{height:height*0.1,width:'100%',marginTop:20,
                flexDirection:'row',justifyContent:'space-between'}}>
                   <View style={{width:width*0.45,height:'100%',justifyContent:'space-between'}}>
                       <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'#3C3A3A'}}>
                           {name.toUpperCase()}
                       </Text>
                       <View style={{
                           width:width*0.45,
                           height:height*0.056,
                           borderRadius:15,
                           marginTop:25,
                           elevation:1,
                           padding:10,
                           backgroundColor:'white',
                           justifyContent:'center',
                           alignItems:'flex-start',
                           shadowColor:'black',
                           shadowOffset:{width:0,height:4},
                           shadowOpacity:0.4,
                           shadowRadius:4}}>
                               <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'#3C3A3A'}}>
                                 {name} disease detection
                                </Text>
                        </View>                        
                    </View>
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
                                name === 'cotton' ? require("../constants/cotton.png"):
                                name === 'okra' ? require("../constants/okra.png"):null }  
                                style={{width:'100%',height:'100%'}}/>
                            </View>
                    </View>       
                </View>
                <View style={{
                    width:width*0.95,
                    height:height*0.2,
                    marginTop:height*0.05,
                    borderRadius:20,
                    elevation:3,
                    padding:15,
                    backgroundColor:'white',
                    shadowColor:'black',
                    shadowOffset:{width:0,height:4},
                    shadowOpacity:0.4,
                    shadowRadius:4}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <WeatherComponent item={'Rain'} value={data.current.precip + '%'} />
                            <WeatherComponent item={'Wind'} value={data.current.wind_speed + 'mph'} />
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginTop:height*0.04}}>
                            <WeatherComponent item={'Humidity'} value={data.current.humidity +'%'} />
                            <WeatherComponent item={'Sun'} value={data.current.temperature + '°C'} />
                        </View>
                    </View>
                    <View style={{alignItems:'flex-start',width:width*.95,marginVertical:20}}>
                        <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'#3C3A3A'}}>
                            Live Camera
                        </Text>
                    </View>
                    <View style={{
                        width:width*.95,
                        height:height*.25,
                        borderRadius:20,
                        overflow:'hidden'}}    >
                    <RNCamera captureAudio={false} style={{width:'100%',height:height*.3}} />
                    </View>
                    <View style={{
                        overflow:'hidden',
                        width:width*0.95,
                        height:height*0.05,
                        borderRadius:50,
                        marginTop:height*0.02}}>
                      <Pressable
                      onPress={()=>setPressed(true)}
                      android_ripple={{color:'grey'}} style={{
                        overflow:'hidden',
                          width:'100%',
                          height:'100%',                          
                          elevation:3,
                          justifyContent:'center',
                          alignItems:'center',
                          backgroundColor:'#8CC63E',
                          shadowColor:'black',
                          shadowOffset:{width:0,height:4},
                          shadowOpacity:0.4,
                          shadowRadius:4}}>
                              <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'white'}}>
                              Detect
                              </Text>
                      </Pressable>
                    </View>   
                </View> 
                {pressed?
                <ModalComponent 
                name={name} 
                setPressed={setPressed} 
                {...props} />:null}               
            </SafeAreaView>

}

export default React.memo(PreDetectScreen);