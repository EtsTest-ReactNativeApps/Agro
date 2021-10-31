import React, { useState } from "react";
import { Dimensions, Image, Linking, Pressable, Text, View } from "react-native";
import fertiliserData from "../fertiliserData";
const FertilizerComponent = props => {
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    const [visible,setVisible]=useState(false)   
    

    return <View style={{
        width:width*0.93 ,
        shadowColor:'black',
        alignItems:'center',
        overflow:'hidden',
        shadowOffset:{width:5,height:5},
        shadowRadius:5,
        elevation:5,
        backgroundColor:'white',
        borderRadius:15,marginBottom:20,justifyContent:'flex-start',padding:8}}>
        <View style={{width:'100%',height:height*0.15*0.5,flexDirection:'row'}}>
            <View style={{width:height*0.22*0.4,height:height*0.23*0.4}}>
                <Image source={require('../../constants/fertilizer_1.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}} />
            </View>
            <View style={{marginLeft:20,width:width*0.95*0.48,height:height*0.08,flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{fontFamily:'Sora-SemiBold',fontSize:16,color:'#313131'}}>{props.nameMain}</Text>
                </View>
                <View>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:13,marginTop:height*0.015,color:'#9F9F9F'}}>
                        starts from  <Text style={{fontFamily:'Sora-SemiBold',marginLeft:5,fontSize:15,marginTop:height*0.015,color:'#313131'}}>
                            $ 4 
                        </Text>
                        
                    </Text>
                </View>
            </View>
            <Pressable onPress={()=>setVisible(!visible)} style={{paddingHorizontal:5,justifyContent:'center',alignItems:'center',borderRadius:5,height:height*0.15*0.25,paddingVertical:3,
            backgroundColor:'#008AF5',shadowColor:'black',shadowOffset:{width:5,height:5},
            shadowRadius:10,elevation:5}}>
                <Text style={{fontFamily:'Sora-Regular',fontSize:12,color:'white'}}>{visible?'Hide Details':'View Details'}</Text>
            </Pressable>
        </View>
        <View style={{width:width*.9,marginTop:height*0.01*0.05,alignItems:'center',flexDirection:'row',justifyContent:'flex-end'}}>
            {/* <View style={{width:width*0.3,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{width:height*0.15*0.4,height:height*0.15*0.4,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:height*0.15*0.25,height:height*0.15*0.25}}>
                        <Image source={Pointer} style={{width:'100%',height:'100%'}} />
                    </View>
                </View>
                <View style={{marginLeft:20,alignItems:'flex-start'}}>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:13,color:'#313131',textAlign:'left'}}>No area</Text>
                </View>
            </View> */}
           <View style={{width:height*0.15*0.4,height:height*0.15*0.4,alignItems:'center',justifyContent:'center'}}>
                <Pressable onPress={()=>Linking.openURL()} 
                    style={{width:height*0.18*0.25,height:height*0.18*0.25}}>
                    <Image source={require('../../constants/buy.png')} style={{width:'100%',height:'100%'}} />
                </Pressable>
            </View>
                      
        </View>
        
        {visible?<View style={{width:'100%'}}>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                    <Image source={require('../../constants/check.png')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={{width:width*0.8,flexDirection:'column',justifyContent:'flex-start'}}>
                    <View>
                        <Text style={{
                            fontFamily:'Sora-Regular',
                            letterSpacing:1.2,
                            fontSize:12,
                            lineHeight:16,
                            fontWeight:'500',
                            color:'#898989',
                            }}>{fertiliserData[props.name]['1']}</Text>
                    </View>
                </View>
            </View>
            <View style={{width:width*0.9,height:0.2,alignSelf:'center',marginVertical:15,backgroundColor:'#C9C7C7'}} />
            <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row',marginBottom:15}}>
            <View style={{width:height*0.1*0.2,height:height*0.1*0.2}}>
                <Image source={require('../../constants/check.png')} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{width:width*0.8,height:'100%',flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{
                        fontFamily:'Sora-Regular',
                        letterSpacing:1.2,
                        fontSize:12,
                        lineHeight:16,
                        fontWeight:'500',
                        color:'#898989',
                        textDecorationStyle:'solid'}}>{fertiliserData[props.name]['2']}</Text>
                </View>
            </View>
        </View>
        </View>:null}       
    </View>

}

export default React.memo(FertilizerComponent);