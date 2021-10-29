import React, { useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import fertiliserData from "../fertiliserData";
const FilterComponent = props => {
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    const [visible,setVisible]=useState(false)
    return <View style={{width:width*0.93 ,shadowColor:'black',alignSelf:'center',
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:1,
    backgroundColor:'white',
    borderRadius:5,
    marginBottom:20,
    justifyContent:'flex-start'
    ,padding:15}}>
        <View style={{width:'100%',height:height*0.15*0.3,flexDirection:'row'}}>
            <View style={{width:height*0.1*0.3,height:height*0.1*0.3}}>
                <Image source={require('../../constants/checked.png')} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{marginLeft:20,width:width*0.95*0.5,height:height*0.08,flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{
                        fontFamily:'Sora-SemiBold',
                        letterSpacing:1.2,
                        fontSize:15,
                        fontWeight:'500',
                        color:'#313131',
                        textDecorationStyle:'solid'}}>{props.nameMain.toUpperCase()}</Text>
                </View>
            </View>
        </View>
        <Pressable onPress={()=>setVisible(!visible)} >
            <Text style={{fontFamily:'Sora-Bold',fontSize:13,color:'#008AF5',textAlign:'center'}}>
           {visible?'Hide Details':'View Details'}
            </Text>
        </Pressable>
        {visible?<View>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginVertical:20}}>
                <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                    <Image source={require('../../constants/check.png')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={{width:width*0.7,flexDirection:'column',justifyContent:'flex-start'}}>
                    <View>
                        <Text style={{
                            fontFamily:'Sora-SemiBold',
                            letterSpacing:1.2,
                            fontSize:14,
                            lineHeight:16,
                            fontWeight:'500',
                            color:'#898989',
                            }}>{fertiliserData[props.name]['1']}</Text>
                    </View>
                </View>
            </View>
            <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
            <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                <Image source={require('../../constants/check.png')} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{width:width*0.7,height:'100%',flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{
                        fontFamily:'Sora-SemiBold',
                        letterSpacing:1.2,
                        fontSize:14,
                        lineHeight:16,
                        fontWeight:'500',
                        color:'#898989',
                        textDecorationStyle:'solid'}}>{fertiliserData[props.name]['2']}</Text>
                </View>
            </View>
        </View>
        </View>:null}
        {/* <View style={{width:width*0.65,marginTop:height*0.01,alignItems:'center',flexDirection:'row'}}>
            <View style={{width:width*0.3,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:height*0.2*0.4,height:height*0.2*0.4,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:height*0.2*0.25,height:height*0.2*0.25}}>
                        <Image source={require('../../constants/rain.png')} 
                        style={{width:'100%',height:'100%'}} />
                    </View>
                </View>
                <View >
                    <Text style={{fontFamily:'Sora-Regular',fontSize:13,color:'#313131'}}>
                        {props.rain}
                    </Text>
                </View>
            </View>
            <View style={{width:width*.3,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:height*0.2*0.4,height:height*0.2*0.4,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:height*0.2*0.25,height:height*0.2*0.25}}>
                        <Image source={require('../../constants/sun.png')} 
                        style={{width:'100%',height:'100%'}} />
                    </View>
                </View>
                <View>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#313131'}}>
                        {props.sun}
                    </Text>
                </View>
            </View>
            <View style={{width:width*.3,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:height*0.2*0.4,height:height*0.2*0.4,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:height*0.2*0.25,height:height*0.2*0.25}}>
                        <Image source={require('../../constants/humidity.png')} 
                        style={{width:'100%',height:'100%'}} />
                    </View>
                </View>
                <View>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:15,color:'#313131'}}>
                        {props.humidity}
                    </Text>
                </View>
            </View> 
        </View>  */}      
    </View>

}

export default React.memo(FilterComponent);