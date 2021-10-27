import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, PermissionsAndroid, Pressable, Text, ToastAndroid, View } from "react-native";
import { Modal } from "react-native-paper";
import {DoubleCircleLoader, RippleLoader, TextLoader} from 'react-native-indicator'
import Geolocation from 'react-native-get-location'
import {NavigationEvents} from 'react-navigation'
const WeatherModal = props => {
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    const [loading,setLoading]=useState(true)
    const [err,setErr] = useState(null)

    const fetchData = useCallback((GPS)=>{
        try{
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
            fetch(`http://api.weatherstack.com/current?access_key=9746cc237198a9abfa26421f854baea5&query=${GPS[0]},${GPS[1]}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                props.setWind(result.current.wind_speed)
                props.setTemp(result.current.temperature)
                props.setRain(result.current.precip)
                props.setData({...result})
                setLoading(false)
            })
        }catch(err){
            setLoading(false)
            console.log('error',err)
            ToastAndroid.show('Error in fetching Weather Stats.')
        }
    })

    const fetchWeatherData = useCallback(async()=>{
        try{            
            Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge:1000
            })
            .then(pos=>{
                console.log([pos.latitude,pos.longitude])
                return fetchData([pos.latitude,pos.longitude])
            })
            .catch(err=>{
                setErr(err)
                console.log('error',err)                
            })
            
        }catch(err){
            setLoading(false)
            console.log('error',err)
            ToastAndroid.show('Error in fetching Weather Stats.')
        }
        // if (err){
        //     setLoading(false)
        //     console.log('error',err)
        //     ToastAndroid.show('Error in fetching geolocation.')
        //  } 
    })

    
    return    <Modal                
                    style={{justifyContent:'center',alignItems:'center'}}
                    contentContainerStyle={{
                        width:width*0.75,
                        borderRadius:20,
                        height:height*0.20,
                        backgroundColor:'white',
                        justifyContent:'center',
                        alignItems:'center'}}
                    animationType='slide'
                    transparent={true}
                    visible={loading}  >
                    <View style={{
                        width:width*0.75,
                        height:height*0.20,
                        }}>
                        {!err?<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                            <RippleLoader  
                            strokeWidth={4} 
                            size={Dimensions.get('screen').width*.13} color={'#8CC63E'} />

                            <Text style={{marginTop:15,fontFamily:'Sora-Regular',color:'#3C3A3A'}}>
                                Getting Weather Stats ...
                            </Text>
                        </View>:
                        <View style={{width:'100%',height:'100%',justifyContent:'flex-start',alignItems:'center'}}>
                            <View style={{width:width*0.12,height:width*0.12,marginVertical:15}}>
                                <Image source={require('./alert.png')} style={{width:'100%',height:'100%'}} />
                            
                            </View>
                            <View style={{width:'60%',alignItems:'center'}}>
                                <Text style={{fontSize:16,fontFamily:'Sora-Regular',fontWeight:'200',color:'#3C3A3A'}}>
                                    Can't able to detect location
                                </Text>
                                <Text style={{fontSize:16,marginTop:10,fontFamily:'Sora-Regular',fontWeight:'200',color:'#3C3A3A'}}>
                                    Please Restart the app.
                                </Text>
                            </View>
                        </View>}
                        <NavigationEvents onWillFocus={fetchWeatherData} />
                    </View>
                </Modal>
        

}

export default React.memo(WeatherModal);