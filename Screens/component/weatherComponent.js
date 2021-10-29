import React from 'react'
import { Dimensions, Text } from 'react-native'
import { Image, View } from 'react-native'

const WeatherComponent = props => {
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height
    return <View style={{flexDirection:'row',height:height*0.15*0.45}}>
                <View style={{width:width*0.11,height:width*0.11}}>
                <Image style={{width:'100%',height:'100%'}} 
                source={props.item === 'Rain'?require('../../constants/rain.png'):
                        props.item === 'Wind'?require('../../constants/wind.png'):
                        props.item === 'Sun'?require('../../constants/sun.png'):
                        props.item === 'Humidity'?require('../../constants/humidity.png'):null} />
                </View>
                <View style={{width:width*.2,height:height*0.15*0.4,marginLeft:10}}>
                <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'#635F5F'}}>{props.item}</Text>
                <Text style={{fontFamily:'Sora-Regular',fontSize:15,marginTop:height*0.15*0.4*0.05,color:'#635F5F'}}>
                    {props.value}
                </Text>
                </View>
            </View>
}

export default React.memo(WeatherComponent)