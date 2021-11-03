import React from "react";
import { Dimensions, Text,Image,View,Pressable } from "react-native";
import diseasesData from "./diseasesData";
import Next from '../constants/next.png'
const BottomHeaderDetail = props => {
    const width=Dimensions.get('screen').width
    const height=Dimensions.get('screen').height

    return <View style={{width:width*.96,paddingBottom:5}} contentContainerStyle={{alignItems:'center',padding:12,justifyContent:'flex-start'}}>
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
        <Image source={{uri:props.uri}}  
        style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
    </View>
    <View style={{height:height*0.1,width:'100%',marginTop:20,
    marginBottom:30,
    flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{
               width:height*0.1,
               marginRight:'3%',
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
                <Image source={
                    props.name === 'wheat'?require("../constants/wheat.png"):
                    props.name === 'rice' ? require("../constants/rice.png") :
                    props.name === 'corn' ? require("../constants/corn.png") : 
                    props.name === 'leaf' ? require("../constants/leaf.png") :
                    props.name === 'fruit' ? require("../constants/fruit.png") :
                    props.name === 'cotton' ? require("../constants/cotton.png") :
                    props.name === 'okra' ? require("../constants/okra.png"):null } 
                    style={{width:'100%',height:'100%'}}/>
                </View>
        </View>     
       <View style={{height:'100%', marginRight:10}}>
           <View style={{
               borderRadius:15,  
               width:width*0.6,            
               marginTop:25,
               elevation:1,
               paddingVertical:15,
               paddingHorizontal:15,
               backgroundColor:props.detect.toLowerCase().includes('ealthy') || props.name === 'fruit'?'#C7F0AF':'#E89F9F',
               justifyContent:'center',
               alignItems:'center',
               shadowColor:'black',
               shadowOffset:{width:0,height:4},
               shadowOpacity:0.4,
               shadowRadius:4}}>
                   <Text numberOfLines={5} style={{fontFamily:'Sora-Regular',letterSpacing:1.3,fontSize:13,
                   color:props.detect.toLowerCase().includes('ealthy')||props.name ==='fruit'?'#2A8B31':'#B00000'}}>
                     {props.detect.replace(/[()]/g,'').replace(/_/g,' ').replace(/,/g,'')} detection
                    </Text>
            </View>                        
        </View>                      
    </View>
    {props.name !== 'fruit'?<View style={{paddingBottom:10,width:width*.96}} >
        <Text style={{letterSpacing:1,lineHeight:20,fontSize:14,color:'#898989',
        fontFamily:'Sora-Regular'}}>
            {diseasesData[props.detect.toLowerCase().replace(/ /g,'_').replace(/,/g,'').replace(/[()]/g,'')].details}
        </Text>
    </View>:<View />}

  </View>    

}

export default React.memo(BottomHeaderDetail)