import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, PermissionsAndroid, Platform, Pressable, Text, ToastAndroid, View } from "react-native";
import { Modal } from "react-native-paper";
import {DoubleCircleLoader, RippleLoader, TextLoader} from 'react-native-indicator'
import RNLocation from 'react-native-location';
import {NavigationEvents} from 'react-navigation'

RNLocation.configure({
    distanceFilter: 10
   })
const WeatherModal = props => {
    var watchId;
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    const [loading,setLoading]=useState(true)
    const [err,setErr] = useState(null)

    // useEffect(() => {
    //     const requestLocationPermission = async () => {
    //       if (Platform.OS === 'ios') {
    //         getOneTimeLocation();
    //         subscribeLocationLocation();
    //       } else {
    //         try {
    //           const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //               title: 'Location Access Required',
    //               message: 'This App needs to Access your location',
    //             },
    //           );
    //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             //To Check, If Permission is granted
    //             getOneTimeLocation();
    //             subscribeLocationLocation();
    //           } else {
    //             setErr('Permission Denied');
    //           }
    //         } catch (err) {
    //           console.warn(err);
    //         }
    //       }
    //     };
    //     requestLocationPermission();
    //     return () => {
    //       Geolocation.clearWatch(watchID);
    //     };
    //   }, []);

    //   const getOneTimeLocation = () => {
    //     setLocationStatus('Getting Location ...');
    //     Geolocation.getCurrentPosition(
    //       //Will give you the current location
    //       (position) => {
    //         setLocationStatus('You are Here');
    //         return fetchData([position.coords.latitude,position.coords.longitude])
    //         //getting the Longitude from the location json
            
    //       },
    //       (error) => {
    //         setErr(error.message);
    //       },
    //       {
    //         enableHighAccuracy: true,
    //         timeout: 30000,
            
    //       },
    //     );
    //   };
    
    //   const subscribeLocationLocation = () => {
    //     watchID = Geolocation.watchPosition(
    //       (position) => {
    //         //Will give you the location on location change
            
    //         setLocationStatus('You are Here');
    //         console.log(position);
    
            
    //       },
    //       (error) => {
    //         setErr(error.message);
    //       },
    //       {
    //         enableHighAccuracy: true,
    //         timeout:30000,
            
    //       },
    //     );
    //   };
    
    const PermissionHandle  = async () => {

        console.log('here')
     
        let location;
        let permission = await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
              detail: "coarse",
              rationale: {
                title: "We need to access your location",
                message: "We use your location to show where you are on the map",
                buttonPositive: "OK",
                buttonNegative: "Cancel"
              }
            }
          })
        console.log('here2')
        console.log(permission)
        return fetchData([27.00,80.011])
        location = await RNLocation.getLatestLocation({timeout: 30000})
        console.log(location, location.longitude, location.latitude, 
           location.timestamp)
        if (!location){
            alert('Please on GPS.')
            return {}
            
        }else{
            return fetchData([location.latitude,location.longitude])
        }
        
     
      }

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
            .catch(err=>{
                console.log(err)
                setErr('Error in getting stats.')
            })
        }catch(err){
            setLoading(false)
            console.log('error',err)
            ToastAndroid.show('Error in fetching Weather Stats.')
        }
    })

    // const fetchWeatherData = useCallback(async()=>{
    //     try{            
    //         Geolocation.getCurrentPosition({
    //             enableHighAccuracy: true,
    //             timeout:300000                
    //         })
    //         .then((pos)=>{
    //             console.log('POSSS',pos)
    //             if (!pos.latitude){
    //                 var requestOptions = {
    //                     method: 'GET',
    //                     redirect: 'follow'
    //                   };         
    //                 fetch("https://pytorch-annual.herokuapp.com/getCoord", requestOptions)
    //                 .then(res=>res.json())
    //                 .then(pos=>{
    //                     console.log('POS',pos)
    //                     console.log([pos.coordinates[0],pos.coordinates[1]])
    //                     return fetch(`http://api.weatherstack.com/current?access_key=9746cc237198a9abfa26421f854baea5&query=${pos.coordinates[0]},${pos.coordinates[1]}`, requestOptions)
    //                 })
    //                 .catch(err=>{
    //                     setErr(err)
    //                     console.log('error',err)                
    //                     })                
    //             }
    //             else{
    //                 console.log(pos.latitude+' '+pos.longitude)
    //                 return fetch(`http://api.weatherstack.com/current?access_key=9746cc237198a9abfa26421f854baea5&query=${pos.latitude},${pos.longitude}`, requestOptions)
                    
    //             }               
    //         })
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result);
    //             props.setWind(result.current.wind_speed)
    //             props.setTemp(result.current.temperature)
    //             props.setRain(result.current.precip)
    //             props.setData({...result})
    //             setLoading(false)
    //         })
    //         .catch(err=>{
    //             setErr('Error in getting stats. Please check you GPS')
    //             console.log('error',err)                
    //             })
    //     }catch(err){
    //             setLoading(false)
    //             console.log('error',err)
    //             ToastAndroid.show('Error in fetching Weather Stats.')
    //         }
    //         // if (err){
    //         //     setLoading(false)
    //         //     console.log('error',err)
    //     //     ToastAndroid.show('Error in fetching geolocation.')
    //     //  } 
    // })

    
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
                            {err?
                            <View style={{width:'80%',alignItems:'center',height:height*.1}}>
                                <Text numberOfLines={2} 
                                style={{fontSize:12,fontFamily:'Sora-Regular',fontWeight:'200',color:'#3C3A3A'}}>
                                    {err}
                                </Text>
                            </View>:<View style={{width:'80%',alignItems:'center'}}>
                                <Text style={{fontSize:16,fontFamily:'Sora-Regular',fontWeight:'200',color:'#3C3A3A'}}>
                                    Can't able to detect location
                                </Text>
                                <Text style={{fontSize:16,marginTop:10,fontFamily:'Sora-Regular',fontWeight:'200',color:'#3C3A3A'}}>
                                    Please Restart the app.
                                </Text>
                            </View>}
                        </View>}
                        <NavigationEvents onWillFocus={PermissionHandle} /> 
                    </View>
                </Modal>
        

}

export default React.memo(WeatherModal);