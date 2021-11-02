import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View,Text, FlatList, ActivityIndicator, ToastAndroid } from 'react-native'
import WebView from 'react-native-webview'
import { NavigationEvents } from 'react-navigation'
import diseasesData from './diseasesData'

const BottomDetailScreen = props => {
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    const symptoms = props.name === 'fruit'?null: diseasesData[props.detect].symptoms.split('.')
    const treatment = props.name === 'fruit'?null: diseasesData[props.detect].treatment.split('.')
    const keyExtractor = useCallback((item,index)=>index,[])
    const [videoId,setVideoId]=useState(null)
    const [loading,setLoading]=useState(false)
    const renderSymtoms = useCallback(({item,index})=>item?
        <View style={{width:width*.94,flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',marginVertical:15}}>
            <View style={{width:height*0.05*0.2,height:height*0.05*0.2,backgroundColor:'#008AF5',borderRadius:10}}>
            </View>
            <View style={{width:width*0.85,flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{
                        fontFamily:'Sora-Regular',
                        letterSpacing:1.2,
                        fontSize:12,
                        lineHeight:16,
                        fontWeight:'500',
                        color:'#898989',
                        }}> {item.substring(0,1) === ' '?item.substring(1):item}
                        </Text>
                </View>
            </View>
        </View>:<View />)

    const renderTreatment = useCallback(({item,index})=>item?
        <View style={{width:width*.94,flexDirection:'row',justifyContent:'space-between',marginVertical:15}}>                
            <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                <Image source={require('../constants/check.png')} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{width:width*0.85,flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{
                        fontFamily:'Sora-Regular',
                        letterSpacing:1.2,
                        fontSize:12,
                        lineHeight:16,
                        fontWeight:'500',
                        color:'#898989',
                        }}> {item}
                        </Text>
                </View>
            </View>
        </View>:<View />)
    const fetchVideo = useCallback(()=>{
        setLoading(true)
        console.log('URL ',`how+${props.detect.replace(/_/g,'+').replace(/[0-9]/g, "")}+grows`)
        try{
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };              
              fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=how+${props.detect.replace(/_/g,'+').replace(/[0-9]/g, "")}+grows&type=video&key=AIzaSyCLWne9ZrJnMs2kkYwS9Aj6bCm2g8v1CzY`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.pageInfo.totalResults >0){
                        console.log(result.items[0].id.videoId);
                        setVideoId(result.items[0].id.videoId)
                        setLoading(false)
                    }else{
                        setLoading(false)
                        ToastAndroid.show("Can't able to fetch",ToastAndroid.LONG)
                    }
                    
                })
                .catch(error => console.log('error', error));
        }catch(err){
            setLoading(false)
            console.log('error', err)
            ToastAndroid.show('Error fetching video',ToastAndroid.LONG)
        }
    })
    return props.name ==='fruit'?
        <View style={{width:width*.94}}>
            {loading?<View>
                <ActivityIndicator size={25} color='blue' />
                <Text style={{fontFamily:'Sora-Regular',alignSelf:'center',marginVertical:10,fontSize:14,color:'#3C3A3A'}}>
                    Fetching content...
                </Text>
                </View>:
            <View style={{width:'100%',height:height*0.35}}>
                <Text style={{fontFamily:'Sora-Regular',alignSelf:'flex-start',marginVertical:10,fontSize:14,color:'#3C3A3A'}}>
                    Know how it grows
                </Text>
                <View style={{width:'100%',height:height*0.32,backgroundColor:'#7D7E7D',borderRadius:10,overflow:'hidden'}}>
                    <WebView
                    style={{width:'100%',height:'100%'}}
                    scrollEnabled={false}
                    //                userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
                    // (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                    source={{uri: `https://www.youtube.com/embed/${videoId}`}}
                    allowsFullscreenVideo={true}
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    />
                </View>
            </View>}
            <NavigationEvents onWillFocus={fetchVideo} />
        </View>:<View style={{width:width*.94}}>

                <Text style={{fontFamily:'Sora-Regular',alignSelf:'flex-start',marginVertical:10,fontSize:14,color:'#3C3A3A'}}>
                    Symptoms
                </Text>

                <FlatList listKey='#fdsfg' style={{width:width}} contentContainerStyle={{flexGrow:1,alignItems:'center'}} renderItem={renderSymtoms} data={symptoms} keyExtractor={keyExtractor} />
                
                <View style={{width:width*0.95,height:0.5,alignSelf:'center',marginVertical:5,backgroundColor:'#747576'}} />

                <Text style={{fontFamily:'Sora-Regular',marginVertical:10,alignSelf:'flex-start',fontSize:14,color:'#3C3A3A'}}>
                    Cure
                </Text>

                <FlatList listKey='#wetret' style={{width:width*.94}} contentContainerStyle={{flexGrow:1,alignItems:'center'}} data={treatment} renderItem={renderTreatment} keyExtractor={keyExtractor} />
                
    </View>
}

export default BottomDetailScreen