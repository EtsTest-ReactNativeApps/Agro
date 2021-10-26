import React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
const CropComponent = props => {
    const width=Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    
    return <View style={{width:width*0.93 ,shadowColor:'black',alignSelf:'center',
    shadowOffset:{width:5,height:5},shadowRadius:5,elevation:5,backgroundColor:'white',borderRadius:15,marginBottom:20,height:height*0.15,justifyContent:'flex-start',padding:8}}>
        <View style={{width:'100%',height:height*0.15*0.3,flexDirection:'row'}}>
            <View style={{width:height*0.1*0.4,height:height*0.1*0.4}}>
                <Image source={require('../../constants/checked.png')} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={{marginLeft:20,width:width*0.95*0.5,height:height*0.08,flexDirection:'column',justifyContent:'flex-start'}}>
                <View>
                    <Text style={{fontFamily:'Sora-Regular',fontSize:18,color:'#313131'}}>{props.name}</Text>
                </View>
            </View>
        </View>
        <View style={{width:width*0.65,marginTop:height*0.01,alignItems:'center',flexDirection:'row'}}>
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
        </View>        
    </View>

}

export default React.memo(CropComponent);