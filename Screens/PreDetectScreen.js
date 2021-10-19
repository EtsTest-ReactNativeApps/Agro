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



const PreDetectScreen = props => {
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const name=props.navigation.getParam('name')
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };
    
      const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };
      
      const captureImage = async (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          videoQuality: 'low',
          durationLimit: 30, //Video max duration in seconds
          saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.assets[0].width);
            console.log('height -> ', response.assets[0].height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.assets[0].type);
            console.log('fileName -> ', response.assets[0].fileName);
            setSource(response);
          });
        }
      };
    
      const chooseFile = (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setSource(response);
        });
      };
    return <SafeAreaView style={{flex:1}}>        
            <View style={{width:width,height:height,backgroundColor:'#F8F8F8',alignItems:'center',padding:10,justifyContent:'flex-start'}}>
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
                                 {name} detection
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
                                <Image source={require('../constants/wheat.png')}  
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
                            <WeatherComponent item={'Rain'} value={'10 mm'} />
                            <WeatherComponent item={'Wind'} value={'180 mh'} />
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginTop:height*0.04}}>
                            <WeatherComponent item={'Humidity'} value={'85 %'} />
                            <WeatherComponent item={'Ph'} value={'8'} />
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
                    <Pressable android_ripple={{color:'grey'}} style={{
                        width:width*0.95,
                        height:height*0.07,
                        marginTop:height*0.02,
                        borderRadius:100,
                        elevation:3,
                        padding:15,
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
            </SafeAreaView>

}

export default PreDetectScreen;