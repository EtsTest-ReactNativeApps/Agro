import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, PermissionsAndroid, Pressable, Text, ToastAndroid, View } from "react-native";
import { Modal } from "react-native-paper";
import {DoubleCircleLoader, RippleLoader, TextLoader} from 'react-native-indicator'
import Geolocation from '@react-native-community/geolocation';
import {NavigationEvents} from 'react-navigation'
const WeatherModal = props => {
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    const [loading,setLoading]=useState(true)
    const [positionString,setPositionString] = useState('')
    const [err,setErr] = useState(null)
    const fetchWeatherData = useCallback(async()=>{
        try{
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
            await Geolocation.getCurrentPosition(pos=>{
                setPositionString(`${pos.coords.latitude},${pos.coords.longitude}`)
                },err=>{
                    console.log('ERR',err)
                    setErr(err)
                },{
                    enableHighAccuracy: false,
                    timeout: 3000,
                    
                })
            
            if (positionString){
            fetch("http://api.weatherstack.com/current?access_key=9746cc237198a9abfa26421f854baea5&query=26.4870674,80.3491599", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setLoading(false)
            })
            }                                 
             
        }catch(err){
            setLoading(false)
            console.log('error',err)
            ToastAndroid.show('Error in fetching Weather Stats.')
        }
        if (err){
            setLoading(false)
            console.log('error',err)
            ToastAndroid.show('Error in fetching geolocation.')
         } 
    })

    
    return    <Modal                
                    style={{justifyContent:'center',alignItems:'center'}}
                    contentContainerStyle={{
                        width:width*0.9,
                        borderRadius:20,
                        height:height*0.25,
                        backgroundColor:'white',
                        justifyContent:'center',
                        alignItems:'center'}}
                    animationType='slide'
                    transparent={true}
                    visible={loading}  >
                    <View style={{
                        width:width*0.9,
                        height:height*0.25,
                        justifyContent:'center',
                        alignItems:'center'}}>

                        <RippleLoader  
                        strokeWidth={4} 
                        size={Dimensions.get('screen').width*.13} color={'#8CC63E'} />

                        <Text style={{marginTop:15,fontFamily:'Sora-Regular',color:'#3C3A3A'}}>
                            Getting Weather Stats ...
                        </Text>
                        <NavigationEvents onWillFocus={fetchWeatherData} />
                    </View>
                </Modal>
        

}

export default React.memo(WeatherModal);