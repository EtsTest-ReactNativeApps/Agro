import axios from "axios";
import React,{  useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, PermissionsAndroid, Platform, Text, ToastAndroid } from "react-native";
import { Dimensions, Pressable, View } from "react-native";
import { Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Next from '../constants/next.png'
import FetchingModal from "./fetchingModal";
import soilData from "./soilData";




const CropDetailScreen = props =>{
  const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const name=props.navigation.getParam('soilType')
    const weatherData = props.navigation.getParam('weatherData')
    const soil_dict={'Black':0,'Clayey':1,"Loamy":2,"Red":3,"Sandy":4}
    const [pressed,setPressed]=useState(false)
    const [modalVisible,setModalVisible]=useState(false)
    const fetchData = useCallback(()=>{
        setModalVisible(true)
        try{
            const soilKey=name.split(' ')[0]
            const soilDataObj = soilData[soilKey]
            const uploadData={
                nitro:(Math.random()*(soilDataObj.Nitrogen.MAX-soilDataObj.Nitrogen.MIN)+soilDataObj.Nitrogen.MIN).toFixed(1),  // nitrogen percentage
                phosp:(Math.random()*(soilDataObj.Phosphorous.MAX-soilDataObj.Phosphorous.MIN)+soilDataObj.Phosphorous.MIN).toFixed(1),  // nitrogen percentage 
                potash:(Math.random()*(soilDataObj.Potassium.MAX-soilDataObj.Potassium.MIN)+soilDataObj.Potassium.MIN).toFixed(1),  // nitrogen percentage  
                temp:weatherData.current.temperature, 
                humid:weatherData.current.humidity, 
                ph:(Math.random()*(soilDataObj.ph.MAX-soilDataObj.ph.MIN)+soilDataObj.ph.MIN).toFixed(1),  // nitrogen percentage   
                rain:weatherData.current.precip 
            }
            console.log(uploadData)
            var myHeaders = new Headers();
            var raw = JSON.stringify(uploadData)
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              
            fetch("https://pytorch-annual.herokuapp.com/getCrop", requestOptions)
            .then(res=>res.json())
            .then(response => {
                console.log(response);
                setModalVisible(false);
                const crops=[response.result.recommended,response.result.similar]
                props.navigation.navigate('CropRecommender',{crops:crops})
            })
            .catch(err=>{
                console.log(err)
                setModalVisible(false)
                throw err
            })
        }catch(err){
            console.log('error',err)
            setModalVisible(false)
            ToastAndroid.show('Error in fetching crops.')
        }
        
    })

    const fetchDataFerti = useCallback(()=>{
        setModalVisible(true)
        try{
            const soilKey=name.split(' ')[0]
            const soilDataObj = soilData[soilKey]
            const value=Object.keys(soil_dict).findIndex(item=>item===soilKey)
            const uploadData={
                nitro:(Math.random()*(soilDataObj.Nitrogen.MAX-soilDataObj.Nitrogen.MIN)+soilDataObj.Nitrogen.MIN).toFixed(1),  
                phosp:(Math.random()*(soilDataObj.Phosphorous.MAX-soilDataObj.Phosphorous.MIN)+soilDataObj.Phosphorous.MIN).toFixed(1),  
                pota:(Math.random()*(soilDataObj.Potassium.MAX-soilDataObj.Potassium.MIN)+soilDataObj.Potassium.MIN).toFixed(1),  
                temp:weatherData.current.temperature, 
                humid:weatherData.current.humidity, 
                soil_type:value,   
                moisture:weatherData.current.precip 
            }
            console.log(uploadData)
            var myHeaders = new Headers();
            var raw = JSON.stringify(uploadData)
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
              
            fetch("https://pytorch-annual.herokuapp.com/getFertilizer", requestOptions)
            .then(res=>res.json())
            .then(response => {
                console.log(response);
                setModalVisible(false);
                const fertis=[response.result.recommended,response.result.similar]
                props.navigation.navigate('FertiliserRecommender',{ferti:fertis})
            })
            .catch(err=>{
                console.log(err)
                setModalVisible(false)
                throw err
            })
        }catch(err){
            console.log('error',err)
            setModalVisible(false)
            ToastAndroid.show('Error in fetching Fertilizers.')
        }
        
    })

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
                <View style={{
                    width:width*.95,
                    height:height*.25,
                    borderRadius:20,
                    marginTop:20,
                    overflow:'hidden'}} >
                    <Image source={name === 'Clayey Soil'?require("./component/clayey.jpeg"):
                    name === 'Loamy Soil' ? require("./component/loamy.jpeg") :
                    name === 'Black Soil' ? require("./component/black.jpeg") : 
                    name === 'Red Soil' ? require("./component/red.jpeg") :null } 
                    style={{width:'100%',height:'100%'}} />             
                </View>
                <View style={{height:height*0.1,width:'100%',marginTop:20,
                marginBottom:20,
                flexDirection:'row',justifyContent:'space-between'}}>
                       <View style={{
                           width:width*0.45,
                           height:height*0.056,
                           borderRadius:15,                          
                           marginTop:25,
                           elevation:1,
                           paddingHorizontal:15,
                           backgroundColor:'#F0ECAF',
                           justifyContent:'center',
                           alignItems:'center',
                           shadowColor:'black',
                           shadowOffset:{width:0,height:4},
                           shadowOpacity:0.4,
                           shadowRadius:4}}>
                               <Text style={{fontFamily:'Sora-Regular',letterSpacing:1.3,fontSize:16,
                               color:'#884D00'}}>
                                 {name}
                                </Text>
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
                            <Image source={require("../constants/soil.png") } 
                                style={{width:'100%',height:'100%'}}/>
                            </View>
                         </View>     
                    </View>
                    <View style={{
                        width:width*.95,
                        height:height*0.12,
                        overflow:'hidden',
                        marginTop:10,                        
                        elevation:5,
                        shadowColor:'black',
                        backgroundColor:'white',   
                        shadowOffset:{width:0,height:4},
                        shadowRadius:3,
                        shadowOpacity:0.3,
                       
                        borderRadius:15,                        
                    }}>
                        <Pressable
                        onPress={()=>fetchData()}
                        android_ripple={{color:'#E0DBDB'}}
                        style={{
                            width:'100%',
                            height:'100%',
                            flexDirection:'row',
                            paddingHorizontal:20,
                            justifyContent:'space-between',
                            alignItems:'center' }}>
                                <View style={{width:'60%'}}>
                                    <Text style={{
                                        fontFamily:'Sora-Bold',
                                        fontWeight:'bold',
                                        fontSize:16,
                                        letterSpacing:1.2,
                                        lineHeight:25,
                                        color:'#464242'}}>
                                        Find Crops that grows
                                        best in your surrounding
                                    </Text>
                                </View>
                                <View style={{width:width*0.15,height:width*0.15}}>
                                        <Image source={require('../constants/plant.png')} 
                                        style={{width:'100%',height:'100%'}}/>
                                </View>                    
                        </Pressable>
                    </View>
                    <View style={{flexDirection:'row',
                    width:width*.94,alignItems:'center',
                    marginVertical:20,justifyContent:'space-between'}}>
                        <View style={{width:'45%',height:1.2,backgroundColor:'#DBD7D7'}} />
                        <Text style={{width:'10%',textAlign:'center',fontSize:13,fontFamily:'Sora-Regular',color:'#959595'}}>
                            or
                        </Text>
                        <View style={{width:'45%',height:1.2,backgroundColor:'#DBD7D7'}} />                    
                    </View>

                    <View style={{
                        width:width*.95,
                        height:height*0.12,
                        overflow:'hidden',
                        elevation:5,
                        shadowColor:'black',
                        backgroundColor:'white',   
                        shadowOffset:{width:0,height:4},
                        shadowRadius:3,
                        shadowOpacity:0.3,
                       
                        borderRadius:15,                        
                    }}>
                        <Pressable
                        onPress={()=>fetchDataFerti()}
                        android_ripple={{color:'#E0DBDB'}}
                        style={{
                            width:'100%',
                            height:'100%',
                            flexDirection:'row',
                            paddingHorizontal:20,
                            justifyContent:'space-between',
                            alignItems:'center' }}>
                                <View style={{width:'70%'}}>
                                    <Text style={{
                                        fontFamily:'Sora-Bold',
                                        fontWeight:'bold',
                                        fontSize:16,
                                        letterSpacing:1.2,
                                        lineHeight:25,
                                        color:'#464242'}}>
                                        Find Fertilizers that grows
                                        best in your surrounding
                                    </Text>
                                </View>
                                <View style={{width:width*0.15,height:width*0.15}}>
                                        <Image source={require('../constants/fertilizer.png')} 
                                        style={{width:'100%',height:'100%'}}/>
                                </View>                    
                        </Pressable>
                    </View>    
                </View>
                <FetchingModal modalVisible={modalVisible} />    
                </SafeAreaView>
}

export default React.memo(CropDetailScreen);