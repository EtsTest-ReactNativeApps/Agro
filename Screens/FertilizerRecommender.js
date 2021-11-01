import React, { useCallback, useState } from "react";
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
import CropComponent from "./component/CropComponent";
import FilterComponent from "./component/FilterComponent";
import FertilizerComponent from "./component/FertilizerComponent";



const FertilizerRecommmender = props => {
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const completeData=props.navigation.getParam('ferti')
    console.log(completeData)

    const extract=useCallback((item,index)=>index,[])
    const render=useCallback(({item})=>
        // <FilterComponent
        //     nameMain={item}
        //     name={item.replace(/-/g,'')}
        //      />
        {   const obj = JSON.parse(item.replace(/'/g, '"'))
            console.log('O',obj)
            return <FertilizerComponent
            url={obj.shop} 
            price={obj.price}
            nameMain={obj.fertilizer}
            name={obj.fertilizer.replace(/-/g,'')} />}
             ,[])
    return <SafeAreaView style={{flex:1}}>        
            <ScrollView style={{width:width,height:height}} contentContainerStyle={{backgroundColor:'#F8F8F8',alignItems:'center',flexGrow:1,padding:12,justifyContent:'flex-start'}}>
                <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',marginTop:height*0.02}}>
                    <Pressable onPress={()=>props.navigation.goBack()} style={{width:width*0.1,
                        justifyContent:'center',
                        alignItems:'center',backgroundColor:'white',
                        padding:12,
                        height:width*0.1,borderRadius:width*0.1,elevation:5,
                        shadowColor:'black',shadowOpacity:5,shadowRadius:5}}>
                            <Image source={Next} style={{width:'100%',height:'100%'}} />                        
                    </Pressable>
                    <View style={{width:width*0.45,height:'100%',justifyContent:'space-between'}}>
                       <View style={{
                           width:width*0.45,
                           height:height*0.056,
                           borderRadius:9,
                           elevation:1,
                           marginLeft:width*0.15,
                           padding:10,
                           backgroundColor:'white',
                           justifyContent:'center',
                           alignItems:'center',
                           shadowColor:'black',
                           shadowOffset:{width:0,height:4},
                           shadowOpacity:0.4,
                           shadowRadius:4}}>
                               <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'#3C3A3A'}}>
                                 Fertilizer Advisor
                                </Text>
                        </View>                        
                    </View>
                </View>        
                                       
               
                <View style={{alignItems:'flex-start',width:width*.95,marginVertical:20}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'#3C3A3A'}}>
                        Recommended Fertilizer
                    </Text>
                </View>
                {/* <FilterComponent  nameMain={completeData[0]} name={completeData[0].replace(/-/g,'_')} /> */}
                <FertilizerComponent nameMain={completeData[0].fertilizer} url={completeData[0].shop} price={completeData[0].price} name={completeData[0].fertilizer.replace(/-/g,'')} />
                <View style={{alignItems:'flex-start',width:width*.95,marginVertical:20}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:16,color:'#3C3A3A'}}>
                        Similar Fertlizer
                    </Text>
                </View>
                <View >
                <FlatList 
                showsVerticalScrollIndicator={false} 
                numColumns={1} 
                keyExtractor={extract} 
                style={{width:width*0.95,height:height*0.7}} 
                data={completeData[1]}  
                renderItem={render} 
                 />
                 </View>
            </ScrollView>                 
        </SafeAreaView>

}

export default React.memo(FertilizerRecommmender);